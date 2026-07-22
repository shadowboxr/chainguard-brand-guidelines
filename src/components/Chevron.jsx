export default function Chevron({ size = 14 }) {
  return (
    <svg width={(size * 8) / 14} height={size} viewBox="0 0 8 14" fill="none" aria-hidden="true">
      <path
        d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z"
        fill="currentColor"
      />
    </svg>
  );
}
