import React, { MouseEvent, useContext } from "react";
import Konva from "konva";
import {
  Group,
  Image,
  Layer,
  Rect,
  Stage,
  Text,
  Transformer,
} from "react-konva";
import { Sprite, UserStore } from "./App";
import useImage from "use-image";

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
  const textRef = React.useRef<Konva.Text>(null!);
  const trRef = React.useRef<Konva.Transformer>(null!);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current, textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Group draggable onClick={onSelect} onTap={onSelect}>
        <Rect
          ref={shapeRef}
          {...shapeProps}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
        <Text
          ref={textRef}
          {...shapeProps}
          fill="black"
          text={shapeProps.displayName}
          fontSize={18}
          fontFamily="Arial"
          align="center"
          verticalAlign="middle"
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
      </Group>
    </React.Fragment>
  );
}

const Canvas = () => {
  const { latestId, setLatestId, sprites, setSprites } = useContext(UserStore);
  const [selectedId, selectShape] = React.useState("");

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const newSprite: Sprite = {
      id: (latestId + 1).toString(),
      x: Math.random() * (500 - 160),
      y: Math.random() * (500 - 90),
      width: 160,
      height: 90,
      fill: Konva.Util.getRandomColor(),
      displayName: `Sprite #${latestId}`,
    };
    setLatestId(latestId + 1);
    setSprites(sprites.concat(newSprite));
  };

  const checkDeselect = (e: any) => {
    selectShape("");
  };

  const [image] = useImage("https://source.unsplash.com/6gWUg6bIyow");

  return (
    <React.Fragment>
      <Stage width={800} height={600}>
        <Layer opacity={0.9} style={{ border: "1px solid black" }}>
          <Image
            image={image}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          />
          {sprites.map((sprite, i) => (
            <Rectangle
              shapeProps={sprite}
              isSelected={sprite.id === selectedId}
              onSelect={() => {
                selectShape(sprite.id);
              }}
              onChange={(newAttrs: any) => {
                const rects = sprites.slice();
                rects[i] = newAttrs;
                setSprites(rects);
              }}
              key={sprite.id}
            />
          ))}
        </Layer>
      </Stage>
      <button onClick={handleButtonClick}>Add Sprite</button>
    </React.Fragment>
  );
};

export default Canvas;
