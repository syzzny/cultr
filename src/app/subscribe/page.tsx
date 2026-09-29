import Image from 'next/image';
import { TestimonialLoop } from '@/components/sections/Subscribe/TestimonialLoop';
import { OrbitAnimation } from '@/components/sections/Subscribe/OrbitAnimation';
import { SubscribeForm } from '@/components/sections/Subscribe/SubscribeForm';

export default function SubscribePage() {
  return (
    <section className="flex flex-col items-center gap-16 bg-[#fafafa] px-5 py-14 md:gap-[100px] md:px-20 md:pb-[120px] md:pt-[110px]">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-16 md:gap-[80px]">
        <TestimonialLoop />

        {/* 구독 양식 */}
        <div className="flex w-full max-w-[420px] flex-col items-center gap-6 rounded-[20px] bg-[#ffffff] p-7">
          <div className="flex w-full flex-col items-start gap-2">
            <h1 className="break-keep text-[22px] font-bold leading-[1.3] text-text-primary md:text-[26px]">
              매주 당신의 문화생활을 위한 영감
            </h1>
            <p className="break-keep text-[14px] leading-[1.7] text-text-secondary">
              CULTR 에디터가 엄선한 전시, 공연, 콘서트 소식과 관람 팁을 매주 화요일 무료로 보내드립니다.
            </p>
          </div>

          <OrbitAnimation className='size-[120px]'/>

          <div className="flex w-full flex-col gap-2">
            <SubscribeForm></SubscribeForm>
          </div>
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