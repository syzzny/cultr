import Image from 'next/image';
import { GenerativeCanvas, type GenerativeMode } from './GenerativeCanvas';

type Curation = {
  mode: GenerativeMode;
  title: string;
  subtitle: string;
  icon: string;
  rows: { label: string; value: string }[];
};

const CURATIONS: Curation[] = [
  {
    mode: 'weekly',
    title: '위클리 큐레이션',
    subtitle: '매주 화요일 추천',
    icon: '/images/icon-weekly.png',
    rows: [
      { label: '발송 일정', value: '매주 화요일' },
      { label: '콘텐츠', value: '이번 주 추천 전시·공연·콘서트 5선' },
      { label: '포함 정보', value: '에디터 코멘트와 관람 팁' },
    ],
  },
  {
    mode: 'monthly',
    title: '먼슬리 딥다이브',
    subtitle: '매월 심층 큐레이션',
    icon: '/images/icon-monthly.png',
    rows: [
      { label: '발송 일정', value: '매월 첫째 주' },
      { label: '콘텐츠', value: '테마별 심층 문화 콘텐츠' },
      { label: '포함 정보', value: '인터뷰와 비하인드 스토리' },
    ],
  },
];

export function TwoCurationsSection() {
  return (
    <section className="flex flex-col items-center gap-8 bg-background-subtle px-5 py-14 md:gap-14 md:px-20 md:py-[100px]">
      <h2 className="text-[13px] font-medium leading-[normal] tracking-[0.015em] text-text-secondary">
        CULTR의 두 가지 큐레이션
      </h2>

      <div className="flex w-full max-w-[1000px] flex-col gap-5 md:flex-row md:gap-8 md:overflow-clip md:rounded-xs">
        {CURATIONS.map((card) => (
          <article
            key={card.mode}
            className="flex min-w-0 flex-1 flex-col border border-border-default bg-surface-default"
          >
            {/* 카드 위쪽 셰이더 그림 */}
            <div className="relative h-[165px] w-full md:h-[270px]">
              <GenerativeCanvas mode={card.mode} />
            </div>

            <div className="flex flex-col gap-4 p-4 md:gap-5 md:p-5">
              {/* 모바일: 아이콘이 오른쪽 / 웹: 아이콘이 왼쪽 */}
              <div className="flex flex-row-reverse items-center justify-between md:flex-row md:justify-start md:gap-4">
                <Image src={card.icon} alt="" width={28} height={28} className="shrink-0" />
                <div className="flex flex-col md:gap-1">
                  <h3 className="text-[14px] font-normal leading-[1.7] text-text-primary md:text-[18px] md:font-bold md:leading-[normal]">
                    {card.title}
                  </h3>
                  <p className="text-[12px] font-medium leading-[normal] tracking-[0.012em] text-text-secondary md:text-[13px] md:font-normal md:tracking-normal">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* 모바일에서만 보이는 구분선 (웹은 항목 사이에 구분선이 있어요) */}
              <hr className="h-px w-full border-0 bg-border-default md:hidden" />

              <dl className="flex flex-col gap-2 md:gap-2.5">
                {card.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 md:flex-col md:items-start md:gap-1.5 md:not-first:border-t md:not-first:border-border-default md:not-first:pt-2.5"
                  >
                    <dt className="text-[12px] font-medium leading-[normal] tracking-[0.012em] text-text-secondary md:text-[13px] md:tracking-normal">
                      {row.label}
                    </dt>
                    <dd className="text-right text-[12px] font-medium leading-[normal] tracking-[0.012em] text-text-primary md:text-left md:text-[14px] md:font-normal md:leading-[1.7] md:tracking-normal">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}