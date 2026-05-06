import { useState, useEffect, useRef } from "react";
import { Editor } from "@tiptap/core";
import katex from "katex";

interface EquationSelectorProps {
  editor: Editor;
}

const COMMON_EQUATIONS = [
  { label: "Fraction", latex: "\\frac{a}{b}" },
  { label: "Square Root", latex: "\\sqrt{x}" },
  { label: "Power", latex: "x^{n}" },
  { label: "Subscript", latex: "x_{i}" },
  { label: "Summation", latex: "\\sum_{i=1}^{n} x_i" },
  { label: "Integral", latex: "\\int_{a}^{b} f(x) \\, dx" },
  { label: "Limit", latex: "\\lim_{x \\to \\infty}" },
  { label: "Infinity", latex: "\\infty" },
  { label: "Pi", latex: "\\pi" },
  { label: "Alpha", latex: "\\alpha" },
  { label: "Beta", latex: "\\beta" },
  { label: "Delta", latex: "\\Delta" },
  { label: "Matrix 2x2", latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
];

export const EquationSelector = ({ editor }: EquationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [latexInput, setLatexInput] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Get selected text as default latex input
  useEffect(() => {
    if (isOpen && editor) {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to);
      if (selectedText) {
        setLatexInput(selectedText);
      }
    }
  }, [isOpen, editor]);

  // Live preview
  useEffect(() => {
    if (latexInput) {
      try {
        const html = katex.renderToString(latexInput, { throwOnError: false, displayMode: false });
        setPreviewHtml(html);
      } catch {
        setPreviewHtml(`<span style="color: #ef4444; font-size: 12px;">Invalid LaTeX</span>`);
      }
    } else {
      setPreviewHtml("");
    }
  }, [latexInput]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!editor) return null;

  const insertEquation = (latex: string) => {
    if (!latex.trim()) return;
    
    // Delete selected text first, then insert math node
    const { from, to } = editor.state.selection;
    if (from !== to) {
      editor.chain().focus().deleteRange({ from, to }).run();
    }
    
    editor.chain().focus().setMathInline({ latex }).run();
    setIsOpen(false);
    setLatexInput("");
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-1 p-2 rounded hover:bg-gray-100 transition-colors text-sm font-medium ${
          isOpen ? "bg-blue-50 text-blue-600" : "text-gray-600"
        }`}
        title="Insert Equation (LaTeX)"
      >
        <span className="text-base font-serif italic">Σ</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-80 bg-white border rounded-lg shadow-xl p-3 z-[70] animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
          <p className="text-[10px] uppercase text-gray-400 font-bold px-1 mb-2">
            Equation (LaTeX)
          </p>

          {/* LaTeX Input */}
          <input
            autoFocus
            type="text"
            placeholder="Type LaTeX... e.g. \frac{a}{b}"
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono bg-gray-50"
            value={latexInput}
            onChange={(e) => setLatexInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && latexInput) {
                e.preventDefault();
                insertEquation(latexInput);
              }
            }}
          />

          {/* Live Preview */}
          {previewHtml && (
            <div className="mt-2 p-3 bg-gray-50 border rounded-md min-h-[40px] flex items-center justify-center">
              <div
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                className="equation-preview"
              />
            </div>
          )}

          {/* Insert Button */}
          <button
            onClick={() => insertEquation(latexInput)}
            disabled={!latexInput.trim()}
            className="w-full mt-2 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Insert Equation
          </button>

          {/* Divider */}
          <div className="h-[1px] bg-gray-100 my-2" />

          {/* Common Equations */}
          <p className="text-[10px] uppercase text-gray-400 font-bold px-1 mb-1.5">
            Common Equations
          </p>
          <div className="max-h-[180px] overflow-y-auto space-y-0.5">
            {COMMON_EQUATIONS.map(({ label, latex }) => {
              let preview = "";
              try {
                preview = katex.renderToString(latex, { throwOnError: false, displayMode: false });
              } catch {
                preview = latex;
              }
              return (
                <button
                  key={label}
                  onClick={() => insertEquation(latex)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-sm hover:bg-blue-50 rounded transition-colors group"
                >
                  <span className="text-gray-600 group-hover:text-blue-600">{label}</span>
                  <span
                    className="text-xs"
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
