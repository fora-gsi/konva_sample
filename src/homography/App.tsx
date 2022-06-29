import React, { useCallback, useEffect, useState } from "react";
import { Circle, Group, Layer, Line, Stage } from "react-konva";
import Vector2d from "./Vector2d";

const pointerRad = 5;
const startX = 10;
const startY = 10;
const rectWidth = 320;
const rectHeight = 180;
const initialPoints: Vector2d[] = [
  new Vector2d(startX, startY),
  new Vector2d(startX + rectWidth, startY),
  new Vector2d(startX + rectWidth, startY + rectHeight),
  new Vector2d(startX, startY + rectHeight),
];

/**
 * 座標A,B,Cを入力し、∠ABCのなす角度をラジアンで返す。
 * 座標ABCは反時計回りで入力すること。
 *
 * @param a 座標A
 * @param b 座標B
 * @param c 座標C
 * @returns ∠ABCの成す角度
 */
const calcAngle = (a: Vector2d, b: Vector2d, c: Vector2d): number => {
  const va: Vector2d = Vector2d.sub(a, b);
  const vb: Vector2d = Vector2d.sub(c, b);

  // ベクトルの内積をとる
  const dot = Vector2d.dot(va, vb);
  // ベクトルの長さ(極座標系で言う|a|や|b|)を計算
  const len_va = va.magnitude;
  const len_vb = vb.magnitude;

  // dot = |a|*|b|cosθという公式を変形し
  // cosθ = dot/|a|*|b|としてcosθを導く
  const cosTheta = dot / (len_va * len_vb);

  // cosθから角度θを求める
  const theta = Math.acos(cosTheta);

  // ベクトルの外積をとる
  const cross = Vector2d.cross(va, vb);

  // 外積のz成分が0未満なら角は入隅である
  if (cross < 0) {
    return 2 * Math.PI - theta;
  } else {
    return theta;
  }
};

export default function App() {
  const [coords, setCoords] = useState<Vector2d[]>(initialPoints);
  const [angle, setAngle] = useState(0);

  const rad2deg = (rad: number) => rad * (180 / Math.PI);

  const handleAngleUpdate = useCallback(() => {
    const tmpAngle = rad2deg(
      calcAngle(coords[3].clone(), coords[2].clone(), coords[1].clone())
    );
    setAngle(tmpAngle);
  }, [coords]);

  useEffect(() => {
    handleAngleUpdate();
  }, [coords, handleAngleUpdate]);

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
                  setCoords((coords) =>
                    coords.map((value, idx) =>
                      idx === i
                        ? new Vector2d(e.target.x(), e.target.y())
                        : value
                    )
                  );
                }}
              />
            ))}
          </Group>
        </Layer>
      </Stage>
      <div id="pAngle3">右下の角度：{Math.round(angle * 100) / 100}°</div>
    </React.Fragment>
  );
}
