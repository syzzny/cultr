export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center justify-center rounded-full border border-[#c2c2c2] bg-surface-subtle px-2 py-0.5 text-[12px] font-medium text-[#424242]">
      {children}
    </span>
  );
}