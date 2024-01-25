import type { JSXInternal } from "preact/src/jsx";
import { useEffect, type StateUpdater } from "preact/hooks";
import { Button } from "./Button";
import { formatterList } from "src/utils";

const optionsStorageKey = "turn-taking-options";

type Props = {
  textareaValue: string;
  setTextareaValue: StateUpdater<string>;
  onClick: JSXInternal.MouseEventHandler<HTMLButtonElement>;
};

export function Textbox({ textareaValue, setTextareaValue, onClick }: Props) {
  const handleOnInput = (e: JSXInternal.TargetedEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;

    setTextareaValue(value);
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
    <div class="flex flex-col gap-4 py-4">
      <label for="list" class="text-primary hidden">
        List
      </label>
      <textarea
        class="bg-bgShade text-primary rounded shadow-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75"
        cols={20}
        name="list"
        onInput={handleOnInput}
        placeholder="Enter your list here"
        rows={10}
        value={textareaValue}
        id="list"
      />
      <Button text="Go!" onClick={onClick} />
    </div>
  );
}
