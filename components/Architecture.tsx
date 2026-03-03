'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { architectureLayers } from '@/lib/data';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Architecture() {
  const { language } = useLanguage();
  const t = translations[language].architecture;
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  return (
    <section id="architecture" className="py-40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="02" label={t.label} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
          {/* Left: Title and desc */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light mb-8 whitespace-pre-line"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.1,
                color: '#E8E4DE',
              }}
            >
              {t.title}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[15px] leading-[1.8]"
              style={{ color: 'rgba(232, 228, 222, 0.4)' }}
            >
              {t.desc}
            </motion.p>
          </motion.div>

          {/* Right: Interactive diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col gap-3"
          >
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={layer.name}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredLayer(index)}
                onMouseLeave={() => setHoveredLayer(null)}
                className="flex items-center gap-4 rounded-[14px] cursor-default transition-all duration-300"
                style={{
                  padding: '20px 28px',
                  background: hoveredLayer === index
                    ? `${layer.color}12`
                    : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${hoveredLayer === index ? `${layer.color}30` : 'rgba(255, 255, 255, 0.04)'}`,
                  transform: hoveredLayer === index ? 'translateX(8px)' : 'translateX(0)',
                }}
              >
                {/* Dot indicator */}
                <div
                  className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                  style={{
                    background: layer.color,
                    opacity: hoveredLayer === index ? 1 : 0.4,
                    boxShadow: hoveredLayer === index ? `0 0 12px ${layer.color}60` : 'none',
                  }}
                />

                {/* Layer name */}
                <span
                  className="font-mono text-[12px] tracking-[1px] uppercase shrink-0 transition-colors duration-300"
                  style={{
                    minWidth: '130px',
                    color: hoveredLayer === index ? layer.color : 'rgba(232, 228, 222, 0.35)',
                  }}
                >
                  {layer.name}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {layer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-3 py-1 rounded-sm transition-all duration-300"
                      style={{
                        background: hoveredLayer === index
                          ? `${layer.color}15`
                          : 'rgba(255, 255, 255, 0.03)',
                        color: hoveredLayer === index
                          ? layer.color
                          : 'rgba(232, 228, 222, 0.25)',
                        border: `1px solid ${hoveredLayer === index ? `${layer.color}25` : 'rgba(255, 255, 255, 0.04)'}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
