import React from 'react';
import ClienteForm from './ClienteForm';
import EditarPuntaje from './EditarPuntajes';
import ClienteBusqueda from './BusquedaClientes';
import ListaClientes from './ListaClientes';

function App() {
  return (
    <div>
      <h1>Cyber Play</h1>
      <ClienteForm />
      <EditarPuntaje />
      <ClienteBusqueda />
      <ListaClientes />
    </div>
  );
}

export default App;