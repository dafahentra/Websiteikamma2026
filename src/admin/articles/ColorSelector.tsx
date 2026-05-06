import { Editor } from "@tiptap/core";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

interface ColorSelectorProps {
  editor: Editor;
}

const TEXT_COLORS = [
  { name: "Default", color: "var(--novel-black)", label: "Default" },
  { name: "Gray", color: "#6b7280", label: "Gray" },
  { name: "Orange", color: "#f97316", label: "Orange" },
  { name: "Yellow", color: "#eab308", label: "Yellow" },
  { name: "Green", color: "#22c55e", label: "Green" },
  { name: "Blue", color: "#3b82f6", label: "Blue" },
  { name: "Purple", color: "#a855f7", label: "Purple" },
  { name: "Pink", color: "#ec4899", label: "Pink" },
  { name: "Red", color: "#ef4444", label: "Red" },
];

const HIGHLIGHT_COLORS = [
  { name: "Default", color: "transparent", label: "None" },
  { name: "Gray", color: "#f3f4f6", label: "Gray" },
  { name: "Orange", color: "#ffedd5", label: "Orange" },
  { name: "Yellow", color: "#fef9c3", label: "Yellow" },
  { name: "Green", color: "#dcfce7", label: "Green" },
  { name: "Blue", color: "#dbeafe", label: "Blue" },
  { name: "Purple", color: "#f3e8ff", label: "Purple" },
  { name: "Pink", color: "#fce7f3", label: "Pink" },
  { name: "Red", color: "#fee2e2", label: "Red" },
];

export const ColorSelector = ({ editor }: ColorSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) return null;

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1 p-2 rounded hover:bg-gray-100 transition-colors text-gray-600"
      >
        <span className="text-sm font-medium border-b-2 border-black">A</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-48 bg-white border rounded-md shadow-xl p-2 z-[60] animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] uppercase text-gray-400 font-bold px-2 py-1">Color</p>
            {TEXT_COLORS.map(({ name, color, label }) => (
              <button
                key={name}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-2 py-1.5 text-sm hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: color }} />
                  <span>{label}</span>
                </div>
                {editor.isActive("textStyle", { color }) && <Check size={14} className="text-blue-600" />}
              </button>
            ))}
            
            <div className="h-[1px] bg-gray-100 my-1" />
            
            <p className="text-[10px] uppercase text-gray-400 font-bold px-2 py-1">Background</p>
            {HIGHLIGHT_COLORS.map(({ name, color, label }) => (
              <button
                key={name}
                onClick={() => {
                  editor.chain().focus().setHighlight({ color }).run();
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-2 py-1.5 text-sm hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: color }} />
                  <span>{label}</span>
                </div>
                {editor.isActive("highlight", { color }) && <Check size={14} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
