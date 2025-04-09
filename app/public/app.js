const { useState, useEffect } = React;
const create = window.zustand.create;

const gameStore = create((set) => ({
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  resetGame: () => set({ board: Array(9).fill(null), currentPlayer: "X", winner: null }),
  makeMove: (index) =>
    set((state) => {
      if (state.board[index] || state.winner) return state;
      const board = [...state.board];
      board[index] = state.currentPlayer;

      const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
      ];
      let winner = null;
      for (const [a,b,c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          winner = board[a];
          break;
        }
      }

      if (winner) saveGame(board, winner);

      return {
        board,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner,
      };
    }),
}));

const useGameStore = (selector) => React.useSyncExternalStore(
  gameStore.subscribe,
  () => selector(gameStore.getState()),
  () => selector(gameStore.getState())
);


async function saveGame(board, winner) {
  const user = auth.currentUser;
  if (!user) return;

  const idToken = await user.getIdToken();

  await fetch("http://localhost:5000/save-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      board,
      winner,
      timestamp: new Date().toISOString(),
    }),
  });
}


function App() {
  const board = useGameStore((state) => state.board);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winner = useGameStore((state) => state.winner);
  const makeMove = gameStore.getState().makeMove;
  const resetGame = gameStore.getState().resetGame;

  return (
    React.createElement("div", { className: "text-center" },
      React.createElement("h1", { className: "text-3xl font-bold mb-4" }, "Tic Tac Toe"),
      React.createElement("div", { className: "grid grid-cols-3 gap-2" },
        board.map((cell, i) =>
          React.createElement("button", {
            key: i,
            onClick: () => makeMove(i),
            className: "w-20 h-20 bg-gray-700 text-2xl font-bold",
          }, cell)
        )
      ),
      winner && React.createElement("p", { className: "mt-4 text-xl" }, `${winner} wins!`),
      React.createElement("button", {
        onClick: resetGame,
        className: "mt-4 bg-green-500 px-4 py-2 rounded"
      }, "Restart Game")
    )
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(React.createElement(App));
