"use client";

import React, { useEffect, useRef, useState } from "react";
import { MaxRectsPacker } from "maxrects-packer";
import ImageLoader from "@/components/ImageLoader";

export default function Home() {
  const [input, setInput] = useState([]);
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(1024);
  const [canvasHeight, setCanvasHeight] = useState(1024);

  const options = {
    smart: true,
    pot: false,
    square: false,
    allowRotation: false,
    tag: false,
    padding: 0,
  };
  const [packer, setPacker] = useState(
    new MaxRectsPacker(1024, 1024, 0, options)
  );

  const updatePacker = () => {
    const initPacker = new MaxRectsPacker(1024, 1024, 0, options);
    initPacker.addArray(input);
    console.log(input);
    return initPacker;
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // input.forEach((imageData) => {
    //   const { x, y, width, height } = packer.bins[0].rects;
    // });
    setPacker(updatePacker());
    if (input.length === 1) packer.add(input[0]);

    console.log(packer.bins[0]);

    if (packer.bins[0]) {
      setCanvasWidth(packer.bins[0].width);
      setCanvasHeight(packer.bins[0].height);
      packer.bins[0].rects.forEach((rect) => {
        const { image, x, y, width, height } = rect;
        image.onload = () => {
          ctx.drawImage(image, x, y, width, height);
        };
        image.src = rect.preview;
      });
    }
  }, [input.length, canvasWidth, canvasHeight]);

  return (
    <main className="flex flex-1 bg-black justify-between">
      <ImageLoader onImagesLoaded={setInput} />
      <div className="bg-foreground mx-4 flex-1">
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      </div>
      <div className="bg-foreground flex-1">sidewindow</div>
    </main>
  );
}
