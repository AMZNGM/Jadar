import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'

export default function VideoModal({ videoUrl, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 flex justify-center items-center bg-bg/75 backdrop-blur-sm duration-200 z-50">
      <div onClick={(e) => e.stopPropagation()} className="relative w-[90%] h-[60%] max-md:h-[25%] max-w-[1000px] bg-bg">
        <CloseBtn onClick={onClose} className="-translate-y-16 right-0!" />
        <iframe
          src={`${videoUrl}?autoplay=1&rel=0&controls=0`}
          allowFullScreen
          loading="lazy"
          frameBorder="0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute inset-0 size-full"
        />
      </div>
    </div>
  )
}
