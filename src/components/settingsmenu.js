import React, { useState } from "react";

import { ReactComponent as Img } from "/src/res/settings.svg";

export default function SettingsMenu(props) {
  const [expanded, setExpanded] = useState(false);
  let classNames = ["expandable"];
  classNames.push(expanded ? "expanded p-3" : "m-3");
  return (
    <section id="settings-menu" className={classNames.join(" ")}>
      <a
        href="#settings-menu"
        onClick={() => setExpanded(!expanded)}
        className="icon"
      >
        <Img />
      </a>
      <div className="content">Settings</div>
    </section>
  );
}
