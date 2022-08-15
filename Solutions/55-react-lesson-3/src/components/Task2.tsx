import React from "react";

class Task2 extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("render");
    return <></>;
  }
}

export default Task2;
