import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'
import { supabase } from './supabaseClient';

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [orden, setOrden] = useState('asc'); // Orden por defecto: ascendente
    const [campoFiltro, setCampoFiltro] = useState('');
    const [valorFiltro, setValorFiltro] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchClientes = async () => {
            const { data, error } = await supabase
                .from('clientes')
                .select('*')
                .order('dni', { ascending: orden === 'asc' }); // Ordena por DNI

            if (error) {
                console.error('Error al obtener clientes:', error);
                setMensaje('Error al obtener clientes.');
            } else {
                setClientes(data);
            }
        };

        fetchClientes();
    }, [orden]); // Vuelve a obtener clientes cuando cambie el orden

    const manejarFiltro = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('clientes')
            .select('*')
            .ilike(campoFiltro, `%${valorFiltro}%`); // Coincidencia parcial e insensible a mayúsculas


        if (error) {
            console.error('Error al filtrar clientes:', error);
            setMensaje('Error al filtrar clientes.');
        } else {
            setClientes(data);
            setMensaje('');
        }
    };

    const exportarCSV = () => {
        // Encabezados de la tabla
        const encabezados = ['DNI', 'Nombre', 'Email', 'Teléfono', 'Puntaje'];
      
        // Crear contenido del CSV con encabezados
        let csvContent = encabezados.join(',') + '\n';
      
        // Añadir datos de los clientes como filas
        clientes.forEach((cliente) => {
          const fila = [
            cliente.dni,            // Columna 1: DNI
            cliente.nombre,         // Columna 2: Nombre
            cliente.email,          // Columna 3: Email
            cliente.telefono,       // Columna 4: Teléfono
            cliente.puntaje         // Columna 5: Puntaje
          ].join(','); // Cada valor separado por coma
          csvContent += fila + '\n';
        });
      
        // Crear el archivo y descargarlo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'clientes.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
      

      const exportarPDF = () => {
        const doc = new jsPDF();
      
        // Título del documento
        doc.text('Lista de Clientes', 14, 20);
      
        // Generar tabla
        const encabezados = ['DNI', 'Nombre', 'Email', 'Teléfono', 'Puntaje'];
        const filas = clientes.map((cliente) => [
          cliente.dni,
          cliente.nombre,
          cliente.email,
          cliente.telefono,
          cliente.puntaje,
        ]);
      
        autoTable(doc, {
          head: [encabezados],
          body: filas,
          startY: 30, // Posición inicial de la tabla
          theme: 'grid', // Estilo de la tabla
          styles: {
            fontSize: 10, // Tamaño de la fuente
            cellPadding: 4, // Espaciado dentro de las celdas
          },
          headStyles: {
            fillColor: [41, 128, 185], // Color de fondo de los encabezados
            textColor: [255, 255, 255], // Color del texto en los encabezados
            fontStyle: 'bold',
          },
          alternateRowStyles: {
            fillColor: [230, 230, 230], // Color alternativo para las filas
          },
        });
      
        // Guardar PDF
        doc.save('clientes.pdf');
      };
      
      
    return (
        <div>
            <h2>Lista de Clientes</h2>

            <div>
                <label>Ordenar por DNI:</label>
                <button onClick={() => setOrden('asc')}>Ascendente</button>
                <button onClick={() => setOrden('desc')}>Descendente</button>
            </div>

            <form onSubmit={manejarFiltro}>
                <label>
                    Filtrar por campo:
                    <select value={campoFiltro} onChange={(e) => setCampoFiltro(e.target.value)} required>
                        <option value="">Seleccionar...</option>
                        <option value="nombre">Nombre</option>
                        <option value="email">Email</option>
                        <option value="telefono">Teléfono</option>
                    </select>
                </label>
                <label>
                    Valor:
                    <input type="text" value={valorFiltro} onChange={(e) => setValorFiltro(e.target.value)} required />
                </label>
                <button type="submit">Filtrar</button>
                <button onClick={exportarCSV}>Exportar a CSV</button>
                <button onClick={exportarPDF}>Exportar a PDF</button>

            </form>

            {mensaje && <p>{mensaje}</p>}

            <table border="1">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Puntaje</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.dni}>
                            <td>{cliente.dni}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.puntaje}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaClientes;
