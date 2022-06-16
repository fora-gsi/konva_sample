import { ReactElement, useCallback, useState } from "react";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DraggableCard } from "./DraggableCard";
import { DndContext } from "@dnd-kit/core";

const items = ["1", "2", "3", "4", "5", "6", "7", "8"];
const contents = items.map((item) => ({
  id: item,
  content: <DraggableCard>{item.toString()}</DraggableCard>,
}));

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: ReactElement;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
const RegionsList = () => {
  const [state, setState] =
    useState<{ id: string; content: ReactElement }[]>(contents);
  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (over === null) return;
      if (active.id !== over.id) {
        const oldIndex = state
          .map((item) => {
            return item.id;
          })
          .indexOf(active.id);
        const newIndex = state
          .map((item) => {
            return item.id;
          })
          .indexOf(over.id);
        const newState = arrayMove(state, oldIndex, newIndex);
        setState(newState);
      }
    },
    [state]
  );
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={state}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {state.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {item.content}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default RegionsList;
