import { Editor } from "@tiptap/core";
import { 
  ChevronDown, 
  Text as TextIcon, 
  Heading1, 
  Heading2, 
  Heading3, 
  CheckSquare, 
  List, 
  ListOrdered, 
  Quote 
} from "lucide-react";
import { useState } from "react";

interface NodeSelectorProps {
  editor: Editor;
}

export const NodeSelector = ({ editor }: NodeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) return null;

  const items = [
    {
      name: "Text",
      icon: TextIcon,
      command: () => editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      isActive: () => editor.isActive("paragraph") && !editor.isActive("bulletList") && !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      name: "Bullet List",
      icon: List,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: Quote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
  ];

  const activeItem = items.find((item) => item.isActive()) || items[0];

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="flex flex-row items-center whitespace-nowrap gap-1 p-2 rounded hover:bg-gray-100 transition-colors text-gray-600 text-sm font-medium"
      >
        <span>{activeItem.name}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-48 bg-white border rounded-md shadow-xl p-1 z-[60] animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
          {items.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded transition-colors ${
                item.isActive() ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <item.icon size={16} />
                <span>{item.name}</span>
              </div>
              {item.isActive() && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
