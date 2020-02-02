import React, { useState } from "react";
import { StorageContextConsumer } from "../context/storage";
import { ReactComponent as Img } from "/src/res/menu.svg";

function StorageMenuItem(props) {
  const { active, storage, setStorageId } = props;
  return (
    <li className={active && "active"}>
      <a href="#" className="text-reset" onClick={setStorageId}>
        {storage.name}
      </a>
    </li>
  );
}

export default function LeftMenu(props) {
  const [expanded, setExpanded] = useState(false);
  const onClick = e => setExpanded(!expanded);
  let classNames = ["expandable"];
  classNames.push(expanded ? "expanded p-3" : "m-3");
  return (
    <StorageContextConsumer>
      {context => (
        <section id="left-menu" className={classNames.join(" ")}>
          <a href="#left-menu" onClick={onClick} className="icon">
            <Img />
          </a>
          <ul className="content list-unstyled">
            {context.storageList.map(storage => (
              <StorageMenuItem
                storage={storage}
                setStorageId={() => context.setStorageId(storage.id)}
                active={storage.id === context.storage.id}
              />
            ))}
          </ul>
        </section>
      )}
    </StorageContextConsumer>
  );
}
