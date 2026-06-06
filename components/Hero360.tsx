"use client";

import React, { useEffect, useRef } from "react";
import "@photo-sphere-viewer/core/index.css";

const Hero360: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let viewerInstance: any;

    const startAutoRotate = () => {
      const step = (time: number) => {
        if (!viewerInstance) return;

        if (lastTimeRef.current === null) {
          lastTimeRef.current = time;
        }

        const delta = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;

        const position = viewerInstance.getPosition();
        viewerInstance.rotate({
          yaw: position.yaw + delta * 0.08,
          pitch: position.pitch,
        });

        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    import("@photo-sphere-viewer/core")
      .then(({ Viewer }) => {
        viewerInstance = new Viewer({
          container: containerRef.current!,
          panorama: "/properties/exterior.jpg",
          defaultYaw: 0,
          defaultPitch: 0,
          defaultZoomLvl: 55,
          navbar: false,
          mousewheel: false,
          mousemove: false,
          touchmoveTwoFingers: false,
          canvasBackground: "#000",
          moveSpeed: 1,
          zoomSpeed: 0.8,
        });

        viewerRef.current = viewerInstance;

        viewerInstance.addEventListener("ready", () => {
          if (viewerInstance.needsContinuousUpdate) {
            viewerInstance.needsContinuousUpdate(true);
          }
          startAutoRotate();
        });
      })
      .catch((error) => {
        console.error("Failed to initialize 360 hero viewer", error);
      });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (viewerInstance) {
        if (viewerInstance.needsContinuousUpdate) {
          viewerInstance.needsContinuousUpdate(false);
        }
        try {
          viewerInstance.destroy();
        } catch (error) {
          console.error("Failed to destroy 360 hero viewer", error);
        }
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default Hero360;
