import { HalftoneCanvas } from './HalftoneCanvas';
import { cx } from '@/lib/cx';

type TicketRow = {
  label: string;
  value: string;
  /** true 면 웹에서만 보여요 (모바일 디자인에는 없는 줄) */
  webOnly?: boolean;
  /** 웹에서 아래 간격을 조금 더 줘요 */
  spaceAfter?: boolean;
};

const INFO_ROWS: TicketRow[] = [
  { label: 'TYPE', value: 'WEEKLY PICK' },
  { label: 'ACCESS', value: "EDITOR'S CHOICE", webOnly: true, spaceAfter: true },
  { label: 'DATE', value: '2026.09.30' },
  { label: 'VENUE', value: 'KRAFTWERK SECTOR B' },
  { label: 'CITY', value: '.SEOUL', webOnly: true },
];

const ACT_ROWS: TicketRow[] = [
  { label: 'ACT 01', value: 'ALVA NOTO', webOnly: true },
  { label: 'ACT 02', value: 'RYOICHI KUROKAWA', webOnly: true },
];

function Row({ label, value, webOnly, spaceAfter }: TicketRow) {
  return (
    <div
      className={cx(
        'items-center gap-2 md:py-1.5',
        webOnly ? 'hidden md:flex' : 'flex',
        spaceAfter && 'md:pb-3.5',
      )}
    >
      <p className="w-[50px] shrink-0 opacity-60 md:w-[60px]">{label}</p>
      <p aria-hidden="true" className="hidden opacity-40 md:block">
        {'>'}
      </p>
      <p className="truncate opacity-90">{value}</p>
    </div>
  );
}

/** Hero 의 "Symmetry Breaking" 티켓 (웹: 가로형 800×380 / 모바일: 세로형) */
export function TicketCard() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-surface-inverse md:h-[380px] md:w-[800px] md:flex-row">
            <div className="relative h-[180px] w-full shrink-0 overflow-hidden md:size-[380px] md:border-r md:border-text-inverse/10">
        <HalftoneCanvas />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-6 z-10 font-mono text-[0.7rem] leading-[1.4] tracking-[2px] text-text-inverse opacity-80"
        >
          <span className="block">C U L T R</span>
          <span className="block pl-6">W E E K L Y</span>
          {/* <span className="mt-2 block pl-2 text-[0.6rem] opacity-50">A U D I O V I S U A L</span> */}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5 font-mono text-[9px] leading-[normal] text-text-inverse md:h-[380px] md:w-[420px] md:shrink-0 md:justify-between md:gap-0 md:px-6 md:pb-0 md:pt-8">
        <div className="flex flex-col gap-1 md:gap-0">
          {INFO_ROWS.map((row) => (
            <Row key={row.label} {...row} />
          ))}
          <div className="hidden py-4 md:flex" aria-hidden="true">
            <p className="min-w-0 flex-1 overflow-hidden whitespace-nowrap opacity-20">
              {'L '.repeat(34).trim()}
            </p>
          </div>
          {ACT_ROWS.map((row) => (
            <Row key={row.label} {...row} />
          ))}
        </div>

        {/* 모바일에서만 보이는 점선 구분선 */}
        <div
          aria-hidden="true"
          className="border-t border-dashed border-text-inverse opacity-20 md:hidden"
        />

        <div className="flex flex-col gap-1.5 md:gap-2 md:border-t md:border-text-inverse md:pb-6 md:pt-4">
          <p className="opacity-90">CULTR WEEKLY ■ VOL. 04</p>
          <div className="flex items-start justify-between text-[8px] opacity-40 md:text-[9px]">
            <p>ID: 0029384-A</p>
            <p>
              SENT<span className="hidden md:inline"> EVERY TUESDAY</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}