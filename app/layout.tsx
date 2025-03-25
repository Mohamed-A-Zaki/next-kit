import { ThemeProvider } from "@/design-system/providers/theme-provider";
import { fonts } from "@/utils/fonts";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "next-kit",
    template: "%s | next-kit",
  },
  description: "z-code next-kit start template",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
