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
        ...state,
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
      if (!state.isRunning) return state;
      return {
        ...state,
        currentTime: state.currentTime + (Date.now() - state.lastTime),
        lastTime: Date.now()
      };
    }
  }
}

function parseTime(
  time: number
): { hours: number; minutes: number; seconds: number; milliseconds: number } {
  const date = new Date(time)
  const hours = date.getHours() + date.getTimezoneOffset() / 60 - 24;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds()
  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

function App() {
  const [state, dispatch] = useReducer(StopwatchReducer, {
    isRunning: false,
    currentTime: 0,
    lastTime: 0,
  });
  const time = parseTime(state.currentTime);
  const { hours, minutes, seconds, milliseconds } = time;
  useEffect(() => {
    let frame: number;
    function tick(): void {
      dispatch({ type: 'tick' });
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <span className="text-6xl font-bold tabular-nums">
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}.
        {milliseconds.toString().padStart(3, '0')}
      </span>
      <div className="space-x-4">
        <button
          onClick={() => dispatch({ type: 'reset' })}
          className="bg-yellow-500 hover:bg-yellow-600 border-4 border-yellow-700 rounded-full w-16 h-16"
        >
          Reset
        </button>
        {!state.isRunning ? (
          <button
            onClick={() => dispatch({ type: 'start' })}
            className="bg-green-500 hover:bg-green-600 border-4 border-green-700 rounded-full w-16 h-16"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: 'stop' })}
            className="bg-red-500 hover:bg-red-600 border-4 border-red-700 rounded-full w-16 h-16"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
