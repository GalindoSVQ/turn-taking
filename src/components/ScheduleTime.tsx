type Props = {
  turnTime: number;
  listLength: number;
};

export default function ScheduleTime({ turnTime, listLength }: Props) {
  return (
    <div class="flex gap-2 w-full justify-center text-[#FFF5BE] opacity-70">
      <p class="text-lg mr-2 ">
        ETC:
        <span class="text-2xl ml-2 ">{turnTime * listLength}min</span>
      </p>
      <p class="text-lg">
        ETA:
        <span class="text-2xl ml-2">
          {new Date(
            new Date().getTime() + turnTime * listLength * 60000
          ).toLocaleTimeString(undefined, {
            timeStyle: "short",
          })}
          h
        </span>
      </p>
    </div>
  );
}
