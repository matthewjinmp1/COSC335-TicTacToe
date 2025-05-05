import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Game } from '../src/main.jsx';
import { place_resource, place_building } from '../src/main.js'

describe("App DOM", () => {
  beforeEach(() => {
    render(<Game />);
  });

  test("clicking a square with a resource in hand places that resource", () => {
    const square = document.getElementById("00");
    let resource = 'glass';
    place_resource(resource, square);
    expect(square.querySelector('div').className).toBe("glass center_piece");
  });

  test("clicking a square with a building in hand places that building", () => {
    const square = document.getElementById("00");
    let building_selected = 'cottage';
    place_building(building_selected, square);
    expect(square.querySelector('div').className).toBe("cottage_piece center_piece scale");
  });
});
