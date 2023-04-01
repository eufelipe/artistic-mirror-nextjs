import { FC } from "react";

interface CardProps {
  image: string;
  name: string;
  message: string;
  comments?: string[];
}

const Card: FC<CardProps> = ({ image, name, message }) => {
  return (
    <>
      <div className="flex h-full space-x-4 w-full">
        <img
          className="h-16 w-16 rounded-full "
          src={image}
          alt={`Foto de ${name}`}
        />
        <div className="flex-1 h-72 min-h-full bg-red">
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
            {name}
          </p>
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 `}
          >
            {message}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
