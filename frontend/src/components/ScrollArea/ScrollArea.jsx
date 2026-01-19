import "./ScrollArea.css";

export default function ScrollArea({
  children,
  className = "",
  horizontal = false,
}) {
  return (
    <div
      className={`mOS-scrollArea ${horizontal ? "mOS-scrollArea--x" : "mOS-scrollArea--y"} ${className}`}
    >
      {children}
    </div>
  );
}
