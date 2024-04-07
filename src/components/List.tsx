import ScheduleTime from "./ScheduleTime";
import { Timer } from "./Timer";

type Props = {
  list: string[];
  time: number;
};

export function List({ list, time }: Props) {
  return (
    <div class="flex flex-col justify-center items-center">
      <ol
        type="1"
        class="list-decimal list-inside flex flex-col gap-2 my-12 text-[#FFF5BE]"
      >
        {list.map((item, index) => (
          <li key={index} class="text-2xl">
            {item}
          </li>
        ))}
      </ol>
      <Timer minutes={time} />
      <ScheduleTime turnTime={time} listLength={list.length} />
    </div>
  );
}
