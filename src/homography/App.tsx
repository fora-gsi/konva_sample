import React, { useCallback, useEffect, useState } from "react";
import { Circle, Group, Layer, Line, Stage } from "react-konva";

type Vector = {
  x: number;
  y: number;
};

const pointerRad = 5;
const startX = 10;
const startY = 10;
const rectWidth = 320;
const rectHeight = 180;
const initialPoints: Vector[] = [
  { x: startX, y: startY },
  { x: startX + rectWidth, y: startY },
  { x: startX + rectWidth, y: startY + rectHeight },
  { x: startX, y: startY + rectHeight },
];

export default function App() {
  const [coords, setCoords] = useState<Vector[]>(initialPoints);
  const [angle, setAngle] = useState(0);

  const rad2deg = (rad: number) => rad * (180 / Math.PI);

  const handleAngleUpdate = useCallback(() => {
    const idx = 2;

    // 2つのベクトル（デカルト座標系）を定義
    const va: Vector = {
      x: coords[idx - 1].x - coords[idx].x,
      y: coords[idx - 1].y - coords[idx].y,
    };
    const vb: Vector = {
      x: coords[idx + 1].x - coords[idx].x,
      y: coords[idx + 1].y - coords[idx].y,
    };

    // ベクトルの内積をとる
    const dot = va.x * vb.x + va.y * vb.y;

    // ベクトルの長さ(極座標系で言う|a|や|b|)を計算
    const len_va = Math.sqrt(va.x * va.x + va.y * va.y);
    const len_vb = Math.sqrt(vb.x * vb.x + vb.y * vb.y);

    // dot = |a|*|b|cosθという公式を変形し
    // cosθ = dot/|a|*|b|としてcosθを導く
    const cosTheta = dot / (len_va * len_vb);

    // cosθから角度θを求めてstate変数angleにセットする
    const rad_theta = Math.acos(cosTheta);
    setAngle(rad2deg(rad_theta));
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
                      idx === i ? { x: e.target.x(), y: e.target.y() } : value
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
