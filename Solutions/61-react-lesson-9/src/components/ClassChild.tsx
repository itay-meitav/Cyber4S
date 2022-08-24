import React, { Component } from "react";
import { ThemeContext } from "./Task2";

export class ClassChild extends Component {
  themeStyles(dark: boolean) {
    return {
      backgroundColor: dark ? "#333" : "#CCC",
      color: dark ? "#CCC" : "#333",
      padding: "2rem",
      margin: "2rem",
    };
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {(dark) => {
          return <div style={this.themeStyles(dark)}>Class Theme</div>;
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default ClassChild;
