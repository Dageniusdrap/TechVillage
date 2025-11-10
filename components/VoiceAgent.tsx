"use client";

import Script from "next/script";

export default function VoiceAgent() {
  const vapiToken = process.env.NEXT_PUBLIC_VAPI_PUBLIC_TOKEN;
  // Render Vapi widget if token provided, else no-op.
  if (!vapiToken) return null;
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest" strategy="afterInteractive" />
      <Script id="vapi-init" strategy="afterInteractive">
        {`
          window.vapi?.init({
            token: '${process.env.NEXT_PUBLIC_VAPI_PUBLIC_TOKEN}',
            // Optional config: theme, position, default agent, etc.
            position: 'bottom-right'
          });
        `}
      </Script>
    </>
  );
}
