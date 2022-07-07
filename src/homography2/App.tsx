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
  new Vector2d(startX, startY + rectHeight),
  new Vector2d(startX + rectWidth, startY + rectHeight),
  new Vector2d(startX + rectWidth, startY),
];

export default function App() {
  const [coords, setCoords] = useState<Vector2d[]>(initialPoints);
  const [dpx, setdpx] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    // const dpx = coords.map((v, i, coords) => {
    //   const sv = coords[i - 1 >= 0 ? i - 1 : coords.length - 1]; // 線分の始点
    //   const v1 = Vector2d.sub(coords.slice(i, i + 1)[0], sv); //線分の始点から円の中心
    //   const v2 = Vector2d.sub(coords.slice(i + 1, i + 2)[0], sv); //線分の始点から終点
    //   return Vector2d.cross(v2.normalized, v1);
    //   // return 0;
    // });
    // const v2_1 = Vector2d.sub(coords[1], coords[0]); //線分の始点から円の中心
    // const v2_2 = Vector2d.sub(coords[2], coords[0]); //線分の始点から終点
    // const dpx2 = Vector2d.cross(v2_2.normalized, v2_1);
    // const v3_1 = Vector2d.sub(coords[2], coords[1]); //線分の始点から円の中心
    // const v3_2 = Vector2d.sub(coords[3], coords[1]); //線分の始点から終点
    // const dpx3 = Vector2d.cross(v3_2.normalized, v3_1);
    // const v4_1 = Vector2d.sub(coords[3], coords[2]); //線分の始点から円の中心
    // const v4_2 = Vector2d.sub(coords[0], coords[2]); //線分の始点から終点
    // const dpx4 = Vector2d.cross(v4_2.normalized, v4_1);
    //
    // setdpx(dpx);
  }, [coords]);

  function collision(): boolean {
    // /*
    //  Check1
    //  隣の頂点同士を結んだ線分を超えていないかチェック
    // */
    // const v1 = Vector2d.sub(coords[3], coords[0]); //線分の始点から円の中心
    // const v2 = Vector2d.sub(coords[1], coords[0]); //線分の始点から終点

    // console.log(Math.abs(Math.floor(Vector2d.cross(v2.normalized, v1))));

    return true;
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
            <Line
              points={[coords[1].x, coords[1].y, coords[3].x, coords[3].y]}
              closed
              dash={[6, 3]}
              stroke="blue"
              strokeWidth={1}
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
                  const moveTo = new Vector2d(e.target.x(), e.target.y());

                  setCoords((coords) =>
                    coords.map((value, idx, coords) => {
                      if (idx !== i) {
                        return value;
                      } else if (collision()) {
                        e.target.stopDrag();
                        e.target.x(value.x);
                        e.target.y(value.y);
                        return value;
                      } else {
                        return moveTo;
                      }
                    })
                  );
                }}
              />
            ))}
          </Group>
        </Layer>
      </Stage>
      {/* <div>dX1: {dpx[0]}</div>
      <div>dX2: {dpx[1]}</div>
      <div>dX3: {dpx[2]}</div>
      <div>dX4: {dpx[3]}</div> */}
      {/* <div id="pAngle3">右下の角度：{Math.round(angle * 100) / 100}°</div> */}
    </React.Fragment>
  );
}
