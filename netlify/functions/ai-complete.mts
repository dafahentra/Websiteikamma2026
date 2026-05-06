import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = Netlify.env.get("GEMINI_API_KEY");
  
  if (!apiKey) {
    return new Response(
      JSON.stringify({ 
        error: "AI belum dikonfigurasi. Silakan tambahkan GEMINI_API_KEY di environment variables Netlify.",
        needsSetup: true,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { prompt, selectedText, action } = await req.json();

    // Build the system prompt based on action
    let systemPrompt = "Kamu adalah asisten editor artikel yang membantu menulis dan mengedit teks. Jawab dalam bahasa yang sama dengan teks yang diberikan. Berikan HANYA teks hasil, tanpa penjelasan tambahan.";
    
    let userPrompt = "";

    switch (action) {
      case "improve":
        userPrompt = `Perbaiki dan tingkatkan kualitas penulisan teks berikut agar lebih profesional, menarik, dan mudah dibaca. Pertahankan makna aslinya:\n\n"${selectedText}"`;
        break;
      case "fix_grammar":
        userPrompt = `Perbaiki kesalahan tata bahasa dan ejaan pada teks berikut. Berikan HANYA teks yang sudah diperbaiki:\n\n"${selectedText}"`;
        break;
      case "shorter":
        userPrompt = `Ringkas teks berikut menjadi lebih singkat dan padat, namun tetap mempertahankan poin-poin utamanya:\n\n"${selectedText}"`;
        break;
      case "longer":
        userPrompt = `Kembangkan teks berikut menjadi lebih detail dan elaboratif, tambahkan konteks dan penjelasan yang relevan:\n\n"${selectedText}"`;
        break;
      case "translate_id":
        userPrompt = `Terjemahkan teks berikut ke Bahasa Indonesia. Berikan HANYA terjemahannya:\n\n"${selectedText}"`;
        break;
      case "translate_en":
        userPrompt = `Translate the following text to English. Give ONLY the translation:\n\n"${selectedText}"`;
        break;
      case "custom":
        userPrompt = `${prompt}\n\nTeks yang dipilih:\n"${selectedText}"`;
        break;
      default:
        userPrompt = `${prompt || "Perbaiki teks berikut"}:\n\n"${selectedText}"`;
    }

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt + "\n\n" + userPrompt }
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Gemini API error:", errorBody);
      return new Response(
        JSON.stringify({ error: "Gagal menghubungi AI. Periksa API key Anda." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiResponse.json();
    const result = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean up the result - remove surrounding quotes if present
    const cleanResult = result.replace(/^["']|["']$/g, "").trim();

    return new Response(
      JSON.stringify({ result: cleanResult }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("AI function error:", error);
    return new Response(
      JSON.stringify({ error: `Terjadi kesalahan: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config: Config = {
  path: "/api/ai-complete",
};
