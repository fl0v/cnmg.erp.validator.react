import React, { useState } from "react";
import { ReactComponent as Img } from "/src/res/menu.svg";

function StorageMenuItem(props) {
  const storage = props.storage;
  const [storageId, setStorageId] = useState(storage.id);
  const selectStorage = (el) => setStorageId(el.dataset.id)
  const hash = '#storage-' + storageId;
  return (
    <li>
      <a href={hash} data-id={storageId} className="text-reset" onClick={(ev) => console.log(ev)}>{storage.name}</a>
    </li>
  );
}

export function LeftMenu(props) {  
  const [expanded, setExpanded] = useState(false);
  const items = props.storages.map((m) => <StorageMenuItem storage={m} />);
  let classNames = ['expandable'];
  classNames.push(expanded ? "expanded p-3" : 'm-3');
  return (
    <section id="left-menu" className={classNames.join(' ')}>
      <a href="#left-menu" onClick={() => setExpanded(!expanded)} className="icon">
        <Img />
      </a>
      <ul class="content list-unstyled">{items}</ul>
    </section>
  );  
}
