import type { JSXInternal } from "preact/src/jsx";
import {
  useEffect,
  useState,
  type Dispatch,
  type StateUpdater,
} from "preact/hooks";
import { Button } from "./Button";
import { formatterList } from "src/utils";
import { CounterSettings } from "./CounterSettings";

const optionsStorageKey = "turn-taking-options";

type Props = {
  textareaValue: string;
  setTextareaValue: Dispatch<StateUpdater<string>>;
  handleGoButton: JSXInternal.MouseEventHandler<HTMLButtonElement>;
  time: number;
  setTime: Dispatch<StateUpdater<number>>;
};

export function Textbox({
  textareaValue,
  setTextareaValue,
  handleGoButton,
  time,
  setTime,
}: Props) {
  const [openCounterSettings, setOpenCounterSettings] = useState(false);
  const handleOnInput = (e: JSXInternal.TargetedEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;

    setTextareaValue(value);
  };

  const handeCounterSettingsClick = () => {
    setOpenCounterSettings((prev) => !prev);
  };

  useEffect(() => {
    const items = localStorage.getItem(optionsStorageKey);

    if (items) {
      setTextareaValue(JSON.parse(items).join("\n"));
    }
  }, []);

  useEffect(() => {
    const formattedValue = formatterList(textareaValue);

    localStorage.setItem(optionsStorageKey, JSON.stringify(formattedValue));
  }, [textareaValue]);

  return (
    <div class="flex flex-col gap-4 py-4 w-3/4 md:w-1/5 justify-center items-center">
      <label for="list" class="text-primary hidden">
        List
      </label>
      <textarea
        class="bg-bgShade text-primary rounded shadow-md p-2 w-full max-h-40 h-40 resize-none"
        id="list"
        name="list"
        onInput={handleOnInput}
        placeholder="Enter your name list here"
        style={{ fieldSizing: "content" }}
        value={textareaValue}
      />
      <Button text="Counter Settings" onClick={handeCounterSettingsClick} />
      <CounterSettings
        open={openCounterSettings}
        time={time}
        setTime={setTime}
      />
      <Button
        disabled={!textareaValue.length}
        onClick={handleGoButton}
        text="Go"
      />
    </div>
  );
}
