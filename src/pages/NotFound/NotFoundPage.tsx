import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-6xl font-bold text-slate-800 mb-4">404</h2>
      <p className="text-xl text-slate-600 mb-8">Page not found</p>
      <Link to="/">
        <Button label="Go back home" icon="pi pi-home" />
      </Link>
    </div>
  );
};
