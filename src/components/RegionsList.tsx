import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import React, { useContext } from "react";
import { Sprite, UserStore } from "./App";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props: { key: string; id: string; children: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{props.children}</p>
    </div>
  );
};

const RegionsList = () => {
  const { sprites, setSprites } = useContext(UserStore);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over !== null && active.id !== over.id) {
      setSprites((sprites) => {
        const oldIndex = sprites
          .map((sprite) => sprite.id)
          .indexOf(active.id.toString());
        const newIndex = sprites
          .map((sprite) => sprite.id)
          .indexOf(over.id.toString());
        return arrayMove(sprites, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={sprites}>
        <div>
          <p>Component Left</p>
          {sprites.map((sprite: Sprite) => (
            <SortableItem key={sprite.id} id={sprite.id}>
              {sprite.displayName}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default RegionsList;
