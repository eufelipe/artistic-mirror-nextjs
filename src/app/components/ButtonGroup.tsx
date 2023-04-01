import { FC } from "react";
import { FontSizeValue } from "../hooks/useFontSize";
import MessageManageModal from "./MessageManageModal";

import { AiOutlineSound } from "react-icons/ai";
import { BiHide, BiShow } from "react-icons/bi";
import { BsCardText } from "react-icons/bs";
import { MdDraw } from "react-icons/md";
import { RiFontSize } from "react-icons/ri";

interface ButtonGroupProps {
  cardView?: boolean;
  toggleCardView: () => void;
  fontSize: FontSizeValue;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  sceneHidden: boolean;
  toggleSceneHidden: () => void;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  cardView,
  toggleCardView,
  increaseFontSize,
  decreaseFontSize,
  sceneHidden,
  toggleSceneHidden,
}) => {
  return (
    <div className="mt-4 flex space-x-4">
      <div className="w-40">
        <img src="/eva.png" width={50} />
      </div>

      <MessageManageModal />

      <button
        className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300 flex items-center"
        onClick={decreaseFontSize}
      >
        <RiFontSize className="mr-3" size={24} />
        &nbsp; - &nbsp;
      </button>
      <button
        className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300 flex items-center"
        onClick={increaseFontSize}
      >
        <RiFontSize className="mr-2" size={24} />
        &nbsp; + &nbsp;
      </button>
      <button
        className={`bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300 flex items-center  ${
          !!cardView ? "bg-gray-300" : ""
        } `}
        onClick={toggleCardView}
      >
        <BsCardText className="mr-2" />
        Modo Card
      </button>
      <button
        className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300 flex items-center"
        onClick={toggleSceneHidden}
      >
        {sceneHidden ? (
          <BiShow className="mr-2" />
        ) : (
          <BiHide className="mr-2" />
        )}
        {sceneHidden ? "Mostrar fala" : "Esconder fala"}
      </button>
      <button className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300 flex items-center">
        <MdDraw className="mr-2" />
        Desenho livre
      </button>
      <button className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300 flex items-center">
        <AiOutlineSound className="mr-2" />
        Ouvir
      </button>
    </div>
  );
};

export default ButtonGroup;
