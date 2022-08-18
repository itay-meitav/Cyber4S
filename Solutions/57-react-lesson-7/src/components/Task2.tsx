import { useEffect, useState } from "react";
import ItemList from "./ItemList";

function addAfter(array: any[], index: number, newItem: string) {
  return [...array.slice(0, index), newItem, ...array.slice(index)];
}

function Task2() {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [arr, setArr] = useState<any[]>([]);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    setChanged(true);
  }, [arr]);

  return (
    <div className="Task2">
      <input
        onChange={(e) => {
          const val = e.currentTarget.value;
          setValue(val);
        }}
        type={"text"}
        placeholder="enter a value"
        required
      />
      <input
        type={"number"}
        onChange={(e) => {
          const val = Number(e.currentTarget.value);
          setIndex(val);
        }}
        placeholder="enter a key"
        required
      />
      <button
        onClick={() => {
          setArr(addAfter(arr, index, value));
        }}
      >
        Add item
      </button>
      {changed ? <ItemList arr={arr} /> : ""}
    </div>
  );
}

export default Task2;
