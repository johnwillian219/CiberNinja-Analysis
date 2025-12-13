// src/icons/LabIcon.jsx
export default function LabIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Símbolo delta (Δ) com ponto superior - representando análise/variação */}
      <path d="M12 4l-8 16h16L12 4zm0 3.5l5.5 11h-11L12 7.5zm0 2.5l-3.5 7h7L12 10z" />
      {/* Ponto superior */}
      <circle cx="12" cy="4" r="1" />
    </svg>
  );
}
