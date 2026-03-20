'use client';

import { useId, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { siteConfig } from '@/lib/site';

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'fallback';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const inputStyle: React.CSSProperties = {
  background: 'var(--card-bg, rgba(255,255,255,0.04))',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-subtle)',
};

const focusClasses =
  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent';

export default function ContactForm() {
  const { lang } = useLang();
  const id = useId();
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState('');
  const [contactEmail, setContactEmail] = useState<string>(siteConfig.email);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });

  const labels = {
    pt: {
      name: 'Nome',
      email: 'Email',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso.',
      error: 'Nao foi possivel enviar agora. Tente novamente.',
      retry: 'Tentar novamente',
      required: 'Campo obrigatorio',
      invalidEmail: 'Email invalido',
      shortMessage: 'Inclua mais contexto na mensagem',
      fallback: 'O formulario esta indisponivel no momento. Use o email direto abaixo.',
      directEmail: 'Enviar email direto',
    },
    en: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent successfully.',
      error: 'Could not send right now. Please try again.',
      retry: 'Try again',
      required: 'Required field',
      invalidEmail: 'Invalid email',
      shortMessage: 'Add more context to your message',
      fallback: 'The form is unavailable right now. Use the direct email below.',
      directEmail: 'Send direct email',
    },
  };

  const t = labels[lang];

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) nextErrors.name = t.required;
    if (!formData.email.trim()) nextErrors.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = t.invalidEmail;
    if (!formData.subject.trim()) nextErrors.subject = t.required;
    if (!formData.message.trim()) nextErrors.message = t.required;
    else if (formData.message.trim().length < 20) nextErrors.message = t.shortMessage;
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setFeedback('');

    if (Object.keys(nextErrors).length > 0) return;

    setFormState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        fallback?: boolean;
        fallbackMessage?: string;
        contactEmail?: string;
      };

      if (data.fallback) {
        setContactEmail(data.contactEmail ?? siteConfig.email);
        setFeedback(data.fallbackMessage ?? t.fallback);
        setFormState('fallback');
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Request failed');
      }

      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setFeedback(t.success);
      setFormState('success');
    } catch {
      setFeedback(t.error);
      setFormState('error');
    }
  }

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (formState !== 'idle') {
      setFormState('idle');
      setFeedback('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field
        id={`${id}-name`}
        label={t.name}
        error={errors.name}
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        disabled={formState === 'loading'}
      />
      <Field
        id={`${id}-email`}
        label={t.email}
        type="email"
        error={errors.email}
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
        disabled={formState === 'loading'}
      />
      <Field
        id={`${id}-subject`}
        label={t.subject}
        error={errors.subject}
        value={formData.subject}
        onChange={(value) => handleChange('subject', value)}
        disabled={formState === 'loading'}
      />
      <Field
        id={`${id}-message`}
        label={t.message}
        error={errors.message}
        value={formData.message}
        onChange={(value) => handleChange('message', value)}
        disabled={formState === 'loading'}
        textarea
      />

      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={formData.website}
        onChange={(event) => handleChange('website', event.target.value)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={formState}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="space-y-4"
          aria-live="polite"
        >
          {(formState === 'success' || formState === 'error' || formState === 'fallback') && feedback ? (
            <div
              className="rounded-2xl border px-4 py-3 text-sm"
              style={{
                borderColor:
                  formState === 'success' ? 'var(--tag-border)' : 'rgba(248, 113, 113, 0.25)',
                color: formState === 'success' ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: 'var(--card-bg)',
              }}
            >
              {feedback}
              {formState === 'fallback' ? (
                <div className="mt-3">
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(formData.subject || 'Portfolio contact')}`}
                    className="font-mono text-[11px] uppercase tracking-[2px]"
                    style={{ color: 'var(--accent)' }}
                  >
                    {t.directEmail} ({contactEmail})
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              type="submit"
              disabled={formState === 'loading'}
              className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                borderRadius: '999px',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {formState === 'loading' ? t.sending : t.send}
            </motion.button>

            {(formState === 'error' || formState === 'fallback') ? (
              <button
                type="button"
                onClick={() => {
                  setFormState('idle');
                  setFeedback('');
                }}
                className="font-mono text-[11px] uppercase tracking-[2px] px-5 py-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.retry}
              </button>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </form>
  );
}

function Field({
  id,
  label,
  type = 'text',
  error,
  value,
  onChange,
  disabled,
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  textarea?: boolean;
}) {
  const common = `w-full px-4 py-3 font-body text-sm rounded-sm placeholder:text-[var(--text-ghost)] transition-all duration-200 ${focusClasses}`;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-[2px] mb-2" style={{ color: 'var(--text-tertiary)' }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          rows={5}
          className={`${common} resize-none`}
          style={inputStyle}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className={common}
          style={inputStyle}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      )}
      {error ? (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 font-body text-xs text-red-400"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}
