import Nav from "./components/Nav";
import "./globals.css";
import "../../styles/table.css";
import { Montserrat } from "next/font/google";
import { LoadingProvider } from "../../lib/LoadingProvider";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Podcast Music",
  description: "Frontend Podcast Prueba",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <Nav />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
