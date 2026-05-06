import { useState } from "react";
import { Sparkles, Loader2, Languages } from "lucide-react";
import { Editor } from "@tiptap/core";
import toast from "react-hot-toast";

interface AISelectorProps {
  editor: Editor;
}

export const AISelector = ({ editor }: AISelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!editor) return null;

  const handleAIAction = async (prompt: string, action: string = "custom") => {
    const selection = editor.state.selection;
    const text = editor.state.doc.textBetween(selection.from, selection.to);
    
    if (!text && action !== "custom") {
      toast.error("Pilih teks terlebih dahulu");
      return;
    }

    setIsLoading(true);
    setIsOpen(false);
    
    try {
      const response = await fetch("/api/ai-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: action === "custom" ? prompt : "",
          selectedText: text,
          action: action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menghubungi AI");
      }

      if (data.result) {
        editor.chain().focus().insertContent(data.result).run();
        toast.success("Teks diperbarui oleh AI");
      }
    } catch (error: any) {
      console.error("AI Error:", error);
      toast.error(error.message || "Terjadi kesalahan pada AI");
    } finally {
      setIsLoading(false);
      setInputValue("");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`flex flex-row items-center whitespace-nowrap gap-1 p-2 rounded hover:bg-gray-100 transition-colors ${isOpen || isLoading ? 'bg-purple-50 text-purple-600' : 'text-purple-600'}`}
        disabled={isLoading}
        title="AI Actions"
      >
        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        <span className="text-sm font-medium">{isLoading ? 'AI Thinking...' : 'Ask AI'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white border rounded-md shadow-xl p-2 z-[70] animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            <input
              autoFocus
              type="text"
              placeholder="Tell AI what to do..."
              className="w-full px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue) {
                  handleAIAction(inputValue, "custom");
                }
              }}
            />
            
            <p className="text-[10px] uppercase text-gray-400 font-bold px-2 py-1">Quick Actions</p>
            
            <button
              onClick={() => handleAIAction("Improve writing", "improve")}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded transition-colors flex items-center gap-2"
            >
              <Sparkles size={14} className="text-purple-400" />
              Improve writing
            </button>
            <button
              onClick={() => handleAIAction("Fix grammar", "fix_grammar")}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded transition-colors flex items-center gap-2"
            >
              <Sparkles size={14} className="text-purple-400" />
              Fix grammar
            </button>
            <button
              onClick={() => handleAIAction("Make shorter", "shorter")}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded transition-colors flex items-center gap-2"
            >
              <Sparkles size={14} className="text-purple-400" />
              Make shorter
            </button>
            <button
              onClick={() => handleAIAction("Make longer", "longer")}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded transition-colors flex items-center gap-2"
            >
              <Sparkles size={14} className="text-purple-400" />
              Make longer
            </button>

            <div className="h-[1px] bg-gray-100 my-1" />
            <p className="text-[10px] uppercase text-gray-400 font-bold px-2 py-1">Translate</p>
            
            <button
              onClick={() => handleAIAction("Translate to Indonesia", "translate_id")}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded transition-colors flex items-center gap-2"
            >
              <Languages size={14} className="text-purple-400" />
              Translate to Indonesia
            </button>
            <button
              onClick={() => handleAIAction("Translate to English", "translate_en")}
              className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded transition-colors flex items-center gap-2"
            >
              <Languages size={14} className="text-purple-400" />
              Translate to English
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
