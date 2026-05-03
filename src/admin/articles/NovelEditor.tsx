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

const extensions = [...defaultExtensions, slashCommand];

interface NovelEditorProps {
  content: string;
  onChange: (content: string) => void;
  minHeight?: string;
}

export const NovelEditor = ({ content, onChange, minHeight = "300px" }: NovelEditorProps) => {
  const [editorInstance, setEditorInstance] = useState<any>(null);

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
              class: `prose prose-lg focus:outline-none max-w-full px-2 py-2`,
              style: `min-height: ${minHeight}`,
            },
          }}
          onUpdate={({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
            setEditorInstance(editor);
          }}
          onCreate={({ editor }) => {
            setEditorInstance(editor);
            if (content && content.startsWith('<')) {
              editor.commands.setContent(content);
            }
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

          <EditorBubble className='flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-white p-1 shadow-xl animate-in fade-in zoom-in duration-200'>
             <div className="flex items-center gap-0.5">
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleBold().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('bold') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Bold"
                >
                  <span className="font-bold text-sm px-1">B</span>
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleItalic().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('italic') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Italic"
                >
                  <span className="italic text-sm px-1 font-serif">I</span>
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().toggleUnderline().run(); }}
                  className={`p-2 rounded hover:bg-gray-100 transition-colors ${editorInstance?.isActive('underline') ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  title="Underline"
                >
                  <span className="underline text-sm px-1">U</span>
                </button>
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
                  <span className="text-xs">Link</span>
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); editorInstance?.chain().focus().unsetLink().run(); }}
                  className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-400"
                  title="Unlink"
                >
                  <span className="text-[10px]">Unlink</span>
                </button>
             </div>
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};
