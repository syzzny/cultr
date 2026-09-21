type ClassValue = string | false | null | undefined;

/** 클래스 이름 결합 유틸 (falsy 값은 무시) */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
