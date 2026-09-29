'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Switch } from '@/components/Switch/Switch';
import { Tag } from '@/components/Tag/Tag';
import { Button } from '@/components/Button/Button';
import { CaretRightIcon } from '@/components/icons';
import { BottomCTASection } from '@/components/sections/BottomCTA/BottomCTASection';

type ArchiveType = 'weekly' | 'monthly';

type ArchiveItem = {
  type: ArchiveType;
  label: string;
  issue: string;
  date: string;
  title: string;
  description: string;
  cover: string;
};

const ARCHIVES: ArchiveItem[] = [
  {
    type: 'weekly',
    label: '위클리',
    issue: 'VOL. 48',
    date: '2026. 09. 08',
    title: '가을의 시작을 여는 전시와 공연',
    description: '에디터의 코멘트와 관람 팁, 놓치지 말아야 할 이번 주의 문화 소식',
    cover: '/images/archive-1.jpg',
  },
  {
    type: 'weekly',
    label: '위클리',
    issue: 'VOL. 47',
    date: '2026. 09. 01',
    title: '도시의 밤을 바꾸는 라이브 사운드',
    description: '에디터의 코멘트와 관람 팁, 놓치지 말아야 할 이번 주의 문화 소식',
    cover: '/images/archive-2.jpg',
  },
  {
    type: 'monthly',
    label: '먼슬리',
    issue: 'MONTHLY 08',
    date: '2026. 08. 28',
    title: '한 장르를 깊이 읽는 법: 미디어 아트',
    description: '에디터의 코멘트와 관람 팁, 놓치지 말아야 할 이번 주의 문화 소식',
    cover: '/images/archive-3.jpg',
  },
];

export default function ArchivePage() {
  const [showWeekly, setShowWeekly] = useState(true);
const [showMonthly, setShowMonthly] = useState(true);

  const noFilter = !showWeekly && !showMonthly;
  const filtered = ARCHIVES.filter(
    (item) => noFilter || (showWeekly && item.type === 'weekly') || (showMonthly && item.type === 'monthly'),
  );

  return (
    <>
      {/* 페이지 소개 */}
      <section className="flex justify-center bg-background-subtle px-5 py-14 md:px-20 md:py-24">
        <div className="flex w-full max-w-[1000px] flex-col items-start gap-4 md:gap-6">
          <p className="text-[12px] font-medium tracking-[0.144px] text-text-secondary">
            NEWSLETTER ARCHIVE
          </p>
          <h1 className="max-w-[820px] text-[32px] leading-[1.1] tracking-[-0.5px] text-text-primary md:text-[52px] md:tracking-[-0.78px]">
            지난 뉴스레터를 다시 읽어보세요
          </h1>
          <p className="text-[14px] leading-[1.6] text-text-secondary md:text-[16px] md:leading-[1.75]">
            매주 도착한 위클리 큐레이션과 한 달의 주제를 깊이 들여다본 먼슬리 딥다이브를 한곳에 모았습니다.
          </p>
        </div>
      </section>

      {/* 아카이브 목록 */}
      <section className="flex flex-col items-center gap-8 px-5 py-14 md:px-20 md:py-16">
        <div className="flex w-full max-w-[1000px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
          <p className="text-[18px] leading-[1.3] text-text-primary md:text-[22px]">지난 호 보기</p>
          <div className="flex items-center gap-6">
            <Switch checked={showWeekly} onChange={setShowWeekly} label="위클리" />
            <Switch checked={showMonthly} onChange={setShowMonthly} label="먼슬리" />
          </div>
        </div>

        <div className="flex w-full max-w-[1000px] flex-col gap-4">
          {filtered.map((item) => (
            <div
              key={item.issue}
              className="flex flex-col gap-4 border border-border-default p-6 md:flex-row md:items-center md:gap-7"
            >
              <div className="relative h-[140px] w-full shrink-0 md:h-[112px] md:w-[180px]">
                <Image src={item.cover} alt="" fill className="object-cover" sizes="180px" />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Tag>{item.label}</Tag>
                  <p className="font-mono text-[11px] text-text-secondary">
                    {item.issue} · {item.date}
                  </p>
                </div>
                <p className="text-[18px] leading-[1.3] text-text-primary md:text-[22px]">{item.title}</p>
                <p className="text-[13px] text-text-secondary md:text-[14px]">{item.description}</p>
              </div>
              <Button iconOnly variant="ghost" size="medium" icon={<CaretRightIcon />} aria-label="자세히 보기" />
            </div>
          ))}
        </div>
      </section>

      <BottomCTASection />
    </>
  );
}