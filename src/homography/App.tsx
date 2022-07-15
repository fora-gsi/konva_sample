import Konva from "konva";
import React, { useState } from "react";
import { Circle, Group, Layer, Line, Rect, Stage } from "react-konva";
import Vector2d from "./Vector2d";

const pointerRad = 10; // 画面上に登場する変形用のハンドル
const hitArea = 0.5; // 線分と当たり判定を行う円の半径
const startX = 10;
const startY = 10;
const rectWidth = (window.innerWidth / 2) * 0.8;
const rectHeight = (window.innerHeight / 2) * 0.8;
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

const getPushBackVector = (pa: Vector2d, pb: Vector2d, distance: number) => {
  const va = new Vector2d(pb.x - pa.x, pb.y - pa.y); // 点AからBを指すベクトル
  const vu = new Vector2d(-va.y, va.x).normalized.times(distance);

  return vu;
};

export default function App() {
  const [coords, setCoords] = useState<Vector2d[]>(initialPoints);
  const circleRefs = React.useRef<Konva.Circle[]>([]);

  const getRingBufferIndex = (idx: number, delta: number, arrLen: number) => {
    let tmpIdx = idx + delta;

    if (tmpIdx < 0) {
      tmpIdx += arrLen;
    } else if (tmpIdx >= arrLen) {
      tmpIdx -= arrLen;
    }

    return tmpIdx;
  };

  const cornerDragging = (idx: number) => {
    const circle = circleRefs.current[idx];
    if (!circle) {
      return;
    }
    let circlePos = new Vector2d(
      circle.absolutePosition().x,
      circle.absolutePosition().y
    );

    /** 与えた円と直線で衝突判定を行い、衝突を解消した座標を返す関数
     *
     * @param {{pos: Vector2d, r:number}} circle 当たり判定を行う円 (中心座標 pos・円の半径 r)
     * @param {Vector2d} startCoord 当たり判定の直線が通る点１
     * @param {Vector2d} endCoord 当たり判定の直線が通る点２
     * @return 判定円が衝突を解消した座標。衝突していない場合、判定円の座標
     */
    const getPushBackPos = (
      circle: { pos: Vector2d; r: number },
      startCoord: Vector2d,
      endCoord: Vector2d
    ): Vector2d => {
      const d = distance(circle.pos, startCoord, endCoord);
      if (d < circle.r) {
        return circle.pos
          .clone()
          .add(getPushBackVector(startCoord, endCoord, hitArea - d));
      } else {
        return circle.pos.clone();
      }
    };

    /* チェック1: 対象の両隣を結んだ線分との当たり判定 */
    circlePos = getPushBackPos(
      { pos: circlePos, r: hitArea },
      coords[getRingBufferIndex(idx, -1, coords.length)],
      coords[getRingBufferIndex(idx, 1, coords.length)]
    );

    /* チェック2: 対象の隣とその先を結んだ線分との当たり判定 */
    circlePos = getPushBackPos(
      { pos: circlePos, r: hitArea },
      coords[getRingBufferIndex(idx, 2, coords.length)],
      coords[getRingBufferIndex(idx, 1, coords.length)]
    );

    /* チェック3: 対象の隣とその先を結んだ線分との当たり判定2 */
    circlePos = getPushBackPos(
      { pos: circlePos, r: hitArea },
      coords[getRingBufferIndex(idx, -1, coords.length)],
      coords[getRingBufferIndex(idx, -2, coords.length)]
    );

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
  };

  return (
    <React.Fragment>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            width={window.innerWidth}
            height={window.innerHeight}
            fill="#f0f0f0"
          />
        </Layer>

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
