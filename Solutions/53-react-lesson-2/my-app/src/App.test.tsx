import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("renders learn react link", async () => {
  render(<App />);
  const user = userEvent.setup();
  const task3 = screen.getAllByText(/Task/i);
  // expect(task3).toBeInTheDocument();
  await user.click(task3[1]);
  const linkElement = screen.getAllByText(/SUBSCRIBE/i)[1];
  console.log(linkElement);

  expect(linkElement).toBeInTheDocument();
  // expect(linkElement.length ? true : false).toBe(true);
});
