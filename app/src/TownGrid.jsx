import React from 'react';
import { useTownStore } from './townStore'; // Adjust path as needed

// Optional: Helper to get display style for different resources
const getCellStyle = (resource) => {
  switch (resource) {
    case "Wood": return "bg-yellow-700 text-white";
    case "Stone": return "bg-gray-500 text-white";
    case "Wheat": return "bg-yellow-400 text-black";
    case "Glass": return "bg-blue-300 text-black";
    case "Brick": return "bg-red-600 text-white";
    default: return "bg-gray-100 hover:bg-gray-200"; // Empty cell style
  }
};

export function TownGrid() {
  // Select only the state and actions needed
  const { grid, placeResource, selectedResource } = useTownStore((state) => ({
    grid: state.grid,
    placeResource: state.placeResource,
    selectedResource: state.selectedResource, // Needed for hover effect maybe
  }));

  const handleCellClick = (rowIndex, colIndex) => {
    // The core logic is in the store's action, just call it
    placeResource(rowIndex, colIndex);
  };

  return (
    <div className="flex flex-col items-center">
       <div className="grid grid-cols-4 gap-1 p-1 bg-green-800 border-4 border-green-900">
         {grid.flatMap((row, rowIndex) =>
           row.map((cell, colIndex) => (
             <button
               key={`${rowIndex}-${colIndex}`}
               onClick={() => handleCellClick(rowIndex, colIndex)}
               // Disable button if cell is not empty or no resource selected
               disabled={cell !== null || !selectedResource} 
               className={`w-16 h-16 border border-green-900 
                           flex items-center justify-center text-xs font-semibold
                           ${getCellStyle(cell)} 
                           ${cell === null && !!selectedResource ? 'cursor-pointer' : 'cursor-default'}
                           disabled:opacity-70 disabled:cursor-not-allowed`}
               title={cell === null && selectedResource ? `Place ${selectedResource}` : (cell || 'Empty')}
             >
               {cell} {/* Display resource name, or use icons later */}
             </button>
           ))
         )}
       </div>
    </div>
  );
}