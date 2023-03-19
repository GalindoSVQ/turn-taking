import { calculateLeftPercentage, getTotalSecondsFromDate } from "src/utils";

type Props = {
  timeRemaining: Date;
  totalTime: Date;
};

function Progressbar({ timeRemaining, totalTime }: Props) {
  const leftSeconds = getTotalSecondsFromDate(timeRemaining);
  const totalTimeAsSeconds = getTotalSecondsFromDate(totalTime);

  const progress = calculateLeftPercentage(leftSeconds, totalTimeAsSeconds);

  return (
    <div class="mt-2 h-2 w-60 bg-bgTint rounded-lg">
      <div
        class="h-2 bg-primary rounded-lg transition-width transition-slowest ease-in-out max-w-full"
        style={`width: ${progress}%`}
      ></div>
    </div>
  );
}

export { Progressbar };
