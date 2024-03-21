export function formatTime(date = new Date()): string {
  const add0IfNeeded = (num: number) => `00${num}`.slice(-2);
  return `${add0IfNeeded(date.getHours())}:${add0IfNeeded(date.getMinutes())}:${add0IfNeeded(
    date.getSeconds(),
  )}`;
}
