import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { useCallback, useEffect } from "react";
import Webcam from "react-webcam";

type HandGestureDetectorProps = {
  onGestureDetected: (gestureName: string) => void;
  onClick: (x: number, y: number) => void;
  webcamRef: React.RefObject<Webcam>;
};

const HandGestureDetector: React.FC<HandGestureDetectorProps> = ({
  onGestureDetected,
  webcamRef,
  onClick,
}) => {
  const checkPinchGesture = (landmarks: number[][]) => {
    const thumbTip = landmarks[4];
    const indexFingerTip = landmarks[8];
    const distance = Math.sqrt(
      Math.pow(indexFingerTip[0] - thumbTip[0], 2) +
        Math.pow(indexFingerTip[1] - thumbTip[1], 2)
    );
    return distance < 30; // Ajuste este valor conforme necessário
  };

  const detect = useCallback(async () => {
    const video = webcamRef.current?.video;
    if (video && video.readyState === 4) {
      const net = await handpose.load();
      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const isPinching = checkPinchGesture(hand[0].landmarks);

        if (isPinching) {
          const x = hand[0].landmarks[8][0]; // Coordenada X do dedo indicador
          const y = hand[0].landmarks[8][1]; // Coordenada Y do dedo indicador
          onClick(x, y);
        }

        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 7.5);
        if (gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce(
            (prev: any, current: any) =>
              prev.confidence > current.confidence ? prev : current
          );
          onGestureDetected(maxConfidenceGesture.name);
        }
      }
    }

    setTimeout(() => detect(), 100);
  }, [onGestureDetected, webcamRef]);

  useEffect(() => {
    detect();
  }, [detect]);

  return null;
};

export default HandGestureDetector;
