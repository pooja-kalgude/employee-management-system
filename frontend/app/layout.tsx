import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peopleboard — Employee Directory",
  description: "Manage your team and keep everyone’s details in one place.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
