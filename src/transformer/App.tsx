import Konva from "konva";
import React from "react";
import { Layer, Rect, Stage, Transformer } from "react-konva";

function Rectangle({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: {
  shapeProps: any;
  isSelected: boolean;
  onSelect: any;
  onChange: any;
}) {
  const shapeRef = React.useRef<Konva.Rect>(null!);
  const trRef = React.useRef<Konva.Transformer>(null!);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
}

const initialRectangles = [
  { x: 10, y: 10, width: 100, height: 100, fill: "red", id: "rect1" },
  { x: 150, y: 150, width: 100, height: 100, fill: "green", id: "rect2" },
];

export default function App() {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState("");

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape("");
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => (
          <Rectangle
            key={i}
            shapeProps={rect}
            isSelected={rect.id === selectedId}
            onSelect={() => {
              selectShape(rect.id);
            }}
            onChange={(newAttrs: any) => {
              const rects = rectangles.slice();
              rects[i] = newAttrs;
              setRectangles(rects);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
}
