import React from 'react';
import { SettingsContext } from '/src/context/settings-context';

export default function Header() {
  const { storage, cinema } = React.useContext(SettingsContext);
  return (
    <h4 className="header m-3">
      {cinema.name && cinema.name} {storage.name && storage.name}
    </h4>
  );
}
