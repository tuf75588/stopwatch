import React, { useReducer, useEffect } from 'react';

interface StopwatchState {
  isRunning: boolean;
  currentTime: number;
  lastTime: number;
}

type StopwatchActions = {
  type: 'start' | 'stop' | 'reset' | 'tick';
};

function StopwatchReducer(
  state: StopwatchState,
  action: StopwatchActions
): StopwatchState {
  switch (action.type) {
    case 'reset': {
      return {
        isRunning: false,
        currentTime: 0,
        lastTime: 0,
      };
    }
    case 'start': {
      return {
        currentTime: 0,
        isRunning: true,
        lastTime: Date.now(),
      };
    }
    case 'stop': {
      return {
        ...state,
        isRunning: false,
      };
    }
    case 'tick': {
      return {
        ...state,
        currentTime: state.currentTime + (Date.now() - state.lastTime),
      };
    }
  }
}
function App() {
  const [state, dispatch] = useReducer(StopwatchReducer, {
    isRunning: false,
    currentTime: 0,
    lastTime: 0,
  });
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <span className="text-6xl font-bold tabular-nums">00:00:00.000</span>
      <div className="space-x-4">
        <button
          onClick={() => dispatch({ type: 'reset' })}
          className="bg-yellow-500 hover:bg-yellow-600 border-4 border-yellow-700 rounded-full w-16 h-16"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: 'reset' })}
          className="bg-green-500 hover:bg-green-600 border-4 border-green-700 rounded-full w-16 h-16"
        >
          Start
        </button>
        <button
          onClick={() => dispatch({ type: 'reset' })}
          className="bg-red-500 hover:bg-red-600 border-4 border-red-700 rounded-full w-16 h-16"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
