import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Game } from '../src/main.jsx';

describe("App DOM", () => {

  beforeEach(() => {
    render(<Game />);
  });

  test("clicking a sqaure with a resource in hard places that resource", () => {
    const square = document.getElementById("00");
    expect(buttons[0].textContent).toBe("X");
  });

  test("reset button clears the board", () => {
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[9]); // Reset
    expect(buttons[0].textContent).toBe("");
  });

});
