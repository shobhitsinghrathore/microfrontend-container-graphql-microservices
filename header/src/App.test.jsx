import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App"; // Adjust the import path as needed

test("renders header in the UI", () => {
  render(<App />);
  const headerElement = screen.getByText("header");
  expect(headerElement).toBeInTheDocument();
});
