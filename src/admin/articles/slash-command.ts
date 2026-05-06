import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  Youtube as YoutubeIcon,
  Twitter as TwitterIcon,
} from "lucide-react";
import { createSuggestionItems, Command } from "novel";
import { convertToWebP } from "../../lib/imageOptimization";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

export const suggestionItems = createSuggestionItems([
  {
    title: "Text",
    description: "Just start typing with plain text.",
    searchTerms: ["p", "paragraph"],
    icon: Text,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: CheckSquare,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: Heading1,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: Heading2,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: Heading3,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: List,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    searchTerms: ["ordered"],
    icon: ListOrdered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quotation.",
    searchTerms: ["blockquote"],
    icon: TextQuote,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock"],
    icon: Code,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Image",
    description: "Upload an image from your computer.",
    searchTerms: ["photo", "picture", "media"],
    icon: ImageIcon,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files?.length) {
          const file = input.files[0];
          const toastId = toast.loading("Mengoptimasi & mengupload gambar...");
          
          try {
            // Optimasi gambar menjadi WebP lebih ekstrim untuk inline article agar upload stabil
            const webpBlob = await convertToWebP(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.5 });
            const fileName = `content-${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
            
            console.log(`[Upload Image] Original size: ${(file.size / 1024).toFixed(2)} KB`);
            console.log(`[Upload Image] Optimized size: ${(webpBlob.size / 1024).toFixed(2)} KB`);
            
            // Konversi Blob menjadi File agar Supabase bisa membaca ukurannya dengan akurat
            const webpFile = new File([webpBlob], fileName, { type: 'image/webp' });
            
            // Upload ke storage Supabase
            const { error: uploadError } = await supabase.storage
              .from('article-images')
              .upload(fileName, webpFile, { contentType: 'image/webp', upsert: true });
              
            if (uploadError) throw uploadError;
            
            // Dapatkan URL publik dan masukkan ke editor
            const { data } = supabase.storage.from('article-images').getPublicUrl(fileName);
            editor.chain().focus().setImage({ src: data.publicUrl }).run();
            
            toast.success("Gambar berhasil ditambahkan", { id: toastId });
          } catch (err: any) {
            console.error("Image upload error:", err);
            toast.error(`Gagal memproses gambar: ${err.message || 'Unknown error'}`, { id: toastId });
          }
        }
      };
      input.click();
    },
  },
  {
    title: "Youtube",
    description: "Embed a Youtube video.",
    searchTerms: ["video", "youtube", "embed"],
    icon: YoutubeIcon,
    command: ({ editor, range }) => {
      const videoLink = prompt("Please enter Youtube URL");
      if (videoLink) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setYoutubeVideo({
            src: videoLink,
          })
          .run();
      }
    },
  },
  {
    title: "Twitter",
    description: "Embed a Tweet.",
    searchTerms: ["twitter", "tweet", "embed"],
    icon: TwitterIcon,
    command: ({ editor, range }) => {
      const tweetLink = prompt("Please enter Tweet URL");
      if (tweetLink) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setTweet({
            src: tweetLink,
          })
          .run();
      }
    },
  },
]);

import { renderItems } from "novel";

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    char: '/',
    command: ({ editor, range, props }) => {
      props.command({ editor, range });
    },
    render: renderItems,
  },
});
