import Image from 'next/image';

type Testimonial = {
  quote: string;
  quoteMobile?: string; // 모바일 시안에서 문구가 다른 경우만
  author: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: '매주 화요일, 이번 주의 문화생활을 한 번에 정리할 수 있어서 너무 좋아요.',
    author: '김민지 / 마케터',
    avatar: '/images/avatar-1.png',
  },
  {
    quote: '추천 콘텐츠가 너무 다양해서 새로운 장르도 자연스럽게 발견하게 됩니다.',
    quoteMobile: '추천 콘텐츠가 다양해서 새로운 장르도 발견하게 됩니다.',
    author: '박준오 / 디자이너',
    avatar: '/images/avatar-2.png',
  },
  {
    quote: '에디터 코멘트와 관람 팁이 있어 실제로 방문하기 전에 준비가 더 쉬웠어요.',
    author: '이서연 / 문화기획자',
    avatar: '/images/avatar-1.png',
  },
];

export function TestimonialsSection() {
  return (
    <section className="flex flex-col items-start gap-8 bg-surface-default px-5 py-14 md:items-center md:gap-14 md:px-20 md:py-[100px]">
      {/* 헤더 */}
      <div className="flex w-full flex-col items-start gap-2 md:w-auto md:items-center md:gap-4">
        <p className="text-[13px] font-medium tracking-[0.195px] text-text-secondary">
          구독자 후기
        </p>
        <h2 className="text-[18px] font-medium text-text-primary md:text-center md:text-[40px] md:leading-[1.2] md:font-normal md:tracking-[-0.4px]">
          <span className="md:hidden">믿고 읽는 뉴스레터, 큐레이션</span>
          <span className="hidden md:inline">
            믿고 읽는 뉴스레터, 믿고 추천하는 큐레이션
          </span>
        </h2>
      </div>

      {/* 카드 */}
      <ul className="flex w-full max-w-[1000px] flex-col gap-3 md:flex-row md:items-start md:gap-8">
        {TESTIMONIALS.map((t) => (
          <li
            key={t.author}
            className="flex min-w-0 flex-col gap-[15px] border border-border-default bg-surface-default p-5 md:flex-1 md:gap-5 md:p-8"
          >
            <Image
              src={t.avatar}
              alt=""
              width={28}
              height={28}
              className="size-6 md:size-7"
            />
            <figure className="flex flex-col gap-[15px] md:gap-5">
              <blockquote className="text-[14px] text-text-primary md:text-[18px] md:leading-[1.7]">
                {t.quoteMobile ? (
                  <>
                    <span className="md:hidden">“{t.quoteMobile}”</span>
                    <span className="hidden md:inline">“{t.quote}”</span>
                  </>
                ) : (
                  <>“{t.quote}”</>
                )}
              </blockquote>
              <figcaption className="text-[12px] font-medium tracking-[0.144px] text-text-muted md:text-[13px] md:tracking-normal">
                {t.author}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}