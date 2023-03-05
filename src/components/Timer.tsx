import { useEffect, useRef, useState } from "preact/hooks";
import {
  calculateLeftPercentage,
  formatDate,
  getTotalSecondsFromDate,
} from "src/utils";
import { Button } from "./Button";
import { Progressbar } from "./Progressbar";

type Props = {
  time: number;
};

export function Timer({ time }: Props) {
  const totalTime = new Date(0, 0, 0, 0, time, 0);
  const [timeRemaining, setTimeRemaining] = useState<Date>(totalTime);
  const intervalId = useRef<number | null>(null);
  const [audio] = useState(new Audio("./alarm.wav"));
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

  const handleClickReset = () => {
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = null;
    setTimeRemaining(totalTime);
  };

  const handleAddAMinute = () => {
    setTimeRemaining(
      (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() + 60000)
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
      audio.play();
      handleClickReset();
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
        <Button text="+1" onClick={handleAddAMinute} />
      </div>
    </>
  );
}
