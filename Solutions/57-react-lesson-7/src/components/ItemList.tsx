import { useState } from "react";

interface Props {
  arr: any[];
}

function ItemList(props: Props) {
  const array = props.arr;
  const items = array.map((value: number | string, index) => (
    <li key={index}>{value}</li>
  ));
  return <ul>{items}</ul>;
}

export default ItemList;
