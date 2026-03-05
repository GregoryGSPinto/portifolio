'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';

type FormState = 'idle' | 'loading' | 'success' | 'error';

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

const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent';

export default function ContactForm() {
  const { lang } = useLang();
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const labels = {
    pt: {
      name: 'Nome',
      email: 'Email',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso!',
      error: 'Erro ao enviar. Tente novamente.',
      retry: 'Tentar Novamente',
      required: 'Campo obrigatorio',
      invalidEmail: 'Email invalido',
    },
    en: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send. Try again.',
      retry: 'Try Again',
      required: 'Required field',
      invalidEmail: 'Invalid email',
    },
  };

  const t = labels[lang];

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = t.required;
    if (!formData.email.trim()) {
      errs.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = t.invalidEmail;
    }
    if (!formData.subject.trim()) errs.subject = t.required;
    if (!formData.message.trim()) errs.message = t.required;
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormState('error');
    }
  }

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field
        label={t.name}
        error={errors.name}
        value={formData.name}
        onChange={(v) => handleChange('name', v)}
        disabled={formState === 'loading'}
      />
      <Field
        label={t.email}
        type="email"
        error={errors.email}
        value={formData.email}
        onChange={(v) => handleChange('email', v)}
        disabled={formState === 'loading'}
      />
      <Field
        label={t.subject}
        error={errors.subject}
        value={formData.subject}
        onChange={(v) => handleChange('subject', v)}
        disabled={formState === 'loading'}
      />
      <Field
        label={t.message}
        error={errors.message}
        value={formData.message}
        onChange={(v) => handleChange('message', v)}
        disabled={formState === 'loading'}
        textarea
      />

      <AnimatePresence mode="wait">
        {formState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 py-3"
          >
            <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body text-sm" style={{ color: 'var(--accent)' }}>
              {t.success}
            </span>
          </motion.div>
        ) : formState === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <p className="font-body text-sm text-red-400">{t.error}</p>
            <button
              type="button"
              onClick={() => setFormState('idle')}
              className="font-mono text-[12px] uppercase tracking-[2px] px-6 py-3 transition-all duration-300 hover:opacity-80"
              style={{
                background: 'transparent',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
              }}
            >
              {t.retry}
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="submit"
            type="submit"
            disabled={formState === 'loading'}
            className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:opacity-90 disabled:opacity-50"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg-primary)',
              borderRadius: '2px',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {formState === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t.sending}
              </span>
            ) : (
              t.send
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  type = 'text',
  error,
  value,
  onChange,
  disabled,
  textarea,
}: {
  label: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  textarea?: boolean;
}) {
  const common = `w-full px-4 py-3 font-body text-sm rounded-sm placeholder:text-[var(--text-ghost)] transition-all duration-200 ${focusClasses}`;

  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-[2px] mb-2" style={{ color: 'var(--text-tertiary)' }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={5}
          className={`${common} resize-none`}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={common}
          style={inputStyle}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 font-body text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
