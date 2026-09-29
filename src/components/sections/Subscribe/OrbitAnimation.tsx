export function OrbitAnimation({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className ?? ''}`}>
      {/* 중심점 */}
      <div className="size-2.5 rounded-full bg-[#1a1a1a]" />

      {/* 회전하는 궤도 (점선 원) */}
      <div
        className="absolute size-20 animate-spin rounded-full border border-dashed border-[#1a1a1a]"
        style={{ animationDuration: '8s' }}
      >
        {/* 위성 */}
        <span className="absolute -top-2 left-8 size-[15px] border-2 border-[#1a1a1a] bg-[#2ec4b6]" />
      </div>
    </div>
  );
}