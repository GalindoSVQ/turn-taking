export function calculateLeftPercentage(
  leftSeconds: number | null,
  totalSeconds: number
): number {
  if (leftSeconds === null) {
    return 0;
  }

  return (leftSeconds / totalSeconds) * 100;
}
