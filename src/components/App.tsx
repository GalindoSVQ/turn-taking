import { useState } from "preact/hooks";
import { formatterList, shuffleList } from "src/utils";
import { List } from "./List";
import { Textbox } from "./Textbox";

const DEFAULT_TIME = 3;

export function App() {
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [suffledList, setSuffledList] = useState<string[]>([]);
  const [randomized, setRandomized] = useState<boolean>(false);
  const [time, setTime] = useState(DEFAULT_TIME);

  const handleGoButton = () => {
    const formattedValue = formatterList(textareaValue);

    const shuffled = shuffleList(formattedValue);

    setSuffledList(shuffled);
    setRandomized(true);
  };

  return (
    <>
      {randomized ? (
        <List list={suffledList} time={time} />
      ) : (
        <Textbox
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          handleGoButton={handleGoButton}
          time={time}
          setTime={setTime}
        />
      )}
    </>
  );
}
