import React from "react";
import Monthly from "./Monthly";
import Daily from "./Daily";
import Main from "./MainSvg";

export default function Home() {
  return (
    <div>
      <Main />
      <Monthly />
      <Daily />
    </div>
  );
}
