import React from "react";
import Navbar from "../../components/Common/Navbar";

export default function MainCompLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
