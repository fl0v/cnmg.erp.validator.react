import React, { useState } from "react";
import { ReactComponent as Img } from "/src/res/menu.svg";

function StorageMenuItem(props) {
  const storage = props.storage;
  const [storageId, setStorageId] = useState(false);
  const selectStorage = (el) => setStorageId(el.data.id)
  return (
    <li>
      <a href="#{storage.id}" className="text-reset" onClick={selectStorage}>{storage.name}</a>
    </li>
  );
}

export function LeftMenu(props) {  
  const [expanded, setExpanded] = useState(false);
  const items = props.storages.map((m) => <StorageMenuItem storage={m} />);
  return (
    <section id="left-menu" className={expanded ? "expanded p-3" : "m-3"}>
      <a href="#left-menu" onClick={() => setExpanded(!expanded)} className="icon">
        <Img />
      </a>
      <ul class="content list-unstyled">{items}</ul>
    </section>
  );  
}
