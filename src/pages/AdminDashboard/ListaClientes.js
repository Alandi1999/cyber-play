import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { supabase } from '../../services/supabaseClient';

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [orden, setOrden] = useState('asc'); // Orden por defecto: ascendente
    const [campoFiltro, setCampoFiltro] = useState('');
    const [valorFiltro, setValorFiltro] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate(); // Hook para redirigir al dashboard

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
        const encabezados = ['DNI', 'Nombre', 'Email', 'Teléfono', 'Puntaje'];
        let csvContent = encabezados.join(',') + '\n';

        clientes.forEach((cliente) => {
            const fila = [
                cliente.dni,
                cliente.nombre,
                cliente.email,
                cliente.telefono,
                cliente.puntaje,
            ].join(',');
            csvContent += fila + '\n';
        });

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
        doc.text('Lista de Clientes', 14, 20);

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
            startY: 30,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 4,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [230, 230, 230],
            },
        });

        doc.save('clientes.pdf');
    };

    return (
        <div style={{ padding: '30px' }}>
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
                    <input
                        type="text"
                        value={valorFiltro}
                        onChange={(e) => setValorFiltro(e.target.value)}
                        required
                    />
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

            {/* Botón para volver al AdminDashboard */}
            <button
                onClick={() => navigate('/admin/dashboard')}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    color: '#fff',
                    backgroundColor: '#494949',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Volver al Panel de Administración
            </button>
        </div>
    );
}

export default ListaClientes;