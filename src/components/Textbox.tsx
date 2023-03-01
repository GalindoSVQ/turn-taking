import type { JSXInternal } from "preact/src/jsx";
import { useState, useEffect } from "preact/hooks";
import { Button } from "./Button";

const optionsStorageKey = "turn-taking-options";

export function Textbox() {
  const [textareaValue, setTextareaValue] = useState("");

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
    const formattedValue = textareaValue.split("\n").map((item) => item.trim());
    localStorage.setItem(optionsStorageKey, JSON.stringify(formattedValue));
  }, [textareaValue]);

  return (
    <div class="flex flex-col gap-4 py-4 ">
      <textarea
        cols={20}
        rows={10}
        name="list"
        onInput={handleOnInput}
        value={textareaValue}
        class="bg-bgShade text-primary rounded shadow-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75"
      ></textarea>
      {/* <Button text="Go!" /> */}
    </div>
  );
}
