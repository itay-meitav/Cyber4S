import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Task3 from "./components/Task3";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Task3 />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
