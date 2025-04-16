import { create } from 'zustand'; // Use 'zustand' not 'zustand/vanilla' for React

// Define the possible resources that can exist on the grid
const RESOURCE_TYPES = ["Wood", "Stone", "Wheat", "Glass", "Brick", null]; // null represents empty

// Define the resources the user can actively select and place (your "widgets")
const SELECTABLE_RESOURCES = ["Wood", "Stone", "Wheat"]; // Example: only these 3 are placeable via selection

// Helper function to create an empty 4x4 grid
const createEmptyGrid = () =>
  Array(4)
    .fill(null)
    .map(() => Array(4).fill(null));

export const townStore = create((set) => ({
  // --- State ---
  grid: createEmptyGrid(), // A 4x4 2D array, initially all null
  availableResources: SELECTABLE_RESOURCES, // The resources the user can choose from
  selectedResource: SELECTABLE_RESOURCES[0], // Default to the first available resource, e.g., "Wood"
  buildings: [], // Placeholder for future building state

  // --- Actions ---
  
  // Action to select which resource to place next
  selectResource: (resource) =>
    set((state) => {
      // Basic validation: ensure it's one of the selectable resources
      if (state.availableResources.includes(resource)) {
        return { selectedResource: resource };
      }
      // If not selectable, maybe log an error or do nothing
      console.warn(`Resource ${resource} is not currently selectable.`);
      return state; // Return current state if selection is invalid
    }),

  // Action to place the currently selected resource onto the grid
  placeResource: (rowIndex, colIndex) =>
    set((state) => {
      // Guard clauses:
      // 1. Check if a resource is actually selected
      if (!state.selectedResource) {
          console.warn("No resource selected to place.");
          return state; // No change
      }
      // 2. Check if the target cell is within bounds (optional, but good practice)
      if (rowIndex < 0 || rowIndex >= state.grid.length || colIndex < 0 || colIndex >= state.grid[0].length) {
          console.error("Attempted to place resource out of bounds.");
          return state;
      }
      // 3. Check if the target cell is empty
      if (state.grid[rowIndex][colIndex] !== null) {
        console.warn("Cell is already occupied.");
        return state; // No change if cell is not empty
      }

      // Create a new grid for immutability
      // Need to deep copy a 2D array
      const newGrid = state.grid.map(row => [...row]); 
      
      // Place the selected resource
      newGrid[rowIndex][colIndex] = state.selectedResource;

      // --- Future Logic Placeholder ---
      // Here you would typically:
      // 1. Check if this placement completes a building pattern around newGrid[rowIndex][colIndex]
      // 2. If yes, update the grid further (place building), manage score, etc.
      // const { updatedGrid, newBuildings } = checkForBuildingPatterns(newGrid, rowIndex, colIndex);
      // return { grid: updatedGrid, buildings: [...state.buildings, ...newBuildings] };

      // For now, just return the updated grid with the placed resource
      return { grid: newGrid };
    }),

  // Action to reset the game or grid
  resetGrid: () => set({ grid: createEmptyGrid(), selectedResource: SELECTABLE_RESOURCES[0], buildings: [] }),
}));

// Custom hook for easy component access
export const useTownStore = (selector) => townStore(selector);