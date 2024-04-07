import clsx from "clsx";
import type { Dispatch, StateUpdater } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

type Props = {
  open: boolean;
  time: number;
  setTime: Dispatch<StateUpdater<number>>;
};

export function CounterSettings({ open, time, setTime }: Props) {
  const handleDecrease = () => {
    setTime((prev) => {
      if (prev === 1) {
        return 1;
      }

      return prev - 1;
    });
  };

  const handleIncrease = () => {
    setTime((prev) => prev + 1);
  };

  const handleOnChangeTime = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setTime(parseInt(value));
  };

  return (
    <div
      className={clsx(
        open ? "flex" : "hidden",
        "w-full flex-col p-2 items-center"
      )}
    >
      <label
        for="time-input"
        class="block mb-2 text-sm font-medium text-primary dark:text-white self-start"
      >
        Time:
      </label>
      <div class="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="time-input"
          class="bg-background  hover:bg-bgTint border border-primary rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDecrease}
          disabled={time === 1}
        >
          <svg
            class="w-3 h-3 text-primary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          aria-describedby="helper-text-explanation"
          class="bg-background border-x-0 border-primary h-11 border text-center text-primary text-sm focus:ring-blue-500 focus:border-primary block w-full py-2.5"
          data-input-counter
          id="time-input"
          min={1}
          onInput={handleOnChangeTime}
          placeholder="3"
          required
          type="text"
          value={time}
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="time-input"
          class="bg-background hover:bg-bgTint border border-primary rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          onClick={handleIncrease}
        >
          <svg
            class="w-3 h-3 text-primary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
