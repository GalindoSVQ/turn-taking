import confetti from "canvas-confetti";
import { useCallback, useRef } from "preact/hooks";

const duration = 5 * 1000;
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function useConfetti() {
  const confettiIntervalId = useRef<number | null>(null);

  const startConfetti = () => {
    const animationEnd = Date.now() + duration;

    confettiIntervalId.current = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0 && !!confettiIntervalId.current) {
        return clearInterval(confettiIntervalId.current);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  const stopConfetti = useCallback(() => {
    !!confettiIntervalId.current && clearInterval(confettiIntervalId.current);
  }, []);

  return { confettiIntervalId, startConfetti, stopConfetti };
}
