import Konva from "konva";
import React, { useState } from "react";
import { Circle, Group, Layer, Line, Stage } from "react-konva";
import Vector2d from "./Vector2d";

const pointerRad = 5; // 画面上に登場する変形用のハンドル
const hitArea = 0.5; // 線分と当たり判定を行う円の半径
const startX = 10;
const startY = 10;
const rectWidth = 320;
const rectHeight = 180;
const initialPoints: Vector2d[] = [
  new Vector2d(startX, startY),
  new Vector2d(startX, startY + rectHeight),
  new Vector2d(startX + rectWidth, startY + rectHeight),
  new Vector2d(startX + rectWidth, startY),
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
  const [coords, setCoords] = useState<Vector2d[]>(initialPoints);
  const circleRefs = React.useRef<Konva.Circle[]>([]);

  function cornerDragging(idx: number) {
    const circle = circleRefs.current[idx];
    if (!circle) {
      return;
    }
    let circlePos = new Vector2d(
      circle.absolutePosition().x,
      circle.absolutePosition().y
    );

    let startCoord = coords[idx - 1 >= 0 ? idx - 1 : coords.length - 1];
    let endCoord = coords[idx + 1 < coords.length ? idx + 1 : 0];

    const d = distance(circlePos, startCoord, endCoord);
    if (d < hitArea) {
      circlePos.add(pushBack(startCoord, endCoord, hitArea - d));
    }
    setCoords((coords) =>
      coords.map((value, i) =>
        idx === i
          ? new Vector2d(
              circle.absolutePosition().x,
              circle.absolutePosition().y
            )
          : value
      )
    );

    circleRefs.current[idx].absolutePosition(circlePos);
  }

  return (
    <React.Fragment>
      <Stage width={window.innerWidth / 2} height={window.innerHeight / 2}>
        <Layer>
          <Group>
            <Line
              points={[
                coords[0].x,
                coords[0].y,
                coords[1].x,
                coords[1].y,
                coords[2].x,
                coords[2].y,
                coords[3].x,
                coords[3].y,
              ]}
              closed
              stroke="red"
            />
            {coords.map((point, i) => (
              <Circle
                key={i}
                x={point.x}
                y={point.y}
                radius={pointerRad}
                fill="white"
                stroke="red"
                strokeWidth={2}
                draggable
                onDragMove={(e) => {
                  cornerDragging(i);
                }}
                ref={(circle) => {
                  if (circle) circleRefs.current.push(circle);
                }}
              />
            ))}
          </Group>
        </Layer>
      </Stage>
    </React.Fragment>
  );
}
