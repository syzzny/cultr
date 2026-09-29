'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Testimonial = {
  name: string;
  avatar: string;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: '김지수',
    avatar: '/images/subscribe-avatar-main.jpg',
    text: '매주 화요일 아침마다 CULTR 뉴스레터를 읽는 게 루틴이 됐어요.',
  },
  {
    name: '정하늘',
    avatar: '/images/subscribe-avatar-1.jpg',
    text: '믿고 보는 에디터 픽 덕분에 주말 계획이 쉬워졌어요.',
  },
  {
    name: '박서연',
    avatar: '/images/subscribe-avatar-2.jpg',
    text: '덕분에 주말마다 갈 만한 전시를 놓치지 않게 됐어요.',
  },
  {
    name: '이도현',
    avatar: '/images/subscribe-avatar-3.jpg',
    text: '큐레이션이 좋아서 매번 새로운 공연을 발견해요.',
  },
];

const INTERVAL_MS = 4000;

export function TestimonialLoop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <div className="flex w-full flex-col items-center gap-[30px]">
      {/* 후기 행: 아바타+이름 | 말풍선 (한 줄, 세로 중앙 정렬) */}
      <div className="flex w-full max-w-[760px] items-center gap-4 justify-center">
        <div className="flex shrink-0 items-center gap-1.5">
          <Image
            key={current.avatar}
            src={current.avatar}
            alt={current.name}
            width={24}
            height={24}
            className="animate-fade-in rounded-full"
          />
          <span key={`name-${index}`} className="animate-fade-in text-[13px] font-medium text-text-primary">
            {current.name}
          </span>
        </div>
        <p
  key={`bubble-${index}`}
  className="animate-fade-in max-w-[480px] rounded-[16px] bg-surface-subtle px-4 py-2.5 text-[13px] leading-[1.5] text-text-primary"
>
  {current.text}
</p>
      </div>

      {/* 아바타 스택 + 좋아요 */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.avatar}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t.name} 후기 보기`}
              className={`mr-[-4px] cursor-pointer rounded-full border-2 transition-all duration-300 last:mr-0 ${
                i === index ? 'z-10 scale-110 border-[#ffffff]' : 'border-[#fafafa] opacity-50'
              }`}
            >
              <Image src={t.avatar} alt="" width={22} height={22} className="rounded-full" />
            </button>
          ))}
        </div>
        <span className="rounded-full bg-[#f2f2f7] px-2.5 py-1 text-[12px] text-text-primary">
          👍 4
        </span>
      </div>
    </div>
  );
}