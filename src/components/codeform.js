import React from "react";

function CodeMessage(props) {
  const messages = props.messages;
  const html = messages.map(m => (
    <li dangerouslySetInnerHTML={{ __html: m }} />
  ));
  return <ul className="messages list-unstyled">{html}</ul>;
}

export default function CodeForm(props) {
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
