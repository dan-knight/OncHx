export function range(start: number, end?: number): number[] {
  let incrementBy: number;

  if (end === undefined) {
    incrementBy = 1;
    end = start - 1;
    start = 0;
  } else {
    incrementBy = (end - start) / Math.abs(end - start);
  }

  return Array.from(
    Array(Math.abs(end - start) + 1), 
    (x, i) => start + i * incrementBy
  );
};