/**
 * Penerima formulir, dipakai bersama oleh Book Demo dan Feature Request.
 *
 * Default: Web3Forms meneruskan setiap kiriman ke email yang didaftarkan saat membuat access key (dashboard di
 * web3forms.com). Access key ini memang publik (aman ditaruh di kode client). Ganti lewat GitHub: Settings → Secrets and
 * variables → Actions → Variables → WEB3FORMS_KEY, atau pakai endpoint lain sepenuhnya lewat FORM_ENDPOINT
 * (mis. Formspree, HubSpot, atau API sendiri; menerima JSON via POST).
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "af132429-1542-4576-97a5-0a8b480d4ccd";
const CUSTOM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

/**
 * Kirim data formulir sebagai JSON via POST. `source` menandai asal formulir, mis. "repskill.ai/book-demo"; `subject`
 * menjadi judul email dan `replyTo` membuat tombol Reply di email langsung ke pengirim. Mengembalikan `false` bila
 * gagal, agar lead tidak hilang diam-diam.
 */
export async function submitForm(
  source: string,
  values: Record<string, string>,
  options: { subject?: string; replyTo?: string } = {},
): Promise<boolean> {
  const body = CUSTOM_ENDPOINT
    ? { ...values, source }
    : {
        access_key: WEB3FORMS_KEY,
        subject: options.subject ?? `New submission from ${source}`,
        from_name: "Repskill Website",
        ...(options.replyTo && { replyto: options.replyTo }),
        ...values,
        source,
      };
  try {
    // Web3Forms: kirim sebagai FormData (seperti <form> biasa) supaya tidak ada preflight CORS yang ditolak
    const res = CUSTOM_ENDPOINT
      ? await fetch(CUSTOM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(body),
        })
      : await fetch("https://api.web3forms.com/submit", { method: "POST", body: toFormData(body) });
    if (!res.ok) return false;
    // Web3Forms membalas `success: false` bila kiriman ditolak
    if (!CUSTOM_ENDPOINT) {
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      return data.success === true;
    }
    return true;
  } catch {
    return false;
  }
}

function toFormData(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.append(key, value);
  return data;
}
