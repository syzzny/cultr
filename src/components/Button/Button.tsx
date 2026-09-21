import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { CaretRightIcon } from '../icons';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

type CommonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Figma: Type — Primary / Secondary / Ghost */
  variant?: ButtonVariant;
  /** Figma: Size — Small / Medium / Large */
  size?: ButtonSize;
};

type TextButtonProps = CommonProps & {
  children: ReactNode;
  /** 텍스트 오른쪽에 붙는 아이콘 (Content: Text + icon) */
  icon?: ReactNode;
  iconOnly?: false;
};

type IconOnlyButtonProps = CommonProps & {
  /** Content: Icon only. 접근성을 위해 aria-label 이 필수예요. */
  iconOnly: true;
  icon?: ReactNode;
  'aria-label': string;
  children?: never;
};

export type ButtonProps = TextButtonProps | IconOnlyButtonProps;

const BASE =
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border font-medium whitespace-nowrap transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ' +
  'disabled:cursor-not-allowed disabled:text-action-disabled-label';

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-action-primary-background text-action-primary-label ' +
    'hover:not-disabled:bg-action-primary-hover active:not-disabled:bg-action-primary-pressed ' +
    'disabled:bg-action-disabled-background',
  secondary:
    'border-transparent bg-action-secondary-background text-action-secondary-label ' +
    'hover:not-disabled:bg-action-secondary-hover active:not-disabled:bg-action-secondary-pressed ' +
    'disabled:bg-action-disabled-background',
  ghost:
    'border-border-default bg-transparent text-text-primary ' +
    'hover:not-disabled:bg-action-ghost-hover ' +
    'active:not-disabled:border-border-strong active:not-disabled:bg-transparent active:not-disabled:text-text-secondary',
};

/** Content: Text / Text + icon */
const SIZE_TEXT: Record<ButtonSize, string> = {
  small: 'h-[26px] rounded-xs px-3 text-[11px] leading-[14px]',
  medium: 'h-[35px] min-w-[84px] rounded-sm px-4 text-[13px] leading-[normal]',
  large: 'h-[41px] min-w-[92px] rounded-sm px-5 text-[13px] leading-[normal]',
};

/** Content: Icon only */
const SIZE_ICON: Record<ButtonSize, string> = {
  small: 'size-[26px] rounded-xs',
  medium: 'h-[35px] w-[37px] rounded-sm',
  large: 'h-[41px] w-[45px] rounded-sm',
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  className?: string;
};

/** <Link> 처럼 button 이 아닌 요소를 버튼 모양으로 만들 때도 쓸 수 있어요. */
export function buttonClassName({
  variant = 'primary',
  size = 'large',
  iconOnly = false,
  className,
}: ButtonStyleOptions = {}) {
  return cx(BASE, VARIANT[variant], iconOnly ? SIZE_ICON[size] : SIZE_TEXT[size], className);
}

/**
 * CULTR / Button
 * State(Default / Hover / Pressed / Disabled)는 hover: / active: / disabled: 로 처리해요.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'large',
    icon,
    iconOnly = false,
    className,
    type = 'button',
    children,
    ...rest
  } = props;

  const resolvedIcon = icon ?? (iconOnly ? <CaretRightIcon /> : null);

  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, iconOnly, className })}
      {...rest}
    >
      {!iconOnly && <span>{children}</span>}
      {resolvedIcon && <span className="inline-flex size-3.5">{resolvedIcon}</span>}
    </button>
  );
}