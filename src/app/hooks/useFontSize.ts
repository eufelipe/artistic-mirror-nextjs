import { useEffect, useState } from "react";

export type FontSizeValue = "base" | "2xl" | "3xl";

export type UseFontSizeProps = [
  fontSize: FontSizeValue,
  increaseFontSize: () => void,
  decreaseFontSize: () => void
];

const fontSizes: FontSizeValue[] = ["base", "2xl", "3xl"];

const useFontSize = (): UseFontSizeProps => {
  const [currentFontSizeIndex, setCurrentFontSizeIndex] = useState(2);

  useEffect(() => {
    console.log("currentFontSizeIndex", currentFontSizeIndex);
  }, [currentFontSizeIndex]);

  const increaseFontSize = () => {
    setCurrentFontSizeIndex((prevState) => {
      if (prevState < fontSizes.length - 1) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
  };

  const decreaseFontSize = () => {
    setCurrentFontSizeIndex((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  };

  return [fontSizes[currentFontSizeIndex], increaseFontSize, decreaseFontSize];
};

export default useFontSize;
