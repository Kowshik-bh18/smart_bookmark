
import './globals.css';

export const metadata = { title: "Smart Bookmark App" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-6 bg-gray-50">{children}</body>
    </html>
  );
}
