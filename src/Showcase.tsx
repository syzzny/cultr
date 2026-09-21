'use client';
import { useState } from 'react';
import { Accordion, Badge, Button, Dropdown, Select } from './components';
import { CaretRightIcon } from './components/icons';

const categoryOptions = [
  { value: 'all', label: '전체보기' },
  { value: '1', label: '옵션 1' },
  { value: '2', label: '옵션 2' },
  { value: '3', label: '옵션 3', disabled: true },
];

const row = { display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' } as const;
const section = { display: 'grid', gap: 16, marginBottom: 48 } as const;

/** 컴포넌트 확인용 페이지 — 프로젝트의 라우트/엔트리에서 자유롭게 렌더링하세요. */
export function Showcase() {
  const [category, setCategory] = useState('all');

  return (
    <main style={{ padding: 48, maxWidth: 960 }}>
      <section style={section}>
        <h2 className="t-heading-card">Button</h2>
        <div style={row}>
          <Button>구독하기</Button>
          <Button icon={<CaretRightIcon />}>구독하기</Button>
          <Button iconOnly aria-label="다음" />
          <Button variant="secondary" icon={<CaretRightIcon />}>구독하기</Button>
          <Button variant="ghost" icon={<CaretRightIcon />}>구독하기</Button>
          <Button variant="ghost" iconOnly aria-label="다음" />
          <Button disabled>구독하기</Button>
        </div>
        <div style={row}>
          <Button size="small">구독하기</Button>
          <Button size="medium">구독하기</Button>
          <Button size="large">구독하기</Button>
        </div>
      </section>

      <section style={section}>
        <h2 className="t-heading-card">Badge</h2>
        <div style={row}>
          <Badge>전시</Badge>
          <Badge tone="inverse">전시</Badge>
          <Badge tone="outline">전시</Badge>
          <Badge icon>전시</Badge>
          <Badge tone="inverse" size="medium" icon>전시</Badge>
          <Badge tone="outline" size="medium">전시</Badge>
        </div>
        <div style={{ ...row, background: '#0a0a0a', padding: 16, borderRadius: 12 }}>
          <Badge tone="glass" size="medium" icon>전시</Badge>
          <Badge tone="glass">전시</Badge>
        </div>
      </section>

      <section style={section}>
        <h2 className="t-heading-card">Accordion</h2>
        <Accordion title="구독료가 있나요?">
          CULTR 뉴스레터는 무료로 구독할 수 있으며, 언제든지 구독을 해지할 수 있습니다.
        </Accordion>
        <Accordion title="구독료가 있나요?" defaultOpen>
          CULTR 뉴스레터는 무료로 구독할 수 있으며, 언제든지 구독을 해지할 수 있습니다.
        </Accordion>
      </section>

      <section style={section}>
        <h2 className="t-heading-card">Select</h2>
        <div style={row}>
          <Select label="카테고리" options={categoryOptions} size="medium" defaultValue="all" />
          <Select label="카테고리" options={categoryOptions} size="large" defaultValue="all" />
          <Select label="카테고리" options={categoryOptions} size="large" defaultValue="all" disabled />
        </div>
      </section>

      <section style={{ ...section, minHeight: 360 }}>
        <h2 className="t-heading-card">Dropdown</h2>
        <Dropdown options={categoryOptions} value={category} onChange={setCategory} aria-label="카테고리" />
      </section>
    </main>
  );
}
