import { ImageResponse } from "next/og";

import { HelmMark } from "@/components/brand/helm-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          color: "#7C6FF0",
        }}
      >
        <HelmMark size={120} />
      </div>
    ),
    { ...size }
  );
}
