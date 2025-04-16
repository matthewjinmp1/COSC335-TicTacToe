import React from 'react';
import { useTownStore } from './townStore'; // Adjust path as needed

export function ResourceSelector() {
  // Select only the state and actions needed by this component
  const { availableResources, selectedResource, selectResource } = useTownStore(
    (state) => ({
      availableResources: state.availableResources,
      selectedResource: state.selectedResource,
      selectResource: state.selectResource,
    })
  );

  return (
    <div className="my-4 flex justify-center gap-3">
      <h3 className="mr-2 self-center font-semibold">Select Resource:</h3>
      {availableResources.map((resource) => (
        <button
          key={resource}
          onClick={() => selectResource(resource)}
          // Basic styling using Tailwind: highlight the selected button
          className={`px-4 py-2 rounded border-2 font-medium
            ${selectedResource === resource
              ? 'bg-blue-500 text-white border-blue-700 ring-2 ring-offset-1 ring-blue-500' // Selected style
              : 'bg-gray-200 text-gray-700 border-gray-400 hover:bg-gray-300' // Default style
            }`}
        >
          {resource}
        </button>
      ))}
    </div>
  );
}