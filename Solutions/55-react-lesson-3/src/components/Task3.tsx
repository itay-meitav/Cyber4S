import React from "react";

interface IState {
  start: boolean;
  h: number;
  m: number;
  s: number;
}

function parse(str: string | number, limitDigits: number, limitNumber: number) {
  let res = (str + "").replace(/^0*/, "").substring(0, limitDigits);
  if (Number(res) > limitNumber) {
    res = limitNumber + "";
  }

  if (Number(res) < 0) {
    res = "0".repeat(limitDigits);
  }

  let missing = limitDigits - res.length;
  res = "0".repeat(missing) + res;
  return res;
}

class Task3 extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      start: false,
      h: 0,
      m: 0,
      s: 0,
    };
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.parse = this.parse.bind(this);
  }

  componentDidUpdate() {
    if (this.state.start) {
      if (this.state.h || this.state.m || this.state.s)
        window.setTimeout(() => {
          if (this.state.start) {
            if (this.state.s > 0) {
              this.setState((state) => ({ ...state, s: state.s - 1 }));
            } else {
              if (this.state.m > 0) {
                this.setState((state) => ({
                  ...state,
                  s: 59,
                  m: state.m - 1,
                }));
              } else {
                if (this.state.h > 0) {
                  //   this.state.setHours((pre: number) => pre - 1);
                  //   this.state.setMinutes(59);
                  //   this.state.setSeconds(59);
                  this.setState((state) => ({
                    ...state,
                    s: 59,
                    m: 59,
                    h: state.h - 1,
                  }));
                } else {
                }
              }
            }
          }
        }, 1000);
      else {
        //   return <div>The time is Finished</div>;
        alert("done!");
      }
    }
  }

  componentWillUnmount() {
    // clearInterval();
  }

  start() {
    this.setState((state) => ({ ...state, start: true }));
  }

  reset() {
    this.setState((state) => ({ ...state, start: false, h: 0, m: 0, s: 0 }));
  }
  parse(str: string | number, limitDigits: number, limitNumber: number) {
    let res = (str + "").replace(/^0*/, "").substring(0, limitDigits);
    if (Number(res) > limitNumber) {
      res = limitNumber + "";
    }

    if (Number(res) < 0) {
      res = "0".repeat(limitDigits);
    }

    let missing = limitDigits - res.length;
    res = "0".repeat(missing) + res;
    return res;
  }

  render() {
    return (
      <div className="Task3">
        <h1>Timer</h1>
        {this.state.start && (this.state.h || this.state.m || this.state.s) ? (
          <div className="timer">
            <h1>{this.parse(this.state.h, 2, 23)}</h1>:
            <h1>{this.parse(this.state.m, 2, 59)}</h1>:
            <h1>{this.parse(this.state.s, 2, 59)}</h1>
          </div>
        ) : this.state.start ? (
          <div>timer finished</div>
        ) : (
          <></>
        )}
        {!this.state.start ? (
          <div className="inputs">
            <input
              type="number"
              value={this.parse(this.state.h, 2, 23)}
              onInput={(e) => {
                let val = e.currentTarget.value;
                val = this.parse(val, 2, 23);
                this.setState((state) => ({
                  ...state,
                  h: Number(val),
                }));
              }}
              maxLength={2}
              placeholder="hours"
            />
            <input
              type="number"
              maxLength={2}
              value={this.parse(this.state.m, 2, 59)}
              placeholder="minutes"
              onInput={(e) => {
                let val = e.currentTarget.value;
                val = this.parse(val, 2, 59);
                this.setState((state) => ({
                  ...state,
                  m: Number(val),
                }));
              }}
            />
            <input
              type="number"
              maxLength={2}
              placeholder="seconds"
              value={this.parse(this.state.s, 2, 59)}
              onInput={(e) => {
                let val = e.currentTarget.value;
                val = this.parse(val, 2, 59);
                this.setState((state) => ({
                  ...state,
                  s: Number(val),
                }));
              }}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="buttons">
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.start}>Start</button>
        </div>
      </div>
    );
  }
}

export default Task3;
