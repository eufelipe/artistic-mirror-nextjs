"use client";

import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { drawHand } from "../utils/utilities";

type HandGestureDetectorProps = {
  onGestureDetected: (gestureName: string) => void;
  webcamRef: React.RefObject<Webcam>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

function HandGestureDetector({
  onGestureDetected,
  webcamRef,
  canvasRef,
}: HandGestureDetectorProps) {
  const detect = useCallback(
    async (
      net: handpose.HandPose,
      video: HTMLVideoElement,
      canvas: HTMLCanvasElement
    ) => {
      try {
        // Verificar se os dados estão disponíveis
        if (video.readyState === 4) {
          // Obter propriedades do vídeo
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Definir largura do vídeo
          video.width = videoWidth;
          video.height = videoHeight;

          // Definir altura e largura do canvas
          canvas.width = videoWidth;
          canvas.height = videoHeight;

          // Fazer detecções
          const hand = await net.estimateHands(video);

          // Detectar gestos
          if (hand.length > 0) {
            const GE = new fp.GestureEstimator([
              fp.Gestures.VictoryGesture,
              fp.Gestures.ThumbsUpGesture,
            ]);
            const gesture = await GE.estimate(hand[0].landmarks, 4);
            if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
              const confidence = gesture.gestures.map(
                (prediction: any) => prediction.confidence
              );
              const maxConfidence = confidence.indexOf(
                Math.max.apply(null, confidence)
              );
              onGestureDetected(gesture.gestures[maxConfidence]?.name);
            }
          }

          // Desenhar malha
          const ctx = canvas.getContext("2d");
          if (ctx) drawHand(hand, ctx);
        }
      } catch (error) {
        console.error("Erro ao detectar gestos:", error);
      }
    },
    [onGestureDetected]
  );

  useEffect(() => {
    let video = webcamRef.current?.video as HTMLVideoElement;
    let canvas = canvasRef.current as HTMLCanvasElement;
    let intervalId: NodeJS.Timeout;

    async function runHandpose() {
      const net = await handpose.load();
      console.log("Modelo Handpose carregado.");
      intervalId = setInterval(() => {
        detect(net, video, canvas);
      }, 10);
    }

    runHandpose();

    return () => clearInterval(intervalId);
  }, [detect, webcamRef, canvasRef]);

  return null;
}

export default HandGestureDetector;
