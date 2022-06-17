import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

const items = ["pen", "pineapple", "apple", "pen"];
const contents = items.map((item, index) => ({
  id: index.toString(),
  content: item.toString(),
}));

function SortableItem(props: { key: string; id: string; children: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    borderRadius: 4,
    width: "150px",
    height: "150px",
    border: "1px solid black",
    backgroundColor: "white",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}

const DnDSample = () => {
  const [items, setItems] = useState(contents);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {items.map(({ id, content }: { id: string; content: string }) => (
            <SortableItem key={id} id={id}>
              {content}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over !== null && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items
          .map((item) => item.id)
          .indexOf(active.id.toString());
        const newIndex = items
          .map((item) => item.id)
          .indexOf(over.id.toString());
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};
export default DnDSample;
