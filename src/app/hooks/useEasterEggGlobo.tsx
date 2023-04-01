import { useEffect, useState } from "react";

type useEasterEggGloboReturnType = {
  showGlobo: boolean;
  onGlobo: () => void;
};

const useEasterEggGlobo = (): useEasterEggGloboReturnType => {
  const [debounceGloboTimer, setDebounceGloboTimer] =
    useState<NodeJS.Timeout | null>(null);

  const [showGlobo, setShowGlobo] = useState(false);

  const onGlobo = () => {
    if (debounceGloboTimer) {
      clearTimeout(debounceGloboTimer);
    }
    setShowGlobo(true);

    setDebounceGloboTimer(
      setTimeout(() => {
        setShowGlobo(false);
        setDebounceGloboTimer(null);
      }, 1000)
    );
  };

  useEffect(() => {
    return () => {
      if (debounceGloboTimer) {
        clearTimeout(debounceGloboTimer);
        setShowGlobo(false);
      }
    };
  }, [debounceGloboTimer]);

  return { showGlobo, onGlobo };
};

export default useEasterEggGlobo;
