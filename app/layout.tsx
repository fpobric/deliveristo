"use client";
import "./globals.css";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeSegment = useSelectedLayoutSegment();

  const links = [
    { label: "Images by breed", path: "/", targetSegment: null },
    {
      label: "Images by sub breed",
      path: "/sub-breed-image",
      targetSegment: "breed image",
    },
  ];

  return (
    <html lang="en">
      <body className={`app-body`}>
        <div className={`sidebar`}>
          {links.map((l, i) => {
            return (
              <Link
                key={i}
                href={l.path}
                style={{
                  textDecoration:
                    activeSegment === l.targetSegment ? "underline" : "none",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="content">{children}</div>
      </body>
    </html>
  );
}
