import Konva from "konva";
import React, { useState } from "react";
import { Circle, Group, Layer, Line, Stage } from "react-konva";
import Vector2d from "./Vector2d";

const pointerRad = 10;
const startX = 50;
const startY = 50;
const rectWidth = 320;
const rectHeight = 180;
const initialPoints: Vector2d[] = [
  new Vector2d(startX, startY),
  new Vector2d(startX + rectWidth, startY + rectHeight),
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

const pushBack = (pa: Vector2d, pb: Vector2d, distance: number) => {
  const va = new Vector2d(pb.x - pa.x, pb.y - pa.y); // 点AからBを指すベクトル
  const vu = new Vector2d(-va.y, va.x).normalized.times(distance);

  return vu;
};

export default function App() {
  const lineRef = React.useRef<Konva.Line>(null);
  const circleRef = React.useRef<Konva.Circle>(null);

  const [coords] = useState<Vector2d[]>(initialPoints);

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
    const d = distance(circlePos, coords[0], coords[1]);
    if (d < pointerRad) {
      circlePos.add(pushBack(coords[0], coords[1], pointerRad - d));
    }
    circleRef.current.absolutePosition(circlePos);
  }

  return (
    <React.Fragment>
      <Stage width={window.innerWidth / 2} height={window.innerHeight / 2}>
        <Layer>
          <Group>
            <Circle
              x={150}
              y={230}
              radius={pointerRad}
              fill="red"
              draggable
              ref={circleRef}
              onDragMove={onDragMove}
            />

            <Line
              points={[coords[0].x, coords[0].y, coords[1].x, coords[1].y]}
              closed
              stroke="red"
              ref={lineRef}
            />
          </Group>
        </Layer>
      </Stage>
    </React.Fragment>
  );
}
