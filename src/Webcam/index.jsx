import React, { useEffect, useRef } from 'react';
import "./index.css";

import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs';

const Webcam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getVideoStream = async () => {
      try {
        let stream;
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = async () => {
            const net = await bodyPix.load();

            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            const context = canvasRef.current.getContext('2d');

            async function updateCanvas() {
              const segmentation = await net.segmentPerson(videoRef.current);

              const imageData = context.createImageData(canvasRef.current.width, canvasRef.current.height);
              const data = imageData.data;

              for (let i = 0; i < segmentation.data.length; i++) {
                const shouldMask = segmentation.data[i] !== 0;
                const offset = i * 4;

                data[offset + 0] = shouldMask ? 0 : 255; // Red channel
                data[offset + 1] = shouldMask ? 0 : 255; // Green channel
                data[offset + 2] = shouldMask ? 0 : 255; // Blue channel
                data[offset + 3] = shouldMask ? 255 : 0; // Alpha channel
              }

              context.putImageData(imageData, 0, 0);

              requestAnimationFrame(updateCanvas);
            }

            updateCanvas();
          };
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    if (window.innerWidth > 320 && window.innerWidth < 690) {
      getVideoStream();
    }
  }, []);

  return (
    <div id="webcam-feed">
      <video ref={videoRef} style={{ display: 'none' }} autoPlay={true} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Webcam;
