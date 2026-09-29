import Image from 'next/image';
import { CATEGORY_ICON, type Category } from '@/lib/categoryIcons';

type WeeklyPick = {
  category: Category;
  title: string;
  date: string;
  venue: string;
  image: string;
};

const PICKS: WeeklyPick[] = [
  {
    category: '전시',
    title: '2024 현대미술사:시간의 조각',
    date: '2024.12.11',
    venue: '예술의전당 오페라하우스',
    image: '/images/weekly-1.jpg',
  },
  {
    category: '공연',
    title: '알바트로스: 무대 위의 기억',
    date: '2024.12.15',
    venue: '예술의전당 오페라하우스',
    image: '/images/weekly-2.jpg',
  },
  {
    category: '콘서트',
    title: '시그널: 라이브 인 서울',
    date: '2024.12.30',
    venue: '블루스퀘어 마스터카드 더 스테이지',
    image: '/images/weekly-3.jpg',
  },
];

function PickCard({ pick }: { pick: WeeklyPick }) {
  return (
    <div className="flex w-[280px] shrink-0 snap-start flex-col overflow-hidden border border-border-default bg-surface-default md:w-auto md:flex-1 md:shrink">
      <div className="relative h-[180px] w-full shrink-0 md:h-[210px]">
        <Image src={pick.image} alt="" fill className="object-cover" sizes="(min-width: 768px) 33vw, 280px" />
        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-pill bg-state-on-primary-16 px-3 py-1.5">
  <Image src={CATEGORY_ICON[pick.category]} alt="" width={14} height={14} />
  <span className="text-[11px] font-bold tracking-[0.088px] text-text-on-glass">
    {pick.category}
  </span>
</span>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <p className="text-[22px] leading-[1.3] text-text-primary">{pick.title}</p>
        <dl className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-1.5">
            <dt className="text-[13px] font-medium text-text-secondary">날짜</dt>
            <dd className="text-[14px] text-text-primary">{pick.date}</dd>
          </div>
          <div className="h-px w-full bg-border-default" />
          <div className="flex flex-col gap-1.5">
            <dt className="text-[13px] font-medium text-text-secondary">장소</dt>
            <dd className="text-[14px] text-text-primary">{pick.venue}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function ThisWeekCULTRSection() {
  return (
    <section className="flex flex-col items-center gap-8 bg-background-subtle px-5 py-14 md:gap-14 md:px-20 md:py-[100px]">
      <div className="flex flex-col items-center gap-2 md:w-[640px] md:gap-4">
        <p className="text-center text-[13px] font-medium tracking-[0.195px] text-text-secondary">
          이번 주 CULTR 추천
        </p>
        <h2 className="text-center text-[22px] leading-[1.2] text-text-primary md:text-[40px] md:tracking-[-0.4px]">
          에디터가 직접 고른 이번 주의 문화생활
        </h2>
      </div>

      {/* 모바일: 가로 스크롤 / 웹: 3열 */}
      <div className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:w-full md:max-w-[1000px] md:snap-none md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {PICKS.map((pick) => (
          <PickCard key={pick.title} pick={pick} />
        ))}
      </div>
    </section>
  );
}