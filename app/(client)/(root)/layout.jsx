/** @format */

import { Header } from "@/common/components/index";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header className="mb-6 px-10 py-8" />
      {children}
    </div>
  );
}
