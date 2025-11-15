export default function ProgressBar({ isLoading, className = '' }) {
  return (
    <>
      {isLoading && (
        <div className={`absolute w-full h-1 bg-bg/30 overflow-hidden ${className}`}>
          <div
            className="h-full bg-main animate-progress-bar"
            style={{
              animation: 'progressBar 2s ease-in-out infinite',
            }}
          />
          <style>
            {`
            @keyframes progressBar {
              0% {
                width: 0%;
                transform: translateX(-100%);
              }
              50% {
                width: 100%;
                transform: translateX(0%);
              }
              100% {
                width: 0%;
                transform: translateX(100%);
              }
            }
            `}
          </style>
        </div>
      )}
    </>
  )
}
