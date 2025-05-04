import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Game } from '../src/main.jsx';
import { place_item } from '../src/main.js'

describe("App DOM", () => {

  beforeEach(() => {
    render(<Game />);
  });

  test("clicking a sqaure with a resource in hard places that resource", () => {
    const square = document.getElementById("00");
    resource = 'glass';
    place_item(square);
    expect(square.querySelector('div').className).toBe("glass center_piece");
  });

});
