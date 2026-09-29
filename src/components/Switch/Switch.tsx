'use client';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-4 w-7 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-[#0a0a0a]' : 'bg-[#e0e0e0]'
        }`}
      >
        <span
  className={`absolute left-0.5 top-0.5 size-3 rounded-full bg-[#ffffff] transition-transform duration-200 ${
    checked ? 'translate-x-3' : 'translate-x-0'
  }`}
/>
      </button>
      {label && <span className="text-[14px] text-text-primary">{label}</span>}
    </label>
  );
}