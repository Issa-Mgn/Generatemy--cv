import { useEffect, useState } from 'react';

const templates = [
  { name: 'Moderne bleu', format: 'format1' },
  { name: 'Minimaliste épuré', format: 'format2' },
  { name: 'Exécutif bleu nuit', format: 'format3' },
  { name: 'Contemporain split', format: 'format4' },
  { name: 'Classique centré', format: 'format5' },
  { name: 'Créatif moderne', format: 'format6' },
  { name: 'Élégance sable', format: 'format7' },
  { name: 'Minimaliste sombre', format: 'format8' },
  { name: 'Corporate bordure', format: 'format9' },
  { name: 'Luxe moderne', format: 'format10' },
];

const Line = ({ x, y, w, fill = '#C9E0E9' }) => (
  <rect x={x} y={y} width={w} height="4" rx="2" fill={fill} />
);

const TemplateThumbnail = ({ format, name }) => {
  return (
    <svg className={`template-thumb template-thumb-${format}`} viewBox="0 0 150 104" role="img" aria-label={`Aperçu ${name}`}>
      {format === 'format1' && (
        <>
          <rect width="150" height="104" rx="8" fill="#fff" />
          <rect width="48" height="104" rx="8" fill="#003152" />
          <circle cx="24" cy="22" r="12" fill="#ADDFF1" />
          <Line x="12" y="43" w="25" fill="#ADDFF1" />
          <Line x="12" y="54" w="30" fill="#7FAEC0" />
          <Line x="12" y="71" w="28" fill="#ADDFF1" />
          <Line x="60" y="18" w="54" fill="#003152" />
          <Line x="60" y="32" w="70" />
          <Line x="60" y="45" w="58" />
          <Line x="60" y="64" w="72" fill="#D6E9F0" />
          <Line x="60" y="78" w="52" fill="#D6E9F0" />
        </>
      )}

      {format === 'format2' && (
        <>
          <rect width="150" height="104" rx="8" fill="#fff" />
          <circle cx="75" cy="18" r="10" fill="#ADDFF1" />
          <Line x="48" y="34" w="54" fill="#003152" />
          <Line x="58" y="45" w="34" fill="#7FAEC0" />
          <line x1="22" y1="58" x2="128" y2="58" stroke="#D6E9F0" strokeWidth="2" />
          <Line x="24" y="70" w="52" />
          <Line x="84" y="70" w="38" />
          <Line x="24" y="84" w="84" fill="#D6E9F0" />
        </>
      )}

      {format === 'format3' && (
        <>
          <rect width="150" height="104" rx="8" fill="#fff" />
          <rect width="150" height="34" rx="8" fill="#1E3A8A" />
          <circle cx="24" cy="17" r="10" fill="#93C5FD" />
          <Line x="42" y="12" w="52" fill="#fff" />
          <Line x="104" y="10" w="28" fill="#DBEAFE" />
          <Line x="18" y="50" w="34" fill="#1E3A8A" />
          <Line x="18" y="64" w="40" />
          <Line x="72" y="50" w="48" fill="#1E3A8A" />
          <Line x="72" y="64" w="58" />
          <Line x="72" y="78" w="44" fill="#D6E9F0" />
        </>
      )}

      {format === 'format4' && (
        <>
          <rect width="150" height="104" rx="8" fill="#fff" />
          <rect width="55" height="104" rx="8" fill="#F3FBFE" />
          <rect x="16" y="14" width="24" height="24" rx="6" fill="#003152" />
          <Line x="14" y="53" w="30" fill="#003152" />
          <Line x="14" y="66" w="25" />
          <Line x="66" y="18" w="54" fill="#003152" />
          <Line x="66" y="32" w="42" fill="#7FAEC0" />
          <line x1="66" y1="56" x2="118" y2="56" stroke="#003152" strokeWidth="2" />
          <Line x="72" y="70" w="50" />
          <Line x="72" y="84" w="40" fill="#D6E9F0" />
        </>
      )}

      {format === 'format5' && (
        <>
          <rect width="150" height="104" rx="8" fill="#fff" />
          <circle cx="75" cy="16" r="10" fill="#F8FAFC" stroke="#003152" />
          <Line x="42" y="32" w="66" fill="#003152" />
          <Line x="55" y="44" w="40" fill="#7FAEC0" />
          <line x1="20" y1="56" x2="130" y2="56" stroke="#003152" strokeWidth="1.5" />
          <Line x="28" y="70" w="42" fill="#003152" />
          <Line x="82" y="70" w="38" />
          <Line x="28" y="84" w="72" fill="#D6E9F0" />
        </>
      )}

      {format === 'format6' && (
        <>
          <rect width="150" height="104" rx="8" fill="#F0F9FF" />
          <rect x="10" y="10" width="130" height="84" rx="8" fill="#fff" />
          <rect x="10" y="10" width="130" height="26" rx="8" fill="#0F766E" />
          <Line x="22" y="20" w="50" fill="#fff" />
          <circle cx="118" cy="23" r="11" fill="#ADDFF1" />
          <Line x="22" y="52" w="32" fill="#0F766E" />
          <Line x="22" y="65" w="28" />
          <Line x="70" y="52" w="42" fill="#003152" />
          <Line x="70" y="66" w="48" />
          <Line x="70" y="80" w="36" fill="#D6E9F0" />
        </>
      )}

      {format === 'format7' && (
        <>
          <rect width="150" height="104" rx="8" fill="#FBFCFE" />
          <rect x="102" width="48" height="104" rx="8" fill="#FFFBEB" />
          <Line x="18" y="18" w="58" fill="#003152" />
          <Line x="18" y="34" w="42" fill="#B45309" />
          <Line x="18" y="56" w="54" fill="#003152" />
          <Line x="18" y="70" w="68" />
          <circle cx="126" cy="22" r="12" fill="#FDE68A" />
          <Line x="112" y="50" w="26" fill="#B45309" />
          <Line x="112" y="66" w="22" fill="#D97706" />
        </>
      )}

      {format === 'format8' && (
        <>
          <rect width="150" height="104" rx="8" fill="#111827" />
          <Line x="18" y="18" w="64" fill="#F9FAFB" />
          <Line x="18" y="32" w="42" fill="#60A5FA" />
          <circle cx="124" cy="24" r="11" fill="#374151" />
          <Line x="18" y="56" w="50" fill="#60A5FA" />
          <Line x="18" y="70" w="62" fill="#6B7280" />
          <Line x="92" y="56" w="34" fill="#60A5FA" />
          <Line x="92" y="70" w="30" fill="#6B7280" />
        </>
      )}

      {format === 'format9' && (
        <>
          <rect width="150" height="104" rx="8" fill="#003152" />
          <rect x="4" y="4" width="142" height="96" rx="6" fill="#fff" />
          <circle cx="26" cy="23" r="10" fill="#ADDFF1" />
          <Line x="44" y="18" w="58" fill="#003152" />
          <Line x="110" y="16" w="22" />
          <Line x="18" y="48" w="62" fill="#003152" />
          <Line x="18" y="62" w="68" />
          <rect x="98" y="46" width="30" height="32" rx="4" fill="#F3FBFE" />
          <Line x="104" y="56" w="18" fill="#003152" />
          <Line x="104" y="68" w="14" />
        </>
      )}

      {format === 'format10' && (
        <>
          <rect width="150" height="104" rx="8" fill="#F3FBFE" />
          <rect width="150" height="34" rx="8" fill="#003152" />
          <circle cx="36" cy="36" r="14" fill="#fff" stroke="#ADDFF1" strokeWidth="4" />
          <Line x="58" y="18" w="56" fill="#fff" />
          <Line x="58" y="32" w="38" fill="#ADDFF1" />
          <Line x="18" y="62" w="36" fill="#003152" />
          <Line x="18" y="76" w="34" />
          <Line x="72" y="58" w="48" fill="#003152" />
          <Line x="72" y="72" w="54" />
          <Line x="72" y="86" w="40" fill="#D6E9F0" />
        </>
      )}
    </svg>
  );
};

const TemplateCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % templates.length);
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="template-list template-carousel" aria-label="Modèles disponibles">
      <div
        className="template-carousel-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {templates.map((template) => (
          <div key={template.name} className="template-item">
            <TemplateThumbnail format={template.format} name={template.name} />
            <span>{template.name}</span>
          </div>
        ))}
      </div>

      <div className="template-carousel-dots" aria-hidden="true">
        {templates.map((template, index) => (
          <span key={template.name} className={index === activeIndex ? 'is-active' : ''}></span>
        ))}
      </div>
    </div>
  );
};

export default TemplateCarousel;
