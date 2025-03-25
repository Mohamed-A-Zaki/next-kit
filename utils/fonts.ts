import { Cairo, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["200", "300", "400", "600", "700", "900"],
  preload: true,
});

export const fonts = {
  roboto,
  cairo,
};
