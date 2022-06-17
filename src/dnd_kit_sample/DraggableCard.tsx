export function DraggableCard({ children }: { children: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 4,
        borderRadius: 4,
        width: "150px",
        height: "150px",
        border: "1px solid black",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
}
