import Image from 'next/image';

type Capability = {
  icon: string;
  title: string;
  description: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: '/images/cap-exhibition.svg',
    title: '전시회 큐레이션',
    description: '국내외 주요 미술관과 갤러리의 기획전을 매주 엄선해 전달합니다.',
  },
  {
    icon: '/images/cap-performance.svg',
    title: '공연 · 뮤지컬',
    description: '연극, 뮤지컬, 오페라, 발레까지 이번 주 놓치면 안 될 무대 공연을 추천합니다.',
  },
  {
    icon: '/images/cap-concert.svg',
    title: '콘서트 · 페스티벌',
    description: '클래식부터 재즈, 인디까지 다양한 장르의 공연과 야외 페스티벌 정보를 전합니다.',
  },
  {
    icon: '/images/cap-artfair.svg',
    title: '아트페어 · 마켓',
    description: '국내외 아트페어와 플리마켓, 디자인 마켓 일정을 놓치지 않도록 미리 안내합니다.',
  },
  {
    icon: '/images/cap-popup.svg',
    title: '팝업 · 체험',
    description: '브랜드 팝업 스토어와 이색 체험 공간, 한정 이벤트 소식을 빠르게 전달합니다.',
  },
  {
    icon: '/images/cap-overseas.svg',
    title: '해외 문화행사',
    description: '해외여행 중 문화생활을 즐기고 싶은 분들을 위한 도시별 문화 이벤트 가이드.',
  },
];

export function CapabilitiesSection() {
  return (
    <section className="flex flex-col items-center gap-8 bg-background-subtle px-5 py-14 md:gap-16 md:px-20 md:py-[100px]">
      <div className="flex w-full flex-col items-center gap-2 md:w-[640px] md:gap-4">
        <p className="text-center text-[13px] font-medium tracking-[0.195px] text-text-secondary">
          엄선된 문화 큐레이션
        </p>
        <h2 className="text-center text-[22px] leading-[1.2] text-text-primary md:text-[40px] md:tracking-[-0.4px]">
          모든 장르의 문화생활을 한 곳에서
        </h2>
      </div>

      {/* 모바일: 1열 / 웹: 3열 그리드 */}
      <div className="flex w-full max-w-[1000px] flex-col divide-y divide-border-default border-y border-border-default md:grid md:grid-cols-3 md:divide-y-0 md:border-y-0 md:border-l md:border-t md:border-border-default">
        {CAPABILITIES.map((item, i) => (
  <div
    key={item.title}
    className={`flex flex-col gap-[15px] p-6 md:border-b md:border-r md:border-border-default md:p-10 ${
      i % 2 === 0 ? 'bg-surface-default' : ''
    }`}
  >
    <Image src={item.icon} alt="" width={28} height={28} />
    <div className="flex flex-col gap-2.5">
      <p className="text-[16px] text-text-primary md:text-[18px]">{item.title}</p>
      <p className="text-[13px] leading-[1.6] text-text-secondary md:text-[14px] md:leading-[1.7]">
        {item.description}
      </p>
    </div>
  </div>
))}
      </div>
    </section>
  );
}