"use client";

import "@tensorflow/tfjs-backend-webgl";
import { useCallback, useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { FaPowerOff } from "react-icons/fa";
import Webcam from "react-webcam";
import HandGestureDetector from "./components/HandGestureDetector";
import useEasterEggConfetti from "./hooks/useEasterEggConfetti";
import useEasterEggGlobo from "./hooks/useEasterEggGlobo";
import TextViewer from "./text";

const DISABLED_EASTER_EGGS = true;
const DISABLED_HAND_GESTURE = true;

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [gesture, setGesture] = useState("");
  const [disableGesture, setDisableGesture] = useState(false);

  const { showGlobo, onGlobo } = useEasterEggGlobo();
  const { showConfetti, onConfetti } = useEasterEggConfetti();

  const handleGestureDetected = useCallback((gestureName: string) => {
    setGesture(gestureName);

    if (!DISABLED_EASTER_EGGS) {
      if (gestureName === "thumbs_up") {
        onConfetti();
      } else if (gestureName === "victory") {
        onGlobo();
      }
    }
  }, []);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [on, setOn] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleClick = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y);

    if (element) {
      console.log("CLICOUUUU", element);

      const clickableElement = element as HTMLElement;
      clickableElement.click();
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("gesture", gesture);
  }, [gesture]);

  if (width === 0 || height === 0) return null;
  return (
    <div>
      {on ? (
        <>
          <TextViewer />

          <p className="text-white">
            Width {width} e height {height}
          </p>
          {!disableGesture && !DISABLED_HAND_GESTURE && (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                mirrored={true}
                screenshotFormat="image/jpeg"
                style={{
                  objectFit: "cover",
                  width: 0,
                  height: 0,
                  position: "fixed",
                  right: 0,
                  bottom: 0,
                }}
              />

              <canvas
                id="hands"
                ref={canvasRef}
                className={`absolute mx-auto inset-x-0 text-center z-9 w-${width} h-${height} mirrored`}
              />
            </>
          )}
        </>
      ) : (
        <div className="fixed inset-0 bg-black z-50 pointer-events-none"></div>
      )}

      {on ? (
        <button
          onClick={() => setOn((prev) => !prev)}
          className="fixed z-50 top-0 right-0 m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaPowerOff />
        </button>
      ) : (
        <button
          onClick={() => setOn((prev) => !prev)}
          className="fixed z-50 top-0 right-0 m-4 drop-shadow-2xl text-white font-bold py-2 px-4 rounded"
        >
          <img src="/eva.png" width={100} />
        </button>
      )}

      {showGlobo && (
        <div className="fixed z-50 inset-0 bottom-0 right-0 m-4 pointer-events-none">
          <img src="/globo.png" className="z-50" width={100} />
        </div>
      )}

      {showConfetti && (
        <div className="fixed z-50 inset-0 bottom-0 right-0 m-4 pointer-events-none">
          <ConfettiExplosion />
        </div>
      )}

      {!disableGesture &&
        !DISABLED_HAND_GESTURE &&
        webcamRef.current &&
        canvasRef.current && (
          <HandGestureDetector
            onClick={handleClick}
            onGestureDetected={handleGestureDetected}
            webcamRef={webcamRef}
          />
        )}

      <button
        onClick={() => setDisableGesture((prev) => !prev)}
        className="fixed z-50 bottom-0 left-0 m-4 bg-gray-400 drop-shadow-2xl text-white font-bold py-2 px-4 rounded"
      >
        Desativar
      </button>
    </div>
  );
}
