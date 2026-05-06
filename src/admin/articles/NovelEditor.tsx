import { useState } from "react";
import {
  EditorRoot,
  EditorContent,
  handleCommandNavigation,
  EditorBubble,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
} from "novel";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { AISelector } from "./AISelector";
import { NodeSelector } from "./NodeSelector";
import { ColorSelector } from "./ColorSelector";
import { EquationSelector } from "./EquationSelector";
import { Bold, Italic, Underline, Link as LinkIcon, Unlink, Strikethrough, Code } from "lucide-react";
import "katex/dist/katex.min.css";

const extensions = [...defaultExtensions, slashCommand];

interface NovelEditorProps {
  content: string;
  onChange: (content: string) => void;
  minHeight?: string;
}

export const NovelEditor = ({ content, onChange, minHeight = "300px" }: NovelEditorProps) => {
  const [editorInstance, setEditorInstance] = useState<any>(null);

  // Helper to get active command mode name
  const getActiveCommandMode = () => {
    if (!editorInstance) return "Text";
    if (editorInstance.isActive("heading", { level: 1 })) return "Heading 1";
    if (editorInstance.isActive("heading", { level: 2 })) return "Heading 2";
    if (editorInstance.isActive("heading", { level: 3 })) return "Heading 3";
    if (editorInstance.isActive("blockquote")) return "Quote";
    if (editorInstance.isActive("bulletList")) return "Bullet List";
    if (editorInstance.isActive("orderedList")) return "Numbered List";
    if (editorInstance.isActive("taskList")) return "To-do List";
    if (editorInstance.isActive("codeBlock")) return "Code Block";
    return "Text";
  };

  return (
    <div 
      className="relative w-full cursor-text border rounded-md overflow-hidden bg-white" 
      style={{ minHeight }}
      onClick={() => {
        if (editorInstance) {
          editorInstance.commands.focus();
        }
      }}
    >
      <EditorRoot>
        <EditorContent
          initialContent={undefined}
          extensions={extensions}
          className="h-full"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class: `prose prose-lg focus:outline-none max-w-full px-4 py-4`,
              style: `min-height: ${minHeight}`,
            },
          }}
          onUpdate={({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
            setEditorInstance(editor);
          }}
          onCreate={({ editor }) => {
            setTimeout(() => {
              setEditorInstance(editor);
              if (content && content.startsWith('<')) {
                editor.commands.setContent(content);
              }
            }, 0);
          }}
        >
          <EditorCommand className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-white px-1 py-2 shadow-md transition-all'>
            <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item: any) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 aria-selected:bg-gray-100 cursor-pointer`}
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-white'>
                    {item.icon && <item.icon size={18} />}
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-muted-foreground'>{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble className='flex w-fit max-w-[95vw] rounded-md border border-muted bg-white p-1 shadow-xl animate-in fade-in zoom-in duration-200 overflow-visible'>
             <div className="flex flex-row items-center flex-nowrap gap-0.5">
                <AISelector editor={editorInstance} />
                
                <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                
                <NodeSelector editor={editorInstance} />

                <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                
                <button 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    const url = window.prompt('Enter URL:');
                    if (url) {
                      editorInstance?.chain().focus().setLink({ href: url }).run();
                    }
                  }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('link') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Link"
                >
                  <LinkIcon size={16} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().unsetLink().run(); }}
                  className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-400"
                  title="Unlink"
                >
                  <Unlink size={16} />
                </button>

                <div className="w-[1px] h-4 bg-gray-200 mx-1" />

                <EquationSelector editor={editorInstance} />

                <div className="w-[1px] h-4 bg-gray-200 mx-1" />

                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleBold().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('bold') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Bold"
                >
                  <Bold size={16} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleItalic().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('italic') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Italic"
                >
                  <Italic size={16} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleUnderline().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('underline') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Underline"
                >
                  <Underline size={16} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleStrike().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('strike') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Strikethrough"
                >
                  <Strikethrough size={16} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleCode().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('code') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Code"
                >
                  <Code size={16} />
                </button>

                <div className="w-[1px] h-4 bg-gray-200 mx-1" />

                <ColorSelector editor={editorInstance} />
             </div>
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};
