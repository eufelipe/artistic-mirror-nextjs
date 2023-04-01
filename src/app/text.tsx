import { Fragment, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import ButtonGroup from "./components/ButtonGroup";
import Carousel from "./components/Carousel";
import Placeholder from "./components/Placeholder";
import cards from "./data/posts";
import useCardView from "./hooks/useCardView";
import useFontSize from "./hooks/useFontSize";

import COMMENTS from "./data/comments";
import IMAGES from "./data/images";
import LINKS from "./data/links";

const TextViewer = () => {
  const [fontSize, increaseFontSize, decreaseFontSize] = useFontSize();
  const { cardView, toggleCardView } = useCardView();
  const [sceneHidden, setSceneHidden] = useState(false);

  const [items, setItems] = useState<any>(cards);

  const currentCharacter = "Donatela";

  const handleAddMessage = (cardId: number) => {
    const randomComment = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];

    const newItems = items.map((item: any) => {
      if (item.id === cardId) {
        return {
          ...item,
          comments: [...item.comments, randomComment],
        };
      }

      return item;
    });

    setItems(newItems);
  };

  const handleAddImage = (cardId: number) => {
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];

    const newItems = items.map((item: any) => {
      if (item.id === cardId) {
        return {
          ...item,
          images: [...item.images, randomImage],
        };
      }

      return item;
    });

    setItems(newItems);
  };

  const handleAddLink = (cardId: number) => {
    const randomLink = LINKS[Math.floor(Math.random() * LINKS.length)];

    const newItems = items.map((item: any) => {
      if (item.id === cardId) {
        return {
          ...item,
          links: [...item.links, randomLink],
        };
      }

      return item;
    });

    setItems(newItems);
  };

  return (
    <>
      <div className="fixed bg-gray-900 z-40  w-screen p-4 flex flex-col items-center justify-center">
        <ButtonGroup
          cardView={cardView}
          toggleCardView={() => toggleCardView()}
          fontSize={fontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          sceneHidden={sceneHidden}
          toggleSceneHidden={() => setSceneHidden(!sceneHidden)}
        />
      </div>

      <div className="w-screen p-4 flex flex-col items-center justify-center pt-40 lg:px-20 xl:px-40 ">
        <div className={`flex flex-col items-start w-full space-y-4   p-10  `}>
          {cardView ? (
            <Carousel cards={cards} />
          ) : (
            <Fragment>
              <section className="overflow-hidden text-neutral-700">
                <div className="flex space-x-4 items-center w-full pb-11 ">
                  <div className="container mx-auto px-5 py-2 lg:px-32 ">
                    <div className="-m-1 flex flex-wrap md:-m-2">
                      <p className={`${"text-" + fontSize} text-gray-200    `}>
                        Irene está escondida no banheiro do apart-hotel de
                        Flora. A vilã e Silveirinha conversam em alto e bom som
                        na sala.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {items.map((card: any, index: any) => (
                <Fragment key={card.id}>
                  <div className="relative group w-full">
                    <div className="flex space-x-2 items-center w-full pb-11 hover:bg-gray-900 p-10">
                      <img
                        className="h-32 w-32 rounded-full mr-10"
                        src={card.image}
                        alt={`Foto de ${card.name}`}
                      />
                      <div className="flex-1">
                        <p className="text-lg sm:text-xl md:text-3xl font-medium text-gray-800">
                          {card.name}
                        </p>

                        {sceneHidden && currentCharacter === card.name ? (
                          <Placeholder />
                        ) : (
                          <p
                            className={`${
                              "text-" + fontSize
                            }   text-gray-500   `}
                          >
                            {card.message}
                          </p>
                        )}

                        {card?.comments?.length > 0 && (
                          <section className="overflow-hidden text-neutral-700">
                            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                              <div className="-m-1 flex flex-wrap md:-m-2">
                                {card?.comments?.map(
                                  (comment: any, index: any) => (
                                    <div
                                      key={index}
                                      className="bg-gray-800 rounded-md px-3 py-2 text-gray-500  flex items-center mt-10  "
                                    >
                                      <BiCommentDetail className="mr-2" />

                                      <p className="text-lg sm:text-xl md:text-1xl font-medium  ">
                                        {comment}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </section>
                        )}

                        {card?.images?.length > 0 && (
                          <section className="overflow-hidden text-neutral-700">
                            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                              <div className="-m-1 flex flex-wrap md:-m-2">
                                {card?.images?.map(
                                  (image: string, index: any) => (
                                    <div
                                      key={index}
                                      className="flex w-1/3 flex-wrap"
                                    >
                                      <div className="w-full p-1 md:p-2">
                                        <img
                                          alt="gallery"
                                          className="block h-full w-full rounded-lg object-cover object-center"
                                          src={image}
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </section>
                        )}

                        {card?.links?.length > 0 && (
                          <section className="overflow-hidden text-neutral-700">
                            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                              <div className="-m-1 flex flex-wrap md:-m-2">
                                {card?.links?.map((link: any, index: any) => (
                                  <div
                                    key={index}
                                    data-te-chip-init
                                    data-te-ripple-init
                                    className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] border border-[#3b71ca] bg-[#eceff1] bg-[transparent] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#3b71ca] hover:!shadow-none dark:text-neutral-200"
                                    data-te-ripple-color="dark"
                                  >
                                    {link}
                                    <span
                                      data-te-chip-close
                                      className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-3 w-3"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </section>
                        )}

                        <div className=" absolute inset-0 h-16 -mt-10 opacity-0 duration-300 bg-black bg-opacity-50 group-hover:opacity-100">
                          <div className="flex items-center justify-center h-full ">
                            <button
                              onClick={() => handleAddMessage(card.id)}
                              className="px-4 py-2 mx-2 bg-white text-black rounded-lg"
                            >
                              Comentar
                            </button>
                            <button
                              onClick={() => handleAddImage(card.id)}
                              className="px-4 py-2 mx-2 bg-white text-black rounded-lg"
                            >
                              Adicionar Imagem
                            </button>
                            <button
                              onClick={() => handleAddLink(card.id)}
                              className="px-4 py-2 mx-2 bg-white text-black rounded-lg"
                            >
                              Adicionar Link
                            </button>
                            <button className="px-4 py-2 mx-2 bg-white text-black rounded-lg">
                              Adicionar Vídeo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index !== cards.length - 1 && (
                    <div className="w-px bg-gray-300 my-2"></div>
                  )}
                </Fragment>
              ))}
            </Fragment>
          )}
        </div>
      </div>
    </>
  );
};

export default TextViewer;
