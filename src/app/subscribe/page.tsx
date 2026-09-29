import Image from 'next/image';
import { TestimonialLoop } from '@/components/sections/Subscribe/TestimonialLoop';



export default function SubscribePage() {
  return (
    <section className="flex flex-col items-center bg-[#fafafa]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-5 py-14 md:gap-[60px] md:px-20 md:py-[110px]">
    <TestimonialLoop />



        {/* 구독 소개 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-[600px] break-keep text-[28px] leading-[1.2] tracking-[-0.4px] text-text-primary md:text-[52px] md:leading-[1.1] md:tracking-[-0.78px]">
            매주, 당신의 문화생활을 위한 영감
          </h1>
          <p className="max-w-[480px] text-[14px] leading-[1.6] text-text-secondary md:text-[16px] md:leading-[1.75]">
            CULTR 에디터가 엄선한 전시, 공연, 콘서트 소식과 관람 팁을 매주 화요일 무료로 보내드립니다.
          </p>
        </div>

        {/* 구독 양식 */}
        <div className="flex w-full max-w-[420px] flex-col items-center gap-5 rounded-[20px] bg-[#ffffff] p-7">
          <Image
            src="/images/subscribe-blob.png"
            alt=""
            width={120}
            height={120}
          />
          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-[26px] font-bold text-text-primary">구독 시작하기</h2>
            <p className="text-[14px] text-text-secondary">매주 화요일, 문화생활이 메일함에</p>
          </div>
          <form className="flex w-full items-center gap-2">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="w-full flex-1 rounded-[12px] bg-[#f5f5f5] px-5 py-3 text-[14px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="구독하기"
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1a1a1a]"
            >
              <PaperPlaneIcon className="size-4 text-[#ffffff]" />
            </button>
          </form>
          <p className="text-center text-[12px] leading-[1.5] text-[#c0c0c0]">
            구독 신청 시 개인정보 수집 및 이용에 동의하게 됩니다. 언제든 구독을 해지할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M223.87,114.87,54.19,24.83A16,16,0,0,0,31,43.15L52.72,128,31,212.85a16,16,0,0,0,23.19,18.32l169.68-90a16,16,0,0,0,0-26.3ZM47.83,214.87h0L69,132h60a4,4,0,0,0,0-8H69L47.82,41.13,216,128Z" />
    </svg>
  );
}