export function getTotalSecondsFromDate(time: Date): number {
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return minutes * 60 + seconds;
}
