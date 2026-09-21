import Link from 'next/link';

type FooterGroup = {
  title: string;
  links: { label: string; href: string }[];
};

// TODO: '#' 은 아직 페이지가 없는 링크예요. 페이지를 만들 때 실제 경로로 바꾸세요.
const MAIN_GROUPS: FooterGroup[] = [
  {
    title: '큐레이션',
    links: [
      { label: '위클리 큐레이션', href: '/explore' },
      { label: '먼슬리 딥다이브', href: '/explore' },
      { label: '아카이브', href: '/archive' },
    ],
  },
  {
    title: '카테고리',
    links: [
      { label: '전시', href: '/explore' },
      { label: '공연', href: '/explore' },
      { label: '콘서트', href: '/explore' },
      { label: '페스티벌', href: '/explore' },
    ],
  },
  {
    title: '회사',
    links: [
      { label: '소개', href: '/about' },
      { label: '채용', href: '#' },
      { label: '문의', href: '#' },
    ],
  },
];

const SIDE_GROUPS: FooterGroup[] = [
  {
    title: '법적고지',
    links: [
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
    ],
  },
  {
    title: '소셜',
    links: [
      { label: '인스타그램', href: '#' },
      { label: 'X (트위터)', href: '#' },
      { label: '뉴스레터 구독', href: '/subscribe' },
    ],
  },
];

function FooterColumn({ title, links }: FooterGroup) {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <h2 className="text-[12px] font-bold leading-[normal] text-text-primary">{title}</h2>
      <ul className="flex flex-col gap-2 md:gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[12px] leading-[normal] text-text-secondary hover:text-text-primary md:text-[13px]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col gap-8 border-t border-border-default bg-background-subtle px-5 pb-10 pt-12 md:gap-12 md:px-20 md:pb-12 md:pt-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full flex-col gap-3 md:w-[220px] md:gap-4">
          <p className="text-[12px] font-extrabold leading-[normal] text-text-primary md:text-[15px]">
            CULTR
          </p>
          <p className="text-[13px] leading-[1.6] text-text-secondary md:leading-[1.7]">
            문화생활 큐레이션 뉴스레터. 매주 엄선된 전시, 공연, 페스티벌 정보를 배달합니다.
          </p>
        </div>

        {/* 웹에서는 contents 로 풀어서 각 열이 위 flex 의 칸이 되고, 모바일에서는 3열 한 줄로 배치해요 */}
        <div className="flex w-full justify-between md:contents">
          {MAIN_GROUPS.map((group) => (
            <FooterColumn key={group.title} {...group} />
          ))}
          {/* 모바일 디자인에는 법적고지/소셜 열이 없어요 */}
          <div className="hidden md:flex md:flex-col md:gap-8">
            {SIDE_GROUPS.map((group) => (
              <FooterColumn key={group.title} {...group} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-4">
        <hr className="h-px w-full border-0 bg-border-default" />
        <div className="flex flex-col items-start gap-2 text-[12px] md:flex-row md:items-center md:justify-between md:gap-4">
          <p className="text-text-secondary">CULTR © 2026. All rights reserved.</p>
          <p className="text-[11px] leading-[1.4] text-text-muted md:text-[12px] md:leading-[normal]">
            (주)컬터 | 서울시 종로구 문화로 123 | 사업자등록번호: 120-00-00000
          </p>
        </div>
      </div>
    </footer>
  );
}