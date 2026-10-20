import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

const geistBold = readFile(
  path.join(process.cwd(), "src/app/og/Geist-Bold.otf"),
).then((font) => new Uint8Array(font).buffer);

export async function GET(request: Request) {
  const geistBoldData = await geistBold;

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "David Adarme";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundColor: "#171717",
          color: "#f5f5f5",
          height: "100%",
          width: "100%",
          fontSize: 100,
          fontFamily: '"Switzer"',
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title ? title : "David Adarme"}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: geistBoldData,
          style: "normal",
        },
      ],
    },
  );
}
