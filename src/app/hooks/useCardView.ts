import { useState } from "react";

interface CardViewControlProps {
  cardView: boolean;
  toggleCardView: () => void;
}

const useCardView = (): CardViewControlProps => {
  const [cardView, setCardView] = useState(false);

  const toggleCardView = () => {
    setCardView((prev) => !prev);
  };

  return { cardView, toggleCardView };
};

export default useCardView;
