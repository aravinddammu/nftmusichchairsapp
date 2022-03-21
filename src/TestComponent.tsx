import React from "react";

interface Props {
  name: String;
}

export default function TestComponent<T extends Props>(props: Props) {
  return (<div><h2>{props.name}</h2></div>);
}
