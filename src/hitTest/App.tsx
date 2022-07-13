import Konva from "konva";
import React, { useCallback, useEffect, useState } from "react";
import { Circle, Group, Layer, Line, Stage } from "react-konva";
import Vector2d from "./Vector2d";

const pointerRad = 10;
const startX = 10;
const startY = 150;
const rectWidth = 320;
const rectHeight = 180;
const initialPoints: Vector2d[] = [
  new Vector2d(startX, startY),
  new Vector2d(startX + rectWidth, startY),
  new Vector2d(startX + rectWidth, startY + 100),
];

/**
 * 点と直線の距離を返す関数
 *
 * @param point
 * @param startCoord
 * @param endCoord
 *
 * @return 点と直線の距離
 */
const distance = (
  point: Vector2d,
  startCoord: Vector2d,
  endCoord: Vector2d
): number => {
  const v = new Vector2d(endCoord.x - startCoord.x, endCoord.y - startCoord.y); // 線分
  const v1 = new Vector2d(point.x - startCoord.x, point.y - startCoord.y); // 線分の始点からマウスポジションを向くベクトル

  const d = Vector2d.cross(v.normalized, v1); // 線分と円の中心の最短距離
  return d;
};

// function collision_l2c(
//   circlePos: Vector2d,
//   circleR: number,
//   startCoord: Vector2d,
//   endCoord: Vector2d
// ): boolean {
//   const v = new Vector2d(endCoord.x - startCoord.x, endCoord.y - startCoord.y); // 線分
//   const v1 = new Vector2d(
//     circlePos.x - startCoord.x,
//     circlePos.y - startCoord.y
//   ); // 線分の始点からマウスポジションを向くベクトル

//   const d = Vector2d.cross(v.normalized, v1); // 線分と円の中心の最短距離

//   return Math.abs(d) < circleR;
// }

export default function App() {
  const lineRef = React.useRef<Konva.Line>(null);
  const circleRef = React.useRef<Konva.Circle>(null);

  const [shapePos, setShapePos] = useState<Vector2d>(new Vector2d(0, 0));

  const [coords, setCoords] = useState<Vector2d[]>(initialPoints);

  function onDragMove(e: Konva.KonvaEventObject<MouseEvent>) {
    const line = lineRef.current;
    const circle = circleRef.current;

    if (!line || !circle) {
      return;
    }

    let circlePos = new Vector2d(
      circle.absolutePosition().x,
      circle.absolutePosition().y
    );
    const d = distance(circlePos, coords[1], coords[0]);
    if (d < pointerRad) {
      const xV = //線分に直交するベクトル
        (circlePos = new Vector2d(circlePos.x, circlePos.y - (pointerRad - d)));

      circle.setPosition(circlePos);
    }
    setShapePos(circlePos);
  }

  return (
    <React.Fragment>
      <Stage width={window.innerWidth / 2} height={window.innerHeight / 2}>
        <Layer>
          <Group>
            <Circle
              x={100}
              y={50}
              radius={pointerRad}
              fill="red"
              draggable
              ref={circleRef}
              onDragMove={onDragMove}
            />

            <Line
              points={[coords[0].x, coords[0].y, coords[1].x, coords[1].y]}
              stroke="red"
              ref={lineRef}
            />
            <Line
              id="vec"
              points={[
                0 + coords[0].x,
                0 + coords[0].y,
                coords[1].y - coords[0].y + coords[0].x,
                -(coords[1].x - coords[0].x) + coords[0].y,
              ]}
              stroke="blue"
            />
          </Group>
        </Layer>
      </Stage>
    </React.Fragment>
  );
}
