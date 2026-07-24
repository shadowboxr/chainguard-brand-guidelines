// Chainguard star / sparkle used for call-out notes (Downloads/Star.svg).
// Uses currentColor so it inherits the call-out's color (Blurple, theme-aware).
export default function StarIcon({ size = 11, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10.7114 4.64887L6.67485 5.87225L9.33952 9.62397L8.07314 10.6842L5.35571 6.93252L2.63828 10.7114L1.37191 9.59678L4.06295 5.87225L0 4.64887L0.554039 3.01769L4.53785 4.21389V0H6.19996V4.21389L10.1838 3.01769L10.7114 4.64887Z"
        fill="currentColor"
      />
    </svg>
  );
}
