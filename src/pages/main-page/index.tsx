import React, { MouseEventHandler, useEffect, useRef } from "react";
import styled from "styled-components";
import { notification } from "antd";
import { useStore } from "effector-react";

import { SideBar } from "../../components";
import {
	$points,
	$startPoint,
	$startPointFlag,
	setPoints,
	setStartPoint,
	setStartPointFlag
} from "../../effector/model";

export default function MainPage () {
	const [api, contextHolder] = notification.useNotification();
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const startPointFlag = useStore($startPointFlag);
	const startPoint = useStore($startPoint);
	const points = useStore($points);

	const openNotificationLessPoint = () => {
		api.info({
			message: "Less point",
			description: "Please add more than two points for place a start point."
		});
	};

	const handleClick:MouseEventHandler<HTMLCanvasElement> = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!startPoint) {
			if (canvas) {
				if (!startPointFlag) {
					const rect = canvas.getBoundingClientRect();
					const x = event.clientX - rect.left;
					const y = event.clientY - rect.top;
					setPoints([...points, { x: Math.floor(x), y: Math.floor(y), attractPoint: false }]);
				} else {
					if (points.length < 3) {
						openNotificationLessPoint();
						setStartPointFlag();
					} else {
						const rect = canvas.getBoundingClientRect();
						const x = event.clientX - rect.left;
						const y = event.clientY - rect.top;
						setPoints([...points, { x: Math.floor(x), y: Math.floor(y), start: true },]);
					}
				}
			}
		}
	};

	useEffect(() => {
		if (!startPoint) {
			const oldPoints = [...points];
			setPoints(oldPoints.filter(it => !it.start));
		}
	}, [startPoint]);

	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.strokeStyle = "#fff";
				ctx.lineWidth = 2;

				points.forEach((point, index) => {
					ctx.beginPath();
					ctx.fillStyle = "#fff";
					ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
					ctx.fill();

					if (!point.start) {
						ctx.font = "11px Arial";
						ctx.fillStyle = "#fff";
						ctx.fillText(point.attractPoint ? "" : `${index + 1}`, point.x + 10, point.y - 10);
					} else {
						ctx.font = "11px Arial";
						ctx.strokeStyle = "#ff0000";
						ctx.fillStyle = "red";
						ctx.fillText("Start", point.x + 10, point.y - 10);
						if (!startPoint) {
							setStartPointFlag();
							setStartPoint({ x: point.x, y: point.y, start: true });
						}
					}
				});
			}
		}
	}, [points]);



	return (
		<>
			{contextHolder}
			<Wrapper>
				<SideBar/>

				<CanvasWrapper>
					<canvas
						ref={canvasRef}
						width={window.innerWidth}
						height={window.innerHeight}
						onClick={handleClick}
					/>
				</CanvasWrapper>
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
`;

const CanvasWrapper = styled.div`
	background-color: #1B1D2B;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;



