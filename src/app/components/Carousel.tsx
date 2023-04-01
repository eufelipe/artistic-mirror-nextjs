import { useState } from "react";
import Card from "./Card";

const Carousel = ({ cards }: any) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((currentCardIndex + 1) % cards.length);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex(
      currentCardIndex === 0 ? cards.length - 1 : currentCardIndex - 1
    );
  };

  if (cards.length === 0) return <div>Carregando...</div>;

  const progress = (currentCardIndex / cards.length) * 100;

  return (
    <div className="w-full">
      <Card {...cards[currentCardIndex]} />

      <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
        <div className="h-1 bg-primary" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex justify-between items-center py-20">
        <button
          className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300"
          onClick={handlePreviousCard}
        >
          Anterior
        </button>
        <button
          className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300"
          onClick={handleNextCard}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};
export default Carousel;
