export const siteConfig = {
  name: 'Gregory Guimaraes',
  legalName: 'Gregory Guimaraes',
  title: 'Gregory Guimaraes | Product-minded Software Architect',
  shortTitle: 'Gregory Guimaraes',
  description:
    'Portfolio of Gregory Guimaraes, a software architect focused on turning complex operations into resilient products with clear architecture, measurable delivery, and premium execution.',
  url: 'https://gregorypinto.dev',
  locale: 'en_US',
  alternateLocale: 'pt_BR',
  ogImage:
    '/api/og?title=Gregory%20Guimaraes&subtitle=Product-minded%20Software%20Architect',
  email: 'gregoryguimaraes12@outlook.com',
  links: {
    github: 'https://github.com/GregoryGSPinto',
    linkedin: 'https://www.linkedin.com/in/mqt-gregory/',
    repository: 'https://github.com/GregoryGSPinto/portifolio',
  },
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}
