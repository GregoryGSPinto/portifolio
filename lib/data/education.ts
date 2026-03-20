export interface EducationEntry {
  institution: string;
  degree: { pt: string; en: string };
  period: string;
  status: 'in-progress' | 'completed';
}

export const educationEntries: EducationEntry[] = [
  {
    institution: 'Centro Universitario UniFatecie',
    degree: {
      pt: 'Bacharelado em Engenharia de Software',
      en: 'Bachelor in Software Engineering',
    },
    period: 'Oct 2023 - Dec 2027',
    status: 'in-progress',
  },
  {
    institution: 'UNOPAR',
    degree: {
      pt: 'Analise de Sistemas',
      en: 'Associate Degree in Computer Systems Analysis',
    },
    period: 'Aug 2024',
    status: 'completed',
  },
  {
    institution: 'UNOPAR',
    degree: {
      pt: 'Logistica',
      en: 'Associate Degree in Logistics',
    },
    period: 'Aug 2017 - Jul 2021',
    status: 'completed',
  },
  {
    institution: 'FGV',
    degree: {
      pt: 'Sustentabilidade',
      en: 'Professional Qualification in Sustainability',
    },
    period: 'Jan 2017',
    status: 'completed',
  },
];
