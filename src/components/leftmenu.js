import React, { useState } from "react";

function StorageMenuItem(props) {
  const storage = props.storage  
  return <li><a>{storage.name}</a></li>;
}

export function LeftMenu(props) {
  const [expanded, setExpanded] = useState(false);
  const items = props.storages.map(m => <StorageMenuItem storage={m} />);
  return (
    <section id="left-menu" className={expanded ? 'expanded' : ''}>
      <a href="#" onClick={() => setExpanded(!expanded)} className="icon" ></a>
      <ul class="content">
        {items}   
      </ul>  
    </section>
  );
}
