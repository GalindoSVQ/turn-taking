import { useEffect, useRef, useState } from "preact/hooks";
import {
  calculateLeftPercentage,
  formatDate,
  getTotalSecondsFromDate,
} from "src/utils";
import { useConfetti } from "src/utils/hooks";
import { Button } from "./Button";
import { Progressbar } from "./Progressbar";

type Props = {
  time: number;
};

export function Timer({ time }: Props) {
  const { startConfetti, stopConfetti } = useConfetti();
  const totalTime = new Date(0, 0, 0, 0, time, 0);

  const intervalId = useRef<number | null>(null);
  const sound = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("./himno.mp3") : undefined
  );

  const [timeRemaining, setTimeRemaining] = useState<Date>(totalTime);
  const [leftSeconds, setleftSeconds] = useState<number | null>(null);

  const handleStartTimer = () => {
    if (intervalId.current !== null) {
      return;
    }

    intervalId.current = setInterval(() => {
      setTimeRemaining(
        (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 1000)
      );
    }, 1000);
  };

  const handleClickPause = () => {
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const resetTimer = () => {
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = null;

    setTimeRemaining(totalTime);
  };

  const handleClickReset = () => {
    resetTimer();

    if (sound.current) {
      sound.current.pause();
      sound.current.currentTime = 0;
    }

    stopConfetti();
  };

  const handleAdd30Seconds = () => {
    setTimeRemaining(
      (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() + 30000)
    );
  };

  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  useEffect(() => {
    const minutes = timeRemaining.getMinutes();
    const seconds = timeRemaining.getSeconds();
    const leftSeconds = getTotalSecondsFromDate(timeRemaining);

    setleftSeconds(leftSeconds);

    if (minutes === 0 && seconds === 0) {
      sound.current?.play();
      startConfetti();
      resetTimer();
    }
  }, [timeRemaining]);

  return (
    <>
      <h1 class="text-3xl">{formatDate(timeRemaining)}</h1>
      <Progressbar
        progress={calculateLeftPercentage(
          leftSeconds,
          getTotalSecondsFromDate(totalTime)
        )}
      />
      <div class="flex gap-4 my-4">
        <Button text="Start" onClick={handleStartTimer} />
        <Button text="Pause" onClick={handleClickPause} />
        <Button text="Reset" onClick={handleClickReset} />
        <Button text="+30'" onClick={handleAdd30Seconds} disabled={true} />
      </div>
    </>
  );
}
