import type { IPomodoroRoundResponse } from "@/types/pomodoro.types";

import type { ITimerState } from "../timer.types";

import { useLoadSettings } from "./useLoadingSession";
import { useUpdateRound } from "./useUpdateRound";

type TypeUseTimerActions = ITimerState & {
  rounds: IPomodoroRoundResponse[] | undefined;
};

export function useTimerActions({
  activeRound,
  setIsRunning,
  secondsLeft,
  rounds,
  setActiveRound,
}: TypeUseTimerActions) {
  const { workInterval } = useLoadSettings();
  const { isUpdateRoundPending, updateRound } = useUpdateRound();

  const pauseHandler = () => {
    setIsRunning(false);
    if (!activeRound?.id) return;

    updateRound({
      id: activeRound?.id,
      data: {
        totalSeconds: secondsLeft,
        isComplited: Math.floor(secondsLeft / 60) >= workInterval,
      },
    });
  };

  const playHandler = () => {
    setIsRunning(true);
  };

  const nextRoundHandler = () => {
    if (!activeRound?.id) return;

    updateRound({
      id: activeRound?.id,
      data: {
        isComplited: true,
        totalSeconds: workInterval * 60,
      },
    });
  };

  const prevRoundHandler = () => {
    // ES2023
    const lastCompletedRound = rounds?.findLast((round) => round.isComplited);
    if (!lastCompletedRound?.id) return;

    updateRound({
      id: lastCompletedRound?.id,
      data: {
        isComplited: false,
        totalSeconds: 0,
      },
    });

    setActiveRound(lastCompletedRound);
  };

  return {
    isUpdateRoundPending,
    pauseHandler,
    playHandler,
    nextRoundHandler,
    prevRoundHandler,
  };
}
