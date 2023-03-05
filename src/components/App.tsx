import { useState } from "preact/hooks";
import { formatterList, shuffleList } from "src/utils";
import { List } from "./List";
import { Textbox } from "./Textbox";

export function App() {
  const [textareaValue, setTextareaValue] = useState("");
  const [suffledList, setSuffledList] = useState<string[]>([]);
  const [randomized, setRandomized] = useState(false);

  const handleOnCLick = () => {
    const formattedValue = formatterList(textareaValue);
    const shuffled = shuffleList(formattedValue);

    setSuffledList(shuffled);
    setRandomized(true);
  };

  return (
    <>
      {randomized ? (
        <List list={suffledList} />
      ) : (
        <Textbox
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          onClick={handleOnCLick}
        />
      )}
    </>
  );
}
