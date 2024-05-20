import { pick, debounce } from './common';

// 아래처럼 스냅샷 테스트는 컴포넌트 뿐 아니라 유틸 함수를 대상으로 진행할 수 도 있다.
describe('pick util 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a')).toEqual({ a: 'A' });
  });

  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다(snapshots)', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    // 객체 내에 복잡한 프로퍼티가 있다면 이러한 스냅샷 테스트가 유용하다
    expect(pick(obj, 'a')).toMatchInlineSnapshot(`
      {
        "a": "A",
      }
    `);
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a', 'b')).toEqual({ a: 'A', b: { c: 'C' } });
  });

  it('대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다', () => {
    expect(pick()).toEqual({});
  });

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj)).toEqual({});
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    const spy = vi.fn();

    const debouncedFn = debounce(spy, 300);

    debouncedFn();

    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalled();
  });

  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    const spy = vi.fn();

    const debouncedFn = debounce(spy, 300);

    debouncedFn();

    vi.advanceTimersByTime(200);
    debouncedFn();

    vi.advanceTimersByTime(100);
    debouncedFn();

    vi.advanceTimersByTime(200);
    debouncedFn();

    vi.advanceTimersByTime(300);
    debouncedFn();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
