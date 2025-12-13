export default function MonetizationIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Coin */}
      <circle cx="12" cy="12" r="10" />

      {/* Dollar sign */}
      <path
        d="M13 6.5V5h-2v1.5c-1.7.3-3 1.5-3 3.2 0 1.9 1.5 2.7 3.6 3.2 1.6.4 2.4.8 2.4 1.7 0 .9-.8 1.4-2 1.4-1.2 0-2.1-.5-2.3-1.6H8c.2 1.8 1.4 3 3 3.4V19h2v-1.6c1.8-.3 3-1.5 3-3.1 0-2-1.6-2.8-3.6-3.3-1.5-.4-2.4-.7-2.4-1.6 0-.8.7-1.3 1.8-1.3 1.2 0 1.9.6 2.1 1.5h1.8c-.2-1.6-1.3-2.8-2.7-3.1z"
        fill="black"
      />
    </svg>
  );
}
