import Image from 'next/image';
import { BottomCTASection } from '@/components/sections/BottomCTA/BottomCTASection';
import { SwirlCanvas } from '@/components/sections/About/SwirlCanvas';

type Principle = {
  title: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    title: '엄선된 콘텐츠',
    description: '수많은 문화 소식 중 지금 볼 가치가 있는 경험을 에디터가 직접 고릅니다.',
  },
  {
    title: '투명한 정보',
    description: '일정과 장소, 관람 팁까지 실제 선택에 필요한 정보를 간결하게 전합니다.',
  },
  {
    title: '새로운 발견',
    description: '익숙한 장르를 넘어 자연스럽게 새로운 문화 취향을 만날 수 있도록 연결합니다.',
  },
];

type CurationInfo = {
  label: string;
  value: string;
};

type Curation = {
  icon: string;
  title: string;
  infos: CurationInfo[];
};

const CURATIONS: Curation[] = [
  {
    icon: '/images/icon-weekly.png',
    title: '위클리 큐레이션',
    infos: [
      { label: '발송 일정', value: '매주 화요일' },
      { label: '콘텐츠', value: '이번 주 추천 전시·공연·콘서트 5선' },
      { label: '포함 정보', value: '에디터 코멘트와 관람 팁' },
    ],
  },
  {
    icon: '/images/icon-monthly.png',
    title: '먼슬리 딥다이브',
    infos: [
      { label: '발송 일정', value: '매월 마지막 주' },
      { label: '콘텐츠', value: '하나의 문화 주제를 깊이 읽는 특집' },
      { label: '포함 정보', value: '맥락과 인터뷰, 확장된 읽을거리' },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 페이지 소개 */}
      <section className="flex flex-col items-start gap-6 bg-[#fafafa] px-5 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-start gap-6">
          <p className="text-[12px] font-medium tracking-[0.144px] text-text-secondary">
            ABOUT CULTR
          </p>
          <h1 className="max-w-[820px] break-keep text-[32px] leading-[1.2] text-text-primary md:text-[52px] md:leading-[1.1] md:tracking-[-0.78px]">
            Culture, Curated for You
          </h1>
          <p className="max-w-[600px] break-keep text-[14px] leading-[1.6] text-text-secondary md:text-[16px] md:leading-[1.75]">
            CULTR는 번거로운 정보 탐색 없이 나를 위한 문화적 영감을 만날 수 있도록, 믿을 수 있는 문화생활을 선별해 전하는 큐레이션 뉴스레터입니다.
          </p>
        </div>
      </section>

      {/* CULTR 원칙 */}
      <section className="flex flex-col items-center bg-[#fafafa] px-5 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-10 md:flex-row md:gap-16">
          <div className="relative aspect-square w-full max-w-[480px] shrink-0 overflow-hidden bg-[#ffffff] md:h-[420px] md:w-[380px]">
            <SwirlCanvas className="absolute inset-0 size-full" />
          </div>
          <div className="flex w-full flex-col gap-9">
            <div className="flex flex-col gap-4">
              <p className="text-[13px] font-medium tracking-[0.195px] text-text-secondary">
                ABOUT CULTR
              </p>
              <h2 className="break-keep text-[26px] leading-[1.2] tracking-[-0.4px] text-text-primary md:text-[36px]">
                문화생활의 새로운 기준을 만듭니다
              </h2>
            </div>
            <div className="flex flex-col gap-5 py-4">
              {PRINCIPLES.map((principle, i) => (
                <div key={principle.title} className="flex flex-col gap-5">
                  {i > 0 && <div className="h-px w-full bg-border-default" />}
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] leading-[1.75] text-text-primary">{principle.title}</p>
                    <p className="text-[14px] leading-[1.6] text-text-secondary">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 두 가지 큐레이션 */}
      <section className="flex flex-col items-center px-5 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-10 md:gap-12">
          <h2 className="break-keep text-center text-[26px] leading-[1.2] tracking-[-0.4px] text-text-primary md:text-[36px]">
            CULTR의 두 가지 큐레이션
          </h2>
          <div className="flex w-full flex-col gap-5 md:flex-row md:gap-6">
            {CURATIONS.map((curation) => (
              <div
                key={curation.title}
                className="flex flex-1 flex-col gap-[22px] border border-border-default p-8"
              >
                <Image src={curation.icon} alt="" width={28} height={28} />
                <p className="text-[20px] leading-[1.3] text-text-primary md:text-[22px]">
                  {curation.title}
                </p>
                <div className="flex w-full flex-col gap-2.5">
                  {curation.infos.map((info, i) => (
                    <div key={info.label} className="flex w-full flex-col gap-1.5">
                      {i > 0 && <div className="h-px w-full bg-border-default" />}
                      <p className="text-[13px] font-medium text-text-secondary">{info.label}</p>
                      <p className="text-[14px] text-text-primary">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  );
}