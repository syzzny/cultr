'use client';

import { useState } from 'react';
import Image from 'next/image';

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: '구독료가 있나요?',
    answer: 'CULTR 뉴스레터는 무료입니다. 매주 화요일 추천 큐레이션을 이메일로 받아보실 수 있습니다.',
  },
  {
    question: '발송 주기가 겹치나요?',
    answer: '위클리 큐레이션과 먼슬리 딥다이브는 별도 발송 주기를 따르며, 겹치지 않도록 구성했습니다.',
  },
  {
    question: '언제든 해지할 수 있나요?',
    answer: '뉴스레터 하단의 해지 링크를 통해 언제든 구독을 해지할 수 있습니다.',
  },
  {
    question: '어떤 지역 정보를 받을 수 있나요?',
    answer:
      '서울을 중심으로 국내 주요 도시의 전시, 공연, 콘서트 정보를 주로 제공하며, 해외 문화행사와 아트페어 소식도 함께 전달합니다.',
  },
];

function FaqAccordionItem({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border-default p-6 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <p className="flex-1 text-[16px] font-medium text-text-primary md:text-[18px]">
          {item.question}
        </p>
        <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-subtle">
          <Image
            src={isOpen ? 'images/icon-minus.svg' : 'images/icon-plus.svg'}
            alt = ""
            width={16}
            height={16}
            >
          </Image>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr] pt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[13px] leading-[1.6] text-text-secondary md:text-[14px] md:leading-[1.7]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="flex flex-col items-center gap-8 bg-surface-default px-5 py-14 md:gap-14 md:px-20 md:py-[100px]">
      <div className="flex w-full flex-col items-center gap-2 md:w-[640px] md:gap-4">
        <p className="text-center text-[13px] font-medium tracking-[0.195px] text-text-secondary">
          자주 묻는 질문
        </p>
        <h2 className="text-center text-[22px] leading-[1.2] text-text-primary md:text-[40px] md:tracking-[-0.4px]">
          뉴스레터 이용 관련 자주 묻는 질문
        </h2>
      </div>

      <div className="w-full max-w-[1000px] overflow-hidden rounded-xs border border-border-default">
        {FAQS.map((item, i) => (
          <FaqAccordionItem key={item.question} item={item} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  );
}