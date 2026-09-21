import Image from 'next/image';
import Link from 'next/link';
import { buttonClassName } from '@/components/Button/Button';

const NAV_LINKS = [
  { href: '/explore', label: '탐색' },
  { href: '/archive', label: '아카이브' },
];

export function Header() {
  return (
    <header className="flex h-[58px] items-center justify-between border-b border-border-inverse bg-background-inverse px-5 md:h-[77px] md:px-20">
      <Link href="/" className="inline-flex" aria-label="CULTR 홈">
        <Image
          src="/logo-white-pc.svg"
          alt=""
          width={58}
          height={20}
          className="hidden md:block"
          unoptimized
          priority
        />
        <Image
          src="/logo-white-mobile.svg"
          alt=""
          width={40}
          height={14}
          className="block md:hidden"
          unoptimized
          priority
        />
      </Link>

      <nav className="flex items-center gap-4 md:gap-8" aria-label="주요 메뉴">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] font-medium leading-[normal] text-text-inverse-muted hover:text-text-inverse md:text-[14px] md:font-normal"
          >
            {link.label}
          </Link>
        ))}
        <Link href="/subscribe" className={buttonClassName({ size: 'small' })}>
          <span>구독하기</span>
        </Link>
      </nav>
    </header>
  );
}