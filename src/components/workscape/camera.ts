import { REGIONS, SCREEN } from "./WorkscapeScreen";

export type Shot = { x: number; y: number; scale: number };

/**
 * Where the "camera" sits for a region: a scale and offset for the screen element
 * (transform-origin 0 0) that frames the region inside the stage.
 * `focusX` lets the frame sit right of centre when a caption occupies the left.
 */
export function shot(
  id: string | null,
  stage: { w: number; h: number },
  opts: { fill?: number; focusX?: number; overviewWidth?: number } = {},
): Shot {
  const { fill = 0.7, focusX = 0.5, overviewWidth = 1 } = opts;
  if (!id) {
    const scale = Math.min((stage.w * overviewWidth) / SCREEN.w, stage.h / SCREEN.h) * 0.84;
    return { scale, x: stage.w * focusX - (SCREEN.w * scale) / 2, y: (stage.h - SCREEN.h * scale) / 2 };
  }
  const r = REGIONS[id];
  const scale = Math.min((stage.w * fill) / r.w, (stage.h * fill) / r.h);
  return {
    scale,
    x: stage.w * focusX - (r.x + r.w / 2) * scale,
    y: stage.h / 2 - (r.y + r.h / 2) * scale,
  };
}
