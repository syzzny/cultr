'use client';

import { useId, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> & {
  /** 헤더에 표시되는 제목 (CULTR/Heading/FAQ) */
  title: ReactNode;
  /** 펼쳐졌을 때 보이는 설명 (CULTR/Body/Default) */
  children: ReactNode;
  /** 비제어 모드의 초기 상태 */
  defaultOpen?: boolean;
  /** 제어 모드 */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * CULTR / Accordion — FAQ와 정보 공개 영역에 사용하는 기본 아코디언
 * width 는 부모를 따라가고 최대 640px 이에요.
 */
export function Accordion({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  ...rest
}: AccordionProps) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : innerOpen;

  const baseId = useId();
  const headerId = `${baseId}-header`;
  const panelId = `${baseId}-panel`;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInnerOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div
      className={cx('w-full max-w-[640px] border-b border-border-default bg-surface-default', className)}
      {...rest}
    >
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className="flex h-16 w-full cursor-pointer items-center justify-between px-5 text-left text-text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-text-primary"
        >
          <span className="text-[18px] font-medium leading-[normal]">{title}</span>
          <span aria-hidden="true" className="text-[18px] font-medium leading-[normal]">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        className="bg-surface-subtle px-5 pb-5 pt-3 text-[14px] leading-[1.7] text-text-secondary"
      >
        {children}
      </div>
    </div>
  );
}