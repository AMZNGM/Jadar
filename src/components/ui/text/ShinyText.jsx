export default function ShinyText({ text, disabled = false, speed = 5, className = '', textColor = '#ededed' }) {
  const animationDuration = `${speed}s`

  return (
    <div>
      <h1
        aria-label={text}
        className={`
          inline-block bg-clip-text text-transparent bg-linear-to-r bg-size-[200%_100%]
          ${disabled ? '' : 'animate-shine'}
          ${className}
        `}
        style={{
          animationDuration,
          backgroundImage: `linear-gradient(90deg, ${textColor}, ${textColor}20, ${textColor})`,
        }}
      >
        {text}
      </h1>

      <style>
        {`
        @keyframes shine {
          from {
            background-position: 200% 0;
          }
          to {
            background-position: -200% 0;
          }
        }
        .animate-shine {
          animation: shine linear infinite;
        }
        `}
      </style>
    </div>
  )
}
