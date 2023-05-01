import React, { useEffect, useRef, useState } from "react";

interface Point {
	x: number;
	y: number;
	start?: boolean;
	attractPoint?: boolean;
}

interface Line {
	start: Point;
	end: Point;
}

export default function Canvas (){
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [points, setPoints] = useState<Point[]>([]);
	const [currentPoint, setCurrentPoint] = useState<Point | null>(null);

	const handleClick = (event: MouseEvent) => {
		const canvas = canvasRef.current;
		if (canvas) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			setPoints([...points, { x, y }]);
		}
	};

	console.log(points);

	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 2;

				points.forEach((point, index) => {
					ctx.beginPath();
					ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
					ctx.fill();

					ctx.font = "16px Arial";
					ctx.fillStyle = "#000";
					ctx.fillText(`${index + 1}`, point.x + 10, point.y - 10);
				});

				if (points.length > 1) {
					const start = points[0];
					const end = points[points.length - 1];
					const distance = Math.sqrt(
						Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
					);
					ctx.font = "20px Arial";
					ctx.fillStyle = "#000";
					ctx.fillText(`Distance: ${distance.toFixed(2)}`, 10, 25);
				}

				if (currentPoint) {
					ctx.beginPath();
					ctx.arc(currentPoint.x, currentPoint.y, 5, 0, 2 * Math.PI);
					ctx.fill();
				}
			}
		}
	}, [points]);


	return (
		<div>
			<canvas
				ref={canvasRef}
				width={window.innerWidth}
				height={window.innerHeight}
				onClick={handleClick}
			/>
		</div>
	);
}

const canvasStyle: React.CSSProperties = {
	minHeight: "100%",
	minWidth: "100%"
};
