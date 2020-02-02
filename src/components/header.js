import React from 'react';
import { CinemaContext } from '../context/cinema';
import { StorageContext } from '../context/storage';

export default function Header() {
  const { storage } = React.useContext(StorageContext);
  const { cinema } = React.useContext(CinemaContext);
  return (
    <h1>
      {storage.name} {cinema.name}
    </h1>
  );
}
