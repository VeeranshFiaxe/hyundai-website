"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CarColor } from "@/lib/data";
import s from "./Car360Viewer.module.css";

/* ── constants ──────────────────────────────────────────────────── */
const FRAME_COUNT = 36;

/** Pixels of horizontal drag needed to advance one frame. Lower = faster spin. */
const PX_PER_FRAME = 7;

/* ── URL builder ─────────────────────────────────────────────────── */
function frameUrl(modelFolder: string, colorSlug: string, frame: number) {
  return `/cars/360/${modelFolder}/${colorSlug}/${colorSlug}_${frame}.png`;
}

/* ── types ───────────────────────────────────────────────────────── */
interface Car360ViewerProps {
  modelFolder: string;
  colors: CarColor[];
  defaultColorIndex?: number;
}

/* ── helpers ─────────────────────────────────────────────────────── */
function preloadFrames(
  modelFolder: string,
  colorSlug: string,
  onProgress: (loaded: number) => void,
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = frameUrl(modelFolder, colorSlug, i);
      img.onload = img.onerror = () => {
        loaded++;
        onProgress(loaded);
        if (loaded === FRAME_COUNT) resolve(images);
      };
      images[i] = img;
    }
  });
}

/* ── component ───────────────────────────────────────────────────── */
export default function Car360Viewer({
  modelFolder,
  colors,
  defaultColorIndex = 0,
}: Car360ViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // activation
  const [activated, setActivated] = useState(false);

  // colour
  const [colorIndex, setColorIndex] = useState(defaultColorIndex);
  const activeColor = colors[colorIndex];
  const activeSlug = activeColor.colorSlug;

  // frame & interaction
  const frameRef = useRef(6);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const dragStartXRef = useRef<number | null>(null);
  const dragStartFrameRef = useRef(6);

  // loading state
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // drag hint
  const [showHint, setShowHint] = useState(false);

  /* ── draw a single frame onto the canvas ── */
  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[frame];
    if (!img?.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ar = img.naturalWidth / img.naturalHeight;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = ar > cw / ch ? cw : ch * ar;
    const ih = ar > cw / ch ? cw / ar : ch;
    ctx.drawImage(img, (cw - iw) / 2, (ch - ih) / 2, iw, ih);
  }, []);

  /* ── load frames for a given colour slug ── */
  const loadColor = useCallback(
    async (slug: string) => {
      setIsLoading(true);
      setLoadedCount(0);

      const images = await preloadFrames(modelFolder, slug, (n) => {
        setLoadedCount(n);
      });

      imagesRef.current = images;
      setIsLoading(false);
      drawFrame(frameRef.current);
    },
    [modelFolder, drawFrame],
  );

  /* ── activate ── */
  const handleActivate = () => {
    setActivated(true);
    setShowHint(true);
  };

  /* ── mount / colour change ── */
  useEffect(() => {
    if (activated) loadColor(activeSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug, activated]);

  /* ── pointer events (drag-to-spin) ── */
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activated) return;
    if (showHint) setShowHint(false);
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = frameRef.current;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    const frameDelta = Math.round(delta / PX_PER_FRAME);
    const newFrame =
      ((dragStartFrameRef.current + frameDelta) % FRAME_COUNT + FRAME_COUNT) %
      FRAME_COUNT;
    if (newFrame !== frameRef.current) {
      frameRef.current = newFrame;
      drawFrame(newFrame);
    }
  };

  const handlePointerUp = () => {
    dragStartXRef.current = null;
  };

  /* ── colour swatch click ── */
  const handleColorChange = (idx: number) => {
    if (idx === colorIndex) return;
    setColorIndex(idx);
  };

  const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
  const circumference = 2 * Math.PI * 18;
  const dashOffset = circumference * (1 - progress / 100);

  const previewUrl = frameUrl(modelFolder, activeSlug, 6);

  return (
    <div className={s.root}>
      {/* ── canvas stage ── */}
      <div className={s.stage}>
        {!activated ? (
          <div className={s.placeholder}>
            <img
              src={previewUrl}
              alt={activeColor.name}
              className={s.previewImg}
            />
            <button
              type="button"
              onClick={handleActivate}
              className={s.activateBtn}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              360&deg; View
            </button>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              width={900}
              height={520}
              className={s.canvas}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              aria-label={`${activeColor.name}, drag to rotate`}
              role="img"
            />

            {/* loading overlay */}
            {isLoading && (
              <div className={s.loadingOverlay}>
                <div className={s.loadingInner}>
                  <svg className={s.spinner} viewBox="0 0 44 44" aria-hidden>
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      strokeWidth="3"
                      stroke="rgba(255,255,255,0.15)"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      strokeWidth="3"
                      stroke="white"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      className={s.spinnerArc}
                    />
                  </svg>
                  <span className={s.pct}>{progress}%</span>
                </div>
                <p className={s.loadingLabel}>Loading 360&deg; view&hellip;</p>
              </div>
            )}

            {/* drag hint overlay */}
            {showHint && !isLoading && (
              <div className={s.hint} aria-hidden>
                <span className={s.hintIcon}>
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <path
                      d="M6 19 L14 13 M6 19 L14 25"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M32 19 L24 13 M32 19 L24 25"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="19" cy="19" r="5" fill="white" opacity="0.9" />
                  </svg>
                </span>
                <span className={s.hintText}>Drag to spin</span>
              </div>
            )}

            {/* colour name badge */}
            <span className={s.colorBadge}>{activeColor.name}</span>

            {/* 360° badge */}
            <span className={s.badge360} aria-hidden>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              360&deg;
            </span>
          </>
        )}
      </div>

      {/* ── colour swatches ── */}
      <div className={s.swatchesWrap}>
        <div className={s.swatchesHeader}>
          <p className={s.swatchesLabel}>
            Colours&nbsp;&middot;&nbsp;
            <span className={s.swatchesCount}>{colors.length} options</span>
          </p>
          <p className={s.swatchesHint}>Tap to change paint</p>
        </div>
        <div className={s.swatches}>
          {colors.map((c, i) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              aria-label={`View ${c.name}`}
              aria-pressed={i === colorIndex}
              onClick={() => handleColorChange(i)}
              className={`${s.swatch}${i === colorIndex ? ` ${s.swatchActive}` : ""}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
