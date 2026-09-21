'use client';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cx } from '../../lib/cx';

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type DropdownProps = {
  options: DropdownOption[];
  /** 제어 모드 값 */
  value?: string;
  /** 비제어 모드 초기값 */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** 선택된 값이 없을 때 트리거에 표시할 문구 */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

/**
 * CULTR / Dropdown — 트리거와 옵션 메뉴를 함께 제공하는 선택 메뉴 컴포넌트
 * Figma: Dropdown Closed / Open · Item Default / Hover / Selected / Disabled
 *
 * 키보드: Enter/Space/↓ 로 열기, ↑↓ 이동, Enter 선택, Esc 닫기
 */
export function Dropdown({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = '선택',
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: DropdownProps) {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : innerValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === selectedValue);

  const enabledIndexes = options
    .map((o, i) => (o.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const openMenu = () => {
    if (disabled) return;
    const selectedIndex = options.findIndex((o) => o.value === selectedValue);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : (enabledIndexes[0] ?? -1));
    setOpen(true);
  };

  const closeMenu = () => setOpen(false);

  const select = (option: DropdownOption) => {
    if (option.disabled) return;
    if (!isControlled) setInnerValue(option.value);
    onChange?.(option.value);
    closeMenu();
  };

  const move = (direction: 1 | -1) => {
    if (enabledIndexes.length === 0) return;
    const pos = enabledIndexes.indexOf(activeIndex);
    const next =
      pos === -1
        ? direction === 1
          ? 0
          : enabledIndexes.length - 1
        : (pos + direction + enabledIndexes.length) % enabledIndexes.length;
    setActiveIndex(enabledIndexes[next]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!open) openMenu();
        else move(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!open) openMenu();
        else move(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!open) openMenu();
        else if (activeIndex >= 0) select(options[activeIndex]);
        break;
      case 'Escape':
        if (open) {
          event.preventDefault();
          closeMenu();
        }
        break;
      case 'Tab':
        closeMenu();
        break;
    }
  };

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

    return (
    <div
      ref={rootRef}
      className={cx('relative w-full max-w-[320px] self-start text-[14px] leading-[normal]', className)}
    >
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onKeyDown}
        className={cx(
          'flex h-12 w-full cursor-pointer items-center justify-between rounded-sm border bg-surface-default px-4 text-left text-text-primary transition-colors',
          'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-text-muted',
          open
            ? 'border-border-strong ring-1 ring-border-strong'
            : 'border-border-default hover:not-disabled:border-border-strong focus-visible:border-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary',
        )}
      >
        <span className={cx(!selected && 'text-text-muted')}>
          {selected ? selected.label : placeholder}
        </span>
        <span aria-hidden="true">{open ? '⌃' : '⌄'}</span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-10 w-full overflow-hidden rounded-sm border border-border-default bg-surface-default py-2"
        >
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const isActive = index === activeIndex && !isSelected && !option.disabled;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                onClick={() => select(option)}
                className={cx(
                  'flex h-11 items-center justify-between px-3.5',
                  isSelected && 'cursor-pointer bg-background-inverse text-text-inverse',
                  option.disabled && 'cursor-not-allowed bg-surface-default text-text-muted',
                  !isSelected && !option.disabled && 'cursor-pointer text-text-primary',
                  isActive ? 'bg-surface-subtle' : !isSelected && !option.disabled && 'bg-surface-default',
                )}
              >
                <span>{option.label}</span>
                {isSelected && <span aria-hidden="true">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

