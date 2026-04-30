// Netlify serverless function — proxies Instagram API
// Keeps INSTAGRAM_ACCESS_TOKEN secret on the server side.

export default async (request: Request) => {
  const token = Netlify.env.get("INSTAGRAM_ACCESS_TOKEN");
  const userId = Netlify.env.get("INSTAGRAM_USER_ID");

  if (!token || !userId) {
    return new Response(
      JSON.stringify({ error: "Instagram credentials not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }

  try {
    // Fetch the latest 12 posts (4 columns × 3 rows)
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${token}`;
    const response = await fetch(url);

    if (!response.ok) {
      const err = await response.text();
      return new Response(
        JSON.stringify({ error: "Instagram API error", details: err }),
        { status: response.status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Cache for 10 minutes to avoid rate limits
        "Cache-Control": "public, s-maxage=600, max-age=300",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch Instagram data" }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
};

export const config = {
  path: "/api/instagram",
};
