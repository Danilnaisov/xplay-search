import "./globals.css";
import { Header } from "./components/Header/Header";

export const metadata = {
  title: "Xplay Search",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
