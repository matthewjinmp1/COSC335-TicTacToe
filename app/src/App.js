import React from 'react';
import { ResourceSelector } from './ResourceSelector'; // Adjust path
import { TownGrid } from './TownGrid'; // Adjust path
import { useTownStore } from './townStore'; // Adjust path

export function App() {
  const resetGrid = useTownStore((state) => state.resetGrid); // Get reset action

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Tiny Town Builder</h1>
      
      {/* Component to select the resource */}
      <ResourceSelector />

      {/* Component to display and interact with the grid */}
      <div className="mt-6 mb-4 inline-block"> {/* Wrapper for centering/styling */}
         <TownGrid />
      </div>


      {/* Reset button */}
      <div className="mt-4">
        <button
          onClick={resetGrid}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Grid
        </button>
      </div>

      {/* You could add score display, building list etc. here later */}
      {/* <ScoreDisplay /> */}
      {/* <BuildingList /> */}
    </div>
  );
}

// Make sure to render <App /> in your main index.js or equivalent