export default function TeamList({ members, activeIndex, namesRef, onMemberClick }) {
  if (!members.length) {
    return <p className="text-2xl font-extralight uppercase text-main text-center">No team members found.</p>
  }

  return (
    <div className="flex-1 scroll-smooth snap-y snap-mandatory font-light">
      {members.map((member, index) => (
        <TeamListItem
          key={member.id}
          member={member}
          index={index}
          isActive={activeIndex === index}
          ref={(el) => (namesRef.current[index] = el)}
          onClick={() => onMemberClick(member, index)}
        />
      ))}
    </div>
  )
}

const TeamListItem = ({ member, index, isActive, onClick, ref }) => (
  <div
    ref={ref}
    onClick={onClick}
    tabIndex={0}
    className={`flex max-md:flex-row-reverse justify-center max-md:justify-between items-center gap-4 py-12 max-md:py-6 px-4 border-b border-main/30 uppercase duration-300 cursor-pointer ${
      isActive ? 'text-main font-medium' : 'text-text/50 hover:text-main'
    }`}
  >
    <span className="text-sm max-md:text-[12px]">{member.role}</span>
    <span className="text-4xl max-md:text-2xl max-sm:text-lg">{member.name}</span>
  </div>
)
