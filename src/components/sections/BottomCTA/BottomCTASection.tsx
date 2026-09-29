import Image from 'next/image';
import { Button } from '@/components/Button/Button'; // 실제 경로에 맞게 조정해주세요
import { GrowthAsciiCanvas } from './GrowthAsciiCanvas';

export function BottomCTASection() {
  return (
    <section className="flex flex-col items-center bg-background-inverse">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-5 pt-14 md:flex-row md:items-center md:justify-center md:gap-0 md:px-20 md:py-0">
        {/* 왼쪽: 헤드라인 + 폼 */}
        <div className="flex w-full flex-col items-start gap-5 md:w-auto md:flex-1 md:gap-8">
          <div className="flex w-full flex-col items-start gap-[15px] md:gap-0">
            <h2 className="w-full text-[22px] leading-[1.3] text-[#fafafa] md:text-[52px] md:leading-[1.1] md:tracking-[-0.78px]">
              매주 화요일,
              <br />
              문화생활이 메일함에
            </h2>
            <p className="w-full text-[14px] leading-[1.5] text-text-secondary md:mt-4 md:w-[340px] md:text-[16px] md:leading-[1.75]">
              CULTR 에디터들이 엄선한 이번 주의 전시, 공연, 콘서트 소식을 매주 화요일 받아보세요.
            </p>
          </div>

          <form className="flex w-full items-center justify-between gap-2 rounded-[4px] border border-[#2a2a2a] bg-[#1a1a1a] p-1.5 md:w-[480px] md:rounded-[3px] md:p-[7px]">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="w-full bg-transparent px-2.5 text-[13px] text-text-secondary placeholder:text-text-secondary focus:outline-none md:text-[14px]"
            />
            <Button size="medium">구독하기</Button>
          </form>
        </div>

        <div className="relative mt-8 aspect-[719/520] w-full shrink-0 overflow-hidden md:mt-0 md:aspect-[719/810] md:h-full md:w-auto md:flex-1 md:self-stretch">
  <GrowthAsciiCanvas />
</div>
      </div>
    </section>
  );
}