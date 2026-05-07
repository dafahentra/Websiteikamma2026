// Netlify Scheduled Function — Auto-refresh Instagram Long-lived Access Token
// Runs every 50 days via CRON to keep token from expiring (token lasts 60 days).
//
// Required Environment Variables (set di Netlify Dashboard):
//   INSTAGRAM_ACCESS_TOKEN  — Long-lived Instagram access token saat ini
//   NETLIFY_ACCESS_TOKEN    — Personal access token dari Netlify (untuk update env)
//   NETLIFY_SITE_ID         — Site ID dari Netlify Dashboard (Site Settings → General)

import type { Config } from "@netlify/functions";

export default async () => {
    const currentToken = Netlify.env.get("INSTAGRAM_ACCESS_TOKEN");
    const netlifyAccessToken = Netlify.env.get("NETLIFY_ACCESS_TOKEN");
    const siteId = Netlify.env.get("NETLIFY_SITE_ID");

    // ── 1. Validasi env variables ──────────────────────────────────────────────
    if (!currentToken || !netlifyAccessToken || !siteId) {
        console.error("[refresh-instagram-token] Missing required env variables.");
        return;
    }

    try {
        // ── 2. Refresh token via Instagram API ──────────────────────────────────
        console.log("[refresh-instagram-token] Memulai refresh token...");

        const refreshUrl = new URL("https://graph.instagram.com/refresh_access_token");
        refreshUrl.searchParams.set("grant_type", "ig_refresh_token");
        refreshUrl.searchParams.set("access_token", currentToken);

        const refreshResponse = await fetch(refreshUrl.toString());

        if (!refreshResponse.ok) {
            const errText = await refreshResponse.text();
            console.error("[refresh-instagram-token] Gagal refresh token:", errText);
            return;
        }

        const { access_token: newToken, expires_in } = await refreshResponse.json() as {
            access_token: string;
            token_type: string;
            expires_in: number;
        };

        const expiryDate = new Date(Date.now() + expires_in * 1000).toISOString();
        console.log(`[refresh-instagram-token] Token baru berhasil didapat. Expired: ${expiryDate}`);

        // ── 3. Update env variable INSTAGRAM_ACCESS_TOKEN via Netlify API ────────
        const netlifyApiUrl = `https://api.netlify.com/api/v1/sites/${siteId}/env/INSTAGRAM_ACCESS_TOKEN`;

        const updateResponse = await fetch(netlifyApiUrl, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${netlifyAccessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                value: newToken,
            }),
        });

        if (!updateResponse.ok) {
            const errText = await updateResponse.text();
            console.error("[refresh-instagram-token] Gagal update env di Netlify:", errText);
            return;
        }

        console.log("[refresh-instagram-token] ✅ Token berhasil diperbarui di Netlify env.");
        console.log(`[refresh-instagram-token] Token berikutnya expired pada: ${expiryDate}`);

    } catch (err) {
        console.error("[refresh-instagram-token] Unexpected error:", err);
    }
};

// Jalankan setiap 50 hari (bukan 60, untuk memberikan buffer waktu)
// Format: "0 0 */50 * *" = jam 00:00, setiap 50 hari
export const config: Config = {
    schedule: "0 0 1 */2 *", // Setiap 2 bulan sekali (tanggal 1, jam 00:00)
};