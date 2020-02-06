import React from 'react';
import { SettingsContext } from '/src/context/settings-context';

export default function Header() {
  const { storage, cinema } = React.useContext(SettingsContext);
  return (
    <h1>
      {storage.name} {cinema.name}
    </h1>
  );
}
