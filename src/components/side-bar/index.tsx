import React, { useEffect } from "react";
import { useGate, useStore } from "effector-react";
import { notification } from "antd";

import {
	$generatedPoints,
	$iterations,
	$points, $startPoint,
	$startPointFlag,
	canvasGate, setGeneratedPoints, setIterations,
	setPoints,
	setStartPoint,
	setStartPointFlag
} from "../../effector/model";
import { SideWrapper, Button, InputWrapper, Input } from "./index.styled";
import { Point } from "../../types";

export default function SideBar (draw: () => void) {
	useGate(canvasGate);
	const [api, contextHolder] = notification.useNotification();
	const startPointFlag = useStore($startPointFlag);
	const iterations = useStore($iterations);
	const points = useStore($points);
	const startPoint = useStore($startPoint);

	const openNotificationNoStartPoint = () => {
		api.info({
			message: "No Start Point",
			description: "Please add start point."
		});
	};

	function getRandomIndexInRange(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function getMidPoint(p1: Point, p2: Point): Point {
		const midX = (p1.x + p2.x) / 2;
		const midY = (p1.y + p2.y) / 2;

		return { x: Math.floor(midX), y: Math.floor(midY), attractPoint: true };
	}

	const generation = () => {
		const spikes = points.slice(0, points.filter(it => !it.attractPoint).length);

		let currentIteration = 0;
		const interval = setInterval(() => {
			console.log(currentIteration >= iterations);
			console.log({ currentIteration, iterations });

			if (currentIteration >= iterations) {
				clearInterval(interval);
				return;
			}
			const p1 = points[points.length - 1];
			const p2 = spikes[getRandomIndexInRange(1, spikes.length) - 1];
			const newPoint = getMidPoint(p1, p2);
			points.push(newPoint);
			setPoints([...points]);
			draw();
			currentIteration+=1;
		}, 100);
	};

	return (
		<>
			{contextHolder}
			<SideWrapper>
				<Button disabled={startPointFlag} onClick={() => setStartPointFlag()}>
					Set Start Point
				</Button>

				<Button onClick={() => setStartPoint(null)}>
					Remove Start Point
				</Button>

				<Button onClick={() => {
					setPoints([]);
					setStartPoint(null);
				}}>
					Remove All Points
				</Button>

				<InputWrapper>
					<Button onClick={() => setIterations(iterations-100)}>-100</Button>
					<Input
						type={"number"}
						value={iterations}
						onChange={(e) => setIterations(+e.currentTarget.value)}
					/>
					<Button onClick={() => setIterations(iterations+100)}>+100</Button>
				</InputWrapper>

				<Button onClick={() => {
					if (!startPoint) {
						openNotificationNoStartPoint();
					} else {
						generation();
					}
				}}>
					Start Attractor
				</Button>
			</SideWrapper>
		</>
	);
}
