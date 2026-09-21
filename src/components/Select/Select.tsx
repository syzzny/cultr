import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectSize = 'medium' | 'large';

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  /** 필드 위에 표시되는 라벨 */
  label?: string;
  /** Figma: Size — Medium(40px) / Large(48px) */
  size?: SelectSize;
  options: SelectOption[];
  /** 값이 없을 때 보여줄 안내 문구 */
  placeholder?: string;
  /** 래퍼에 적용할 클래스 */
  wrapperClassName?: string;
};

const CONTROL_SIZE: Record<SelectSize, string> = {
  medium: 'h-10',
  large: 'h-12',
};

const SELECT_PADDING: Record<SelectSize, string> = {
  medium: 'pl-3.5 pr-10',
  large: 'pl-4 pr-11',
};

const CHEVRON_POSITION: Record<SelectSize, string> = {
  medium: 'right-3.5',
  large: 'right-4',
};

/**
 * CULTR / Select — 폼과 필터에서 단일 값을 선택하는 입력 컴포넌트
 * 네이티브 <select> 를 사용해서 키보드/모바일 접근성이 기본으로 보장돼요.
 */
export function Select({
  label,
  size = 'medium',
  options,
  placeholder,
  wrapperClassName,
  className,
  id,
  disabled,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={cx('flex w-full max-w-[320px] flex-col gap-2', wrapperClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className={cx(
            'text-[12px] font-medium leading-[normal] tracking-[0.012em]',
            disabled ? 'text-text-muted' : 'text-text-secondary',
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cx(
          'relative flex w-full items-center rounded-sm border border-border-default transition-colors',
          CONTROL_SIZE[size],
          disabled
            ? 'bg-surface-subtle text-text-muted'
            : 'bg-surface-default text-text-primary hover:border-border-strong focus-within:border-text-primary focus-within:ring-1 focus-within:ring-text-primary',
        )}
      >
        <select
          id={selectId}
          disabled={disabled}
          className={cx(
            'h-full w-full cursor-pointer appearance-none rounded-[inherit] border-0 bg-transparent text-[14px] font-normal leading-[normal] text-inherit outline-none disabled:cursor-not-allowed',
            SELECT_PADDING[size],
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 text-[14px] leading-none',
            CHEVRON_POSITION[size],
          )}
        >
          ⌄
        </span>
      </div>
    </div>
  );
}