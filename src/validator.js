import React from "react";
import { LeftMenu } from "./components/leftmenu";
import { SettingsMenu } from "./components/settingsmenu"
import "./res/validator.css";

let Settings = {
  title: "Validator",
  apiBaseUrl: "http://localhost",
  apiLicense: "my-license-1231231",
  storageId: 1
};

const StorageList = [
  {
    id: 1,
    name: "Depozit"
  },
  {
    id: 2,
    name: "Bar 1"
  }
];

const Cinema = {
  id: 123,
  code: "BUCMVX",
  name: "Movieplex"
};

function Header(props) {
  let storage = props.storage;
  return (
    <header>
      <h1>
        {storage && <span>{storage.name}</span>} {props.cinema.name}
      </h1>
    </header>
  );
}

function CodeMessage(props) {
  const messages = props.messages;
  const html = messages.map(m => (
    <li dangerouslySetInnerHTML={{ __html: m }} />
  ));
  return <ul class="messages list-unstyled">{html}</ul>;
}

function CodeForm(props) {
  const messages = ["<h2>mesaj 1</h2>", "<p>mesaj 2</p>"];

  return (
    <form className="code m-3">
      <CodeMessage messages={messages} />
      <div className="form-group fixed-bottom m-3 mx-auto">
        <input
          type="text"
          name="code"
          value={props.code}
          className="form-control text-center"
        />
        <button type="submit" className="btn btn-primary w-100">
          Validate
        </button>
      </div>
    </form>
  );
}

export default function Validator() {
  let storage = StorageList.find(storage => storage.id === Settings.storageId);
  return (
    <div id="validator">
      <Header cinema={Cinema} storage={storage} />      
      <CodeForm />
      <LeftMenu cinema={Cinema} storages={StorageList} settings={Settings} />
      <SettingsMenu settings={Settings} />
    </div>
  );
}
