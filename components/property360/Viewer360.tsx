"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Link2,
  RotateCcw,
  ArrowLeft,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { SceneData, propertyTours } from "@/data/property-scenes";
import Hotspot from "./Hotspot";
import ThumbnailNav from "./ThumbnailNav";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Import CSS for photo-sphere-viewer
import "@photo-sphere-viewer/core/index.css";

interface Viewer360Props {
  propertyId: string;
  onSceneChange?: (sceneId: string) => void;
  currentSceneId?: string;
}

export const Viewer360: React.FC<Viewer360Props> = ({
  propertyId,
  onSceneChange,
  currentSceneId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  const defaultScenes = propertyTours[propertyId] || [];

  const [scenesList, setScenesList] = useState<SceneData[]>([]);
  const [customScenes, setCustomScenes] = useState<SceneData[]>([]);
  const [currentScene, setCurrentScene] = useState<SceneData | null>(null);
  const [hotspotCoords, setHotspotCoords] = useState<
    Record<string, { x: number; y: number; visible: boolean }>
  >({});

  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Custom scene form
  const [customUrl, setCustomUrl] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customDesc, setCustomDesc] = useState("");

  // 1. Initialize scenes list and restore state on mount
  useEffect(() => {
    // Load custom scenes from localStorage
    const savedCustomScenesStr = localStorage.getItem(
      `tour-custom-scenes-${propertyId}`,
    );
    let loadedCustomScenes: SceneData[] = [];
    if (savedCustomScenesStr) {
      try {
        loadedCustomScenes = JSON.parse(savedCustomScenesStr);
        setCustomScenes(loadedCustomScenes);
      } catch (e) {
        console.error("Failed to parse custom scenes", e);
      }
    }

    const fullList = [...defaultScenes, ...loadedCustomScenes];
    setScenesList(fullList);

    // Determine initial scene (check saved state)
    const savedStateStr = localStorage.getItem(`tour-state-${propertyId}`);
    let initialScene = defaultScenes[0] || null;
    if (savedStateStr) {
      try {
        const savedState = JSON.parse(savedStateStr);
        const found = fullList.find((s) => s.id === savedState.sceneId);
        if (found) {
          initialScene = found;
        }
      } catch (e) {
        console.error("Failed to parse tour state", e);
      }
    }

    setCurrentScene(initialScene);
  }, [propertyId]);

  // 2. Helper to project 3D to 2D
  const updatePositions = (viewer: any) => {
    if (!viewer || !currentScene) return;

    const currentCam = viewer.getPosition();
    const currentZoom = viewer.getZoomLevel();

    // Save camera orientation state to localStorage
    const stateToSave = {
      sceneId: currentScene.id,
      yaw: currentCam.yaw,
      pitch: currentCam.pitch,
      zoom: currentZoom,
    };
    localStorage.setItem(
      `tour-state-${propertyId}`,
      JSON.stringify(stateToSave),
    );

    const newCoords: Record<
      string,
      { x: number; y: number; visible: boolean }
    > = {};

    currentScene.hotspots.forEach((hotspot) => {
      // Parse percentage strings to numbers
      const topPct = parseFloat(hotspot.top);
      const leftPct = parseFloat(hotspot.left);

      // Map 2D percentage [0, 100] to 3D spherical angles [radians]
      // Left maps to Yaw: [0, 100] -> [-Math.PI, Math.PI]
      const yaw = (leftPct / 100) * 2 * Math.PI - Math.PI;
      // Top maps to Pitch: [0, 100] -> [Math.PI/2, -Math.PI/2] (inverted)
      const pitch = (0.5 - topPct / 100) * Math.PI;

      // Custom unit-vector mathematical visibility check:
      // Check if the point is in front of the camera (dot product > 0)
      const cam = {
        x: Math.cos(currentCam.pitch) * Math.sin(currentCam.yaw),
        y: Math.sin(currentCam.pitch),
        z: Math.cos(currentCam.pitch) * Math.cos(currentCam.yaw),
      };
      const hot = {
        x: Math.cos(pitch) * Math.sin(yaw),
        y: Math.sin(pitch),
        z: Math.cos(pitch) * Math.cos(yaw),
      };
      const dot = cam.x * hot.x + cam.y * hot.y + cam.z * hot.z;
      const isFacingCamera = dot > 0;

      if (isFacingCamera) {
        try {
          const vector = viewer.dataHelper.sphericalCoordsToVector3({
            yaw,
            pitch,
          });
          const coords = viewer.dataHelper.vector3ToViewerCoords(vector);
          newCoords[hotspot.id] = {
            x: coords.x,
            y: coords.y,
            visible: true,
          };
        } catch (err) {
          newCoords[hotspot.id] = { x: 0, y: 0, visible: false };
        }
      } else {
        newCoords[hotspot.id] = { x: 0, y: 0, visible: false };
      }
    });

    setHotspotCoords(newCoords);
  };

  // 3. Initialize Photo Sphere Viewer when the image changes
  useEffect(() => {
    if (!containerRef.current || !currentScene) return;

    let viewerInstance: any;
    setIsLoading(true);

    // Dynamically load photo-sphere-viewer/core
    import("@photo-sphere-viewer/core")
      .then(({ Viewer }) => {
        // Get saved state to apply default camera coordinates if matching
        const savedStateStr = localStorage.getItem(`tour-state-${propertyId}`);
        let defaultYaw = 0;
        let defaultPitch = 0;
        let defaultZoom = 50;

        if (savedStateStr) {
          try {
            const savedState = JSON.parse(savedStateStr);
            if (savedState.sceneId === currentScene.id) {
              defaultYaw = savedState.yaw ?? 0;
              defaultPitch = savedState.pitch ?? 0;
              defaultZoom = savedState.zoom ?? 50;
            }
          } catch (e) {}
        }

        viewerInstance = new Viewer({
          container: containerRef.current!,
          panorama: currentScene.image,
          defaultYaw: defaultYaw,
          defaultPitch: defaultPitch,
          defaultZoomLvl: defaultZoom,
          navbar: false,
          mousewheel: true,
          touchmoveTwoFingers: false,
        });

        viewerRef.current = viewerInstance;

        viewerInstance.addEventListener("ready", () => {
          setIsLoading(false);
          updatePositions(viewerInstance);
        });

        viewerInstance.addEventListener("position-updated", () => {
          updatePositions(viewerInstance);
        });

        viewerInstance.addEventListener("zoom-updated", () => {
          updatePositions(viewerInstance);
        });

        viewerInstance.addEventListener("size-updated", () => {
          updatePositions(viewerInstance);
        });
      })
      .catch((err) => {
        console.error("Failed to initialize PhotoSphereViewer", err);
        setIsLoading(false);
      });

    return () => {
      if (viewerInstance) {
        try {
          viewerInstance.destroy();
        } catch (e) {}
      }
    };
  }, [currentScene?.image]);

  // 4. Custom controls handlers
  const handleZoomIn = () => {
    if (viewerRef.current) {
      viewerRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (viewerRef.current) {
      viewerRef.current.zoomOut();
    }
  };

  const handleToggleFullscreen = () => {
    if (!outerContainerRef.current) return;

    if (!document.fullscreenElement) {
      outerContainerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error enabling fullscreen", err);
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleSceneChange = (sceneId: string) => {
    const targetScene = scenesList.find((s) => s.id === sceneId);
    if (targetScene) {
      setCurrentScene(targetScene);
      onSceneChange?.(sceneId);
    }
  };

  // Update scene when currentSceneId prop changes from parent
  useEffect(() => {
    if (
      currentSceneId &&
      currentSceneId !== currentScene?.id &&
      scenesList.length > 0
    ) {
      const targetScene = scenesList.find((s) => s.id === currentSceneId);
      if (targetScene) {
        setCurrentScene(targetScene);
      }
    }
  }, [currentSceneId, scenesList]);

  // Notify parent when current scene changes
  useEffect(() => {
    if (currentScene) {
      onSceneChange?.(currentScene.id);
    }
  }, [currentScene?.id, onSceneChange]);

  const handleRestartTour = () => {
    if (defaultScenes.length > 0) {
      // Clear localStorage state
      localStorage.removeItem(`tour-state-${propertyId}`);
      setCurrentScene(defaultScenes[0]);
      if (viewerRef.current) {
        viewerRef.current.zoom(50);
        viewerRef.current.rotate({ yaw: 0, pitch: 0 });
      }
    }
  };

  // 5. Add custom 360 scene
  const handleAddCustomScene = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl) return;

    const newScene: SceneData = {
      id: `custom-${Date.now()}`,
      image: customUrl,
      title: customTitle || "Custom Panoramic View",
      subtitle: "External 360° Link",
      description: customDesc || "Custom uploaded panoramic scene.",
      hotspots: [],
    };

    const newCustomScenes = [...customScenes, newScene];
    setCustomScenes(newCustomScenes);
    localStorage.setItem(
      `tour-custom-scenes-${propertyId}`,
      JSON.stringify(newCustomScenes),
    );

    const updatedList = [...defaultScenes, ...newCustomScenes];
    setScenesList(updatedList);
    setCurrentScene(newScene);

    // Reset form & close modal
    setCustomUrl("");
    setCustomTitle("");
    setCustomDesc("");
    setIsCustomModalOpen(false);
  };

  if (!currentScene) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-slate-900 rounded-2xl border border-slate-800 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500 mb-4" />
        <p>Loading tour scenes...</p>
      </div>
    );
  }

  // Find step counter details
  const defaultSceneIds = defaultScenes.map((s) => s.id);
  const isDefaultScene = defaultSceneIds.includes(currentScene.id);
  const currentStepIndex = isDefaultScene
    ? defaultSceneIds.indexOf(currentScene.id) + 1
    : null;
  const totalSteps = defaultSceneIds.length;

  return (
    <div
      ref={outerContainerRef}
      className="flex flex-col w-full h-full bg-slate-950 text-slate-100 rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* 360 Viewer Canvas Wrapper */}
      <div className="relative flex-1 w-full h-[60vh] md:h-[70vh] overflow-hidden select-none">
        {/* The actual photo-sphere-viewer container */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Hotspots Overlay Layer */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {currentScene.hotspots.map((hotspot) => {
            const coord = hotspotCoords[hotspot.id];
            if (!coord || !coord.visible) return null;
            return (
              <Hotspot
                key={hotspot.id}
                label={hotspot.label}
                onClick={() => handleSceneChange(hotspot.target)}
                style={{
                  left: `${coord.x}px`,
                  top: `${coord.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            );
          })}
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-30">
            <Loader2 className="h-10 w-10 animate-spin mb-3" />
            <p className="text-sm font-semibold text-slate-300 tracking-wider">
              Loading Scene Panorama...
            </p>
          </div>
        )}

        {/* Custom React Floating Controls Overlay (Bottom Right) */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-20">
          {/* Custom URL Input Button */}
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-100 hover:bg-slate-900 hover:text-cyan-400 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
            title="Load Custom 360° Image URL"
          >
            <Plus className="h-5 w-5" />
          </button>

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-100 hover:bg-slate-900 hover:text-cyan-400 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-5 w-5" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-100 hover:bg-slate-900 hover:text-cyan-400 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-100 hover:bg-slate-900 hover:text-cyan-400 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Thumbnail Nav controls */}
      {scenesList.length > 1 && (
        <ThumbnailNav
          scenes={scenesList}
          currentSceneId={currentScene.id}
          onSceneChange={handleSceneChange}
        />
      )}

      {/* Custom Image URL Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm z-50 p-4 select-none pointer-events-auto">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsCustomModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 transition-colors focus:outline-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2 mb-4">
              <Link2 className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">
                Load Custom 360° Image
              </h3>
            </div>

            <form onSubmit={handleAddCustomScene} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Image URL (Equirectangular 2:1)*
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/panorama.jpg"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Scene Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Living Room View"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Scene Description (Optional)
                </label>
                <textarea
                  placeholder="Describe this scene..."
                  rows={2}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <Button
                  type="submit"
                  variant="accent"
                  className="flex-1 rounded-xl h-11 font-bold"
                >
                  Load Scene
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="flex-1 rounded-xl h-11"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewer360;
