import React from 'react';
import { Button } from 'primereact/button';

export const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="mb-4 text-gray-600">Welcome to the enterprise application.</p>
        <Button label="PrimeReact Button" icon="pi pi-check" className="p-button-primary" />
      </div>
    </div>
  );
};
