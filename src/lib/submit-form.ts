/**
 * Endpoint penerima formulir (mis. Formspree, Web3Forms, HubSpot, atau API sendiri), dipakai bersama oleh
 * Book Demo dan Feature Request. Set di GitHub: Settings → Secrets and variables → Actions → Variables → FORM_ENDPOINT.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

/**
 * Kirim data formulir sebagai JSON via POST. `source` menandai asal formulir, mis. "repskill.ai/book-demo".
 * Mengembalikan `false` bila gagal, termasuk bila endpoint belum diatur (sengaja, agar lead tidak hilang diam-diam).
 */
export async function submitForm(source: string, values: Record<string, string>): Promise<boolean> {
  if (!FORM_ENDPOINT) {
    console.error(`${source}: NEXT_PUBLIC_FORM_ENDPOINT is not set, so the form was not sent.`);
    return false;
  }
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...values, source }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
