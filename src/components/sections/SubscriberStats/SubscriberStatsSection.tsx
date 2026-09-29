'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HoverNoiseCanvas } from './HoverNoiseCanvas';

type Stat = {
  icon: string;
  iconSize: number;
  value: string;
  label: string;
  description: string;
};

const STATS: Stat[] = [
  {
    icon: '/images/icon-subscribers.svg',
    iconSize: 24,
    value: '12,000+',
    label: '구독자',
    description: '매주 뉴스레터를 받아보는 구독자 수',
  },
  {
    icon: '/images/icon-sent.svg',
    iconSize: 24,
    value: '120+',
    label: '발송횟수',
    description: '지금까지 발송된 뉴스레터 수',
  },
  {
    icon: '/images/icon-categories.svg',
    iconSize: 24,
    value: '6개',
    label: '큐레이션 카테고리',
    description: '전시부터 해외행사까지',
  },
  {
    icon: '/images/icon-rating.svg',
    iconSize: 28,
    value: '4.9점',
    label: '평균 만족도',
    description: '구독 후 남겨주신 평균 평점',
  },
];

const PALETTES = [
  // 1. 구독자 — 주황
  {
    a: [0.91, 0.36, 0.02] as [number, number, number],
    b: [0.91, 0.77, 0.42] as [number, number, number],
    c: [0.66, 0.85, 0.86] as [number, number, number],
    d: [0.16, 0.62, 0.56] as [number, number, number],
    e: [0.11, 0.21, 0.34] as [number, number, number],
  },
  // 2. 발송횟수 — 블루/민트
  {
    a: [0.42, 0.62, 0.82] as [number, number, number],
    b: [0.93, 0.96, 0.95] as [number, number, number],
    c: [0.68, 0.83, 0.90] as [number, number, number],
    d: [0.45, 0.75, 0.55] as [number, number, number],
    e: [0.20, 0.32, 0.46] as [number, number, number],
  },
  // 3. 큐레이션 카테고리 — 핑크/마젠타
  {
    a: [0.95, 0.62, 0.42] as [number, number, number],
    b: [0.98, 0.87, 0.90] as [number, number, number],
    c: [0.95, 0.55, 0.75] as [number, number, number],
    d: [0.85, 0.10, 0.45] as [number, number, number],
    e: [0.50, 0.06, 0.30] as [number, number, number],
  },
  // 4. 평균 만족도 — 연두
  {
    a: [0.65, 0.80, 0.30] as [number, number, number],
    b: [0.93, 0.94, 0.85] as [number, number, number],
    c: [0.80, 0.88, 0.55] as [number, number, number],
    d: [0.42, 0.48, 0.38] as [number, number, number],
    e: [0.32, 0.38, 0.28] as [number, number, number],
  },
];

function StatCell({ stat, palette }: { stat: Stat; palette: (typeof PALETTES)[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex h-[190px] flex-col justify-between overflow-hidden border-b border-r border-border-default bg-surface-default p-10"
    >
      {/* 호버 애니메이션: 평소엔 투명, 호버하면 서서히 나타남 */}
      <HoverNoiseCanvas
        active={isHovered}
        colors={palette}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 아이콘 + 숫자 */}
      <div className="relative z-10 flex w-full items-start justify-between">
        <Image
          src={stat.icon}
          alt=""
          width={stat.iconSize}
          height={stat.iconSize}
          className={`transition-[filter] duration-300 ${
            isHovered ? 'invert brightness-0 invert' : ''
          }`}
        />
        <p
  className={`text-[40px] font-light leading-none transition-colors duration-300 ${
    isHovered ? 'text-[#ffffff]' : 'text-text-primary'
  }`}
>
  {stat.value}
</p>
      </div>

      {/* 라벨 + 설명 */}
<div className="relative z-10 flex w-full flex-col gap-1.5 text-[13px]">
  <p
    className={`transition-colors duration-300 ${
      isHovered ? 'text-[#ffffff]' : 'text-text-primary'
    }`}
  >
    {stat.label}
  </p>
  <p
    className={`transition-colors duration-300 ${
      isHovered ? 'text-[#ffffff]/65' : 'text-text-secondary'
    }`}
  >
    {stat.description}
  </p>
</div>
    </div>
  );
}

export function SubscriberStatsSection() {
  return (
    <section className="hidden bg-surface-default md:flex md:items-center md:justify-center">
      <div className="mx-auto flex w-full max-w-[1440px] items-stretch px-20 py-[100px]">
        {/* 왼쪽 헤드라인 */}
        <div className="flex w-[480px] shrink-0 flex-col justify-center gap-8 border border-border-default px-10">
          <h2 className="text-[40px] leading-[1.2] tracking-[-0.4px] text-text-primary">
            매주, 믿을 수 있는
            <br />
            문화 큐레이션
          </h2>
          <p className="w-[340px] text-[14px] leading-[1.7] text-text-secondary">
            엄선된 콘텐츠, 투명한 정보, 검증된 큐레이션으로
            <br />
            문화생활의 새로운 기준을 만들어갑니다.
          </p>
        </div>

        {/* 통계 2x2 그리드 */}
        <div className="grid flex-1 grid-cols-2 border border-l-0 border-border-default">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} palette={PALETTES[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}