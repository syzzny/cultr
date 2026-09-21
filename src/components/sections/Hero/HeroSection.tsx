import Link from 'next/link';
import { buttonClassName } from '@/components/Button/Button';
import { CaretRightIcon } from '@/components/icons';
import { TicketCard } from './TicketCard';

// 모바일은 Medium(35px), 웹은 Large(41px) 버튼이에요.
const RESPONSIVE_SIZE = 'md:h-[41px] md:min-w-[92px] md:px-5';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-9 bg-background-inverse px-5 pb-16 pt-12 md:gap-12 md:px-20 md:pb-[140px] md:pt-[100px]">
      <TicketCard />

      {/* 웹에서는 md:contents 로 풀어서 제목/설명이 section 의 gap(48px)을 그대로 따라요 */}
      <div className="flex w-full flex-col items-center gap-[15px] text-center md:contents">
        {/* 모바일은 Noto Sans KR 40px, 웹은 Sprat 68px (Figma 디자인 그대로) */}
        <h1 className="w-full text-[40px] font-normal leading-[1.2] tracking-[-0.01em] text-background-subtle md:w-auto md:font-display md:text-[68px] md:font-light md:leading-[1.05] md:tracking-[-0.02em]">
          Culture,
          <br />
          Curated for You
        </h1>

        {/* 모바일/웹 문구가 서로 달라서 따로 두었어요 */}
        <p className="w-full text-[14px] leading-[normal] text-text-secondary md:hidden">
          매주 엄선된 전시, 공연, 콘서트 정보를 이메일로 받아보세요. 번거로운 정보 탐색 없이 특별한 영감을 전해드립니다.
        </p>
        <p className="hidden w-[480px] text-[16px] leading-[1.75] text-text-secondary md:block">
          매주 엄선된 전시, 공연, 콘서트 정보를 이메일로 받아보세요.
          <br />
          번거로운 정보 탐색 없이 오직 나를 위한 특별한 영감을 전해드립니다.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-3 md:w-auto md:flex-row md:gap-4">
        <Link
          href="/subscribe"
          className={buttonClassName({ size: 'medium', className: RESPONSIVE_SIZE })}
        >
          <span>구독하기</span>
        </Link>
        <Link
          href="/archive"
          className={buttonClassName({
            variant: 'secondary',
            size: 'medium',
            className: RESPONSIVE_SIZE,
          })}
        >
          <span>지난 호 보기</span>
          <span className="inline-flex size-3.5">
            <CaretRightIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}