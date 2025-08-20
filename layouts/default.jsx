import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { Manrope as ManropeFont } from "next/font/google"; // rename import

const manrope = ManropeFont({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-manrope", // correct variable name
});

export default function DefaultLayout({ children }) {
  return (
    <div className={manrope.className}>
      <HeroUIProvider>
        <main>{children}</main>
      </HeroUIProvider>
    </div>
  );
}
