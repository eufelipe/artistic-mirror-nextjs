"use client";

import "@tensorflow/tfjs-backend-webgl";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import HandGestureDetector from "./components/HandGestureDetector";

export default function Home() {
  const [emoji, setEmoji] = useState("");
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGestureDetected = useCallback(
    (gestureName: string) => {
      setEmoji(gestureName);
      console.log(emoji);
    },
    [setEmoji, emoji]
  );

  const width = globalThis.screen.availWidth;
  const height = globalThis.screen.availHeight;

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: width,
          height: height,
          visibility: "hidden",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: width,
          height: height,
        }}
      />

      <HandGestureDetector
        onGestureDetected={handleGestureDetected}
        webcamRef={webcamRef}
        canvasRef={canvasRef}
      />
    </div>
  );
}
