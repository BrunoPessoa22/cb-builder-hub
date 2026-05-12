import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Dashboard interno — restrito.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    "max-snippet": 0,
    "max-image-preview": "none",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
