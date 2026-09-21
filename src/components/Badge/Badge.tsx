import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { ImageIcon } from '../icons';

export type BadgeTone = 'neutral' | 'inverse' | 'outline' | 'glass';
export type BadgeSize = 'small' | 'medium';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Figma: Tone — Neutral / Inverse / Outline / Glass */
  tone?: BadgeTone;
  /** Figma: Size — Small / Medium */
  size?: BadgeSize;
  /** 생략: 텍스트만 / true: 기본 아이콘 / ReactNode: 직접 지정한 아이콘 */
  icon?: boolean | ReactNode;
  children: ReactNode;
};

const BASE = 'inline-flex shrink-0 items-center justify-center border whitespace-nowrap leading-[normal]';

const TONE: Record<BadgeTone, string> = {
  neutral: 'rounded-xs border-transparent bg-surface-warm text-text-strong',
  inverse: 'rounded-xs border-transparent bg-background-inverse text-text-inverse',
  outline: 'rounded-xs border-border-default bg-surface-default text-text-strong',
  glass: 'rounded-pill border-border-glass bg-state-on-primary-16 text-text-on-glass',
};

/** CULTR/Label/Tag (Bold 11px) / CULTR/Label/Navigation (Medium 13px) */
const SIZE: Record<BadgeSize, string> = {
  small: 'gap-1 text-[11px] font-bold tracking-[0.008em]',
  medium: 'gap-1.5 text-[13px] font-medium',
};

/** Glass 는 좌우 여백이 조금 더 넓어요 */
const PADDING: Record<BadgeSize, { normal: string; glass: string }> = {
  small: { normal: 'px-2.5 py-1.5', glass: 'px-3 py-1.5' },
  medium: { normal: 'px-3 py-[7px]', glass: 'px-3.5 py-[7px]' },
};

/**
 * CULTR / Badge — 카테고리, 상태, 짧은 메타 정보를 표시하는 비상호작용 컴포넌트
 * Glass 톤은 어두운 배경(이미지 위)에서 사용하세요.
 */
export function Badge({
  tone = 'neutral',
  size = 'small',
  icon,
  className,
  children,
  ...rest
}: BadgeProps) {
  const iconNode = icon === true ? <ImageIcon /> : icon || null;
  const padding = PADDING[size][tone === 'glass' ? 'glass' : 'normal'];

  return (
    <span className={cx(BASE, TONE[tone], SIZE[size], padding, className)} {...rest}>
      {iconNode && <span className="inline-flex size-3.5">{iconNode}</span>}
      <span>{children}</span>
    </span>
  );
}