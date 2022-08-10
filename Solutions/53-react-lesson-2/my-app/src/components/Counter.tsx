import React from "react";

type CounterState = {
  count: number;
};

class Counter extends React.Component<CounterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  state: CounterState = {
    count: 0,
  };

  increment() {
    this.setState((state: CounterState) => {
      return { count: state.count + 1 };
    });
  }
  decrement() {
    this.setState((state: CounterState) => ({
      count: state.count - 1,
    }));
  }
  reset() {
    this.setState({
      count: 0,
    });
  }
  render() {
    return (
      <>
        <div className="countButtons">
          <button className="inc" onClick={this.increment}>
            Increment
          </button>
          <button className="dec" onClick={this.decrement}>
            Decrement
          </button>
          <button className="reset" onClick={this.reset}>
            Reset
          </button>
        </div>
        <h1>Current Count: {this.state.count}</h1>
      </>
    );
  }
}
export default Counter;
