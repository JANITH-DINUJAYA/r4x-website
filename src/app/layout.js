import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "R4X SENSI | Premium Gaming Optimization & Device Tools",
  description: "Unleash maximum performance. Professional FPS boosting, sensitivity tuning, and network optimization tools for PC, iOS, and Android gaming.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}