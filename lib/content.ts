import { siteConfig } from '@/lib/site';

export const contactFallbackCopy = {
  pt: `O formulario esta indisponivel no momento. Envie um email direto para ${siteConfig.email}.`,
  en: `The form is temporarily unavailable. Please email ${siteConfig.email} directly.`,
} as const;
