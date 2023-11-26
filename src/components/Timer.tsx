import { useEffect, useRef, useState } from "preact/hooks";
import { formatDate } from "src/utils";
import { useConfetti } from "src/utils/hooks";
import { Button } from "./Button";
import { Progressbar } from "./Progressbar";

type Props = {
  minutes: number;
};

export function Timer({ minutes }: Props) {
  const { startConfetti, stopConfetti } = useConfetti();
  const intervalId = useRef<number | null>(null);
  const sound = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("./himno.mp3") : undefined
  );

  const [totalTime, setTotalTime] = useState<Date>(
    new Date(0, 0, 0, 0, minutes, 0)
  );
  const [timeRemaining, setTimeRemaining] = useState<Date>(totalTime);
  const [pause, setPause] = useState(false);
  const [disabledSub30Seconds, setDisabledSub30Seconds] = useState(false);

  const handleStartTimer = () => {
    if (intervalId.current !== null) {
      return;
    }

    intervalId.current = setInterval(() => {
      setTimeRemaining(
        (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 1000)
      );
    }, 1000);

    setPause(false);
  };

  const handleClickPause = () => {
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = null;
    setPause(true);
  };

  const resetTimer = () => {
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = null;

    setTimeRemaining(new Date(0, 0, 0, 0, minutes, 0));
    setTotalTime(new Date(0, 0, 0, 0, minutes, 0));
  };

  const handleClickReset = () => {
    resetTimer();

    if (sound.current) {
      sound.current.pause();
      sound.current.currentTime = 0;
    }

    stopConfetti();
    pause && setPause(false);
  };

  const handleAdd30Seconds = () => {
    setTotalTime((prevTotalTime) => new Date(prevTotalTime.getTime() + 30000));

    setTimeRemaining(
      (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() + 30000)
    );
  };

  const handleSub30Seconds = () => {
    const minutes = timeRemaining.getMinutes();
    const seconds = timeRemaining.getSeconds();

    if (minutes === 0 && seconds <= 30) {
      return;
    }

    setTotalTime((prevTotalTime) => new Date(prevTotalTime.getTime() - 30000));

    setTimeRemaining(
      (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 30000)
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

    if (minutes === 0 && seconds <= 30) {
      setDisabledSub30Seconds(true);
    } else {
      setDisabledSub30Seconds(false);
    }

    if (minutes === 0 && seconds === 0) {
      sound.current?.play();
      startConfetti();
      resetTimer();
    }
  }, [timeRemaining]);

  return (
    <>
      <h1 class={`text-3xl ${pause ? "animate-bounce" : ""}`}>
        {formatDate(timeRemaining)}
      </h1>
      <Progressbar totalTime={totalTime} timeRemaining={timeRemaining} />
      <div class="flex gap-4 my-4">
        <Button text="Start" onClick={handleStartTimer} />
        <Button text="Pause" onClick={handleClickPause} disabled={pause} />
        <Button text="Reset" onClick={handleClickReset} />
        <Button
          text="-30'"
          onClick={handleSub30Seconds}
          disabled={disabledSub30Seconds}
        />
        <Button text="+30'" onClick={handleAdd30Seconds} />
      </div>
    </>
  );
}
