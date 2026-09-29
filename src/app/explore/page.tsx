'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dropdown } from '@/components/Dropdown/Dropdown'; // 실제 경로에 맞게 조정해주세요
import { BottomCTASection } from '@/components/sections/BottomCTA/BottomCTASection';
import { CATEGORY_ICON, type Category } from '@/lib/categoryIcons';

type ExploreItem = {
  category: Category;
  title: string;
  date: string;
  venue: string;
  image: string;
};

// 목업 데이터: Figma에 있는 그대로 (일부 중복). 나중에 실제 18개로 교체하세요.
const ITEMS: ExploreItem[] = [
  {
    category: '전시',
    title: '2024 현대미술사:시간의 조각',
    date: '2024.12.12',
    venue: '예술의전당 오페라하우스',
    image: '/images/weekly-1.jpg',
  },
  {
    category: '공연',
    title: '알바트로스: 무대 위의 기억',
    date: '2024.12.12',
    venue: '예술의전당 오페라하우스',
    image: '/images/weekly-2.jpg',
  },
  {
    category: '콘서트',
    title: '시그널: 라이브 인 서울',
    date: '2024.12.14',
    venue: '블루스퀘어 마스터카드 더 스테이지',
    image: '/images/weekly-3.jpg',
  },
  {
    category: '공연',
    title: '알바트로스: 무대 위의 기억',
    date: '2024.12.12',
    venue: '예술의전당 오페라하우스',
    image: '/images/weekly-2.jpg',
  },
  {
    category: '콘서트',
    title: '시그널: 라이브 인 서울',
    date: '2024.12.14',
    venue: '블루스퀘어 마스터카드 더 스테이지',
    image: '/images/weekly-3.jpg',
  },
];

const CATEGORY_OPTIONS = [
  { value: '전체', label: '전체' },
  { value: '전시', label: '전시' },
  { value: '공연', label: '공연' },
  { value: '콘서트', label: '콘서트' },
  { value: '페스티벌', label: '페스티벌' },
  { value: '아트페어·마켓', label: '아트페어·마켓' },
  { value: '영화·체험', label: '영화·체험' },
];

function ExploreCard({ item }: { item: ExploreItem }) {
  return (
    <div className="flex flex-col overflow-hidden border border-border-default bg-surface-default">
      <div className="relative h-[210px] w-full shrink-0">
        <Image src={item.image} alt="" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-pill bg-state-on-primary-16 px-3 py-1.5">
          <Image src={CATEGORY_ICON[item.category]} alt="" width={14} height={14} />
          <span className="text-[11px] font-bold tracking-[0.088px] text-text-on-glass">
            {item.category}
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <p className="text-[22px] leading-[1.3] text-text-primary">{item.title}</p>
        <dl className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-1.5">
            <dt className="text-[13px] font-medium text-text-secondary">날짜</dt>
            <dd className="text-[14px] text-text-primary">{item.date}</dd>
          </div>
          <div className="h-px w-full bg-border-default" />
          <div className="flex flex-col gap-1.5">
            <dt className="text-[13px] font-medium text-text-secondary">장소</dt>
            <dd className="text-[14px] text-text-primary">{item.venue}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [category, setCategory] = useState('전체');

  const filtered = ITEMS.filter((item) => category === '전체' || item.category === category);

  return (
    <>
      {/* 페이지 소개 */}
      <section className="flex justify-center bg-background-subtle px-5 py-14 md:px-20 md:py-24">
        <div className="flex w-full max-w-[1000px] flex-col items-start gap-4 md:gap-6">
          <p className="text-[12px] font-medium tracking-[0.144px] text-text-secondary">
            EXPLORE CULTURE
          </p>
          <h1 className="max-w-[820px] text-[32px] leading-[1.1] tracking-[-0.5px] text-text-primary md:text-[52px] md:tracking-[-0.78px]">
            모든 문화생활을 한 곳에서
          </h1>
          <p className="text-[14px] leading-[1.6] text-text-secondary md:text-[16px] md:leading-[1.75]">
            이번 주의 전시, 공연, 콘서트부터 새롭게 발견하는 문화 경험까지 CULTR의 큐레이션을 둘러보세요.
          </p>
        </div>
      </section>

      {/* 탐색 영역 */}
      <section className="flex flex-col items-center gap-10 px-5 py-14 md:px-20 md:py-[88px]">
        <div className="flex w-full max-w-[1000px] items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[18px] leading-[1.3] text-text-primary md:text-[22px]">전체보기</p>
            <p className="text-[13px] font-medium tracking-[0.195px] text-text-secondary">
              이번 주 에디터 추천 {ITEMS.length * 3 + 3}
            </p>
          </div>
          <div className="w-[120px] shrink-0 md:w-[180px]">
            <Dropdown
              options={CATEGORY_OPTIONS}
              value={category}
              onChange={setCategory}
              aria-label="카테고리"
            />
          </div>
        </div>

        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item, i) => (
            <ExploreCard key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </section>

      <BottomCTASection />
    </>
  );
}