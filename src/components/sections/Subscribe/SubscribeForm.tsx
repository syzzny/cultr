'use client';

import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setError('올바른 이메일 형식으로 입력해 주세요.');
      return;
    }
    setError('');
    // TODO: 실제 구독 제출 로직
  };

  return (
    <div className="flex w-full flex-col gap-2">
  <form onSubmit={handleSubmit} noValidate className="flex w-full items-center gap-2.5">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
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

  {error && (
    <p className="text-[12px] leading-[1.5] text-[#e5484d]">{error}</p>
  )}

  <p className="text-[12px] leading-[1.5] text-[#c0c0c0]">
    구독 신청 시 개인정보 수집 및 이용에 동의하게 됩니다. 언제든 구독을 해지할 수 있습니다.
  </p>
</div>
  );
}

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M223.87,114.87,54.19,24.83A16,16,0,0,0,31,43.15L52.72,128,31,212.85a16,16,0,0,0,23.19,18.32l169.68-90a16,16,0,0,0,0-26.3ZM47.83,214.87h0L69,132h60a4,4,0,0,0,0-8H69L47.82,41.13,216,128Z" />
    </svg>
  );
}