import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { COMPANY } from "@/data/company";
import { BASE_THICKNESS_CM, PAYMENT_PROFILES } from "@/data/pricing";

export const alt = `${COMPANY.brand} - полусухая стяжка пола в Уфе`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori рисует текст только своим шрифтом, а кириллицу умеет не каждый.
 * Geist ExtraBold (OFL, woff) лежит в репозитории, чтобы сборка не зависела от сети.
 */
async function loadLogo(): Promise<string> {
  const buf = await readFile(path.join(process.cwd(), "public/logo-square.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

async function loadGeist(): Promise<ArrayBuffer> {
  const buf = await readFile(path.join(process.cwd(), "src/app/fonts/geist-800.woff"));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export default async function OgImage() {
  const [font, logo] = await Promise.all([loadGeist(), loadLogo()]);
  const rates = PAYMENT_PROFILES[0].rates;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#131617",
          color: "#fffbdb",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 720, paddingTop: 12 }}>
            <div style={{ display: "flex", fontSize: 26, color: "#a5a69d", letterSpacing: 2 }}>
              УФА · РЕСПУБЛИКА БАШКОРТОСТАН
            </div>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
              Полусухая стяжка пола в Уфе
            </div>
            <div style={{ display: "flex", fontSize: 32, color: "#a5a69d", lineHeight: 1.25 }}>
              Квартира от {rates.apartment} ₽/м² · дом от {rates.house} ₽/м² · при слое {BASE_THICKNESS_CM} см
            </div>
          </div>
          <img src={logo} width={340} height={246} alt="" style={{ width: 340, height: 246 }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a5a69d" }}>
          <div style={{ display: "flex" }}>Замер бесплатно · цена после замера не меняется</div>
          <div style={{ display: "flex", color: "#ef7f1a" }}>{COMPANY.phoneDisplay}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: font, weight: 800, style: "normal" }],
    },
  );
}
