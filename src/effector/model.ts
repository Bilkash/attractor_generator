import { createGate } from "effector-react";
import { createDomain } from "effector";

import { Point } from "../types";

export const canvasGate = createGate();
const domain = createDomain("canvas");

export const setStartPointFlag = domain.event<boolean>();
export const setStartPoint = domain.event<Point | null>();
export const setPoints = domain.event<Point[]>();
export const setIterations = domain.event<number>();
export const setGeneration = domain.event<boolean>();

export const $startPointFlag = domain.store(false);
export const $startPoint = domain.store<Point | null>(null);
export const $points = domain.store<Point[]>([]);
export const $iterations = domain.store<number>(100);
export const $generation = domain.store<boolean>(false);

$startPointFlag.on(setStartPointFlag, (state) => !state);
$startPoint.on(setStartPoint, (_, newStartPoint: Point | null) => newStartPoint);
$points.on(setPoints, (_, newPoints) => newPoints);
$iterations.on(setIterations, (_, newIterations) => newIterations);
$generation.on(setGeneration, (_, newGenerationState) => newGenerationState);
