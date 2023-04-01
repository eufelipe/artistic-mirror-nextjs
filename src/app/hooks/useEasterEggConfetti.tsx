import { useEffect, useState } from "react";

type useEasterEggGloboReturnType = {
  showConfetti: boolean;
  onConfetti: () => void;
};

const useEasterEggConfetti = (): useEasterEggGloboReturnType => {
  const [debounceConfettiTimer, setDebounceConfettiTimer] =
    useState<NodeJS.Timeout | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const onConfetti = () => {
    if (debounceConfettiTimer) {
      clearTimeout(debounceConfettiTimer);
    }
    setShowConfetti(true);

    setDebounceConfettiTimer(
      setTimeout(() => {
        setShowConfetti(false);
        setDebounceConfettiTimer(null);
      }, 1000)
    );
  };

  useEffect(() => {
    return () => {
      if (debounceConfettiTimer) {
        clearTimeout(debounceConfettiTimer);
        setShowConfetti(false);
      }
    };
  }, [debounceConfettiTimer]);

  return { showConfetti, onConfetti };
};

export default useEasterEggConfetti;
