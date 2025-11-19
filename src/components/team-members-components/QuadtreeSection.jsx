import { Quadtree } from '@/data/mediaData/svgs'

export default function QuadtreeSection({ quadtreeRef, svgRef, polylineRef, markerRef }) {
  return (
    <div ref={quadtreeRef} className="flex relative z-0 justify-center items-center size-full max-md:hidden">
      <Quadtree />
      <ArrowSvg svgRef={svgRef} polylineRef={polylineRef} markerRef={markerRef} />
    </div>
  )
}

const ArrowSvg = ({ svgRef, polylineRef, markerRef }) => (
  <svg ref={svgRef} className="absolute top-0 left-10 w-full h-300 max-lg:hidden" viewBox="0 0 800 800">
    <g
      ref={polylineRef}
      strokeWidth="0.5"
      stroke="hsl(12, 84%, 46%)"
      fill="none"
      strokeLinecap="square"
      strokeDasharray="15 18"
      transform="matrix(0.9702957262759965,0.24192189559966773,-0.24192189559966773,0.9702957262759965,-14.349532270531483,-134.8870487502657)"
    >
      <polyline points="307.5,153 492.5,153 492.5,647" markerEnd="url(#SvgjsMarker1820)" />
    </g>
    <defs>
      <marker ref={markerRef} markerWidth="14" markerHeight="14" refX="7" refY="7" viewBox="0 0 14 14" orient="auto" id="SvgjsMarker1820">
        <polygon points="0,14 7,7 0,0 14,7" fill="hsl(12, 84%, 46%)" />
      </marker>
    </defs>
  </svg>
)
