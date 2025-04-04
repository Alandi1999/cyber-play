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
        <div style={styles.container}>
            <h2 style={styles.title}>Lista de Clientes</h2>

            <form onSubmit={manejarFiltro} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="orden" style={styles.label}>
                        Ordenar por DNI:
                    </label>
                    <select
                        id="orden"
                        style={styles.input}
                        onChange={(e) => setOrden(e.target.value)}
                    >
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="campo" style={styles.label}>
                        Filtrar por campo:
                    </label>
                    <select
                        id="campo"
                        value={campoFiltro}
                        onChange={(e) => setCampoFiltro(e.target.value)}
                        style={styles.input}
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="nombre">Nombre</option>
                        <option value="email">Email</option>
                        <option value="telefono">Teléfono</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="valor" style={styles.label}>
                        Valor:
                    </label>
                    <input
                        id="valor"
                        type="text"
                        value={valorFiltro}
                        onChange={(e) => setValorFiltro(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.button}>Filtrar</button>
                    <button type="button" style={styles.button} onClick={exportarCSV}>
                        Exportar a CSV
                    </button>
                    <button type="button" style={styles.button} onClick={exportarPDF}>
                        Exportar a PDF
                    </button>
                </div>
            </form>

            {mensaje && <p style={styles.message}>{mensaje}</p>}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>DNI</th>
                        <th style={styles.tableHeader}>Nombre</th>
                        <th style={styles.tableHeader}>Email</th>
                        <th style={styles.tableHeader}>Teléfono</th>
                        <th style={styles.tableHeader}>Puntaje</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.dni}>
                            <td style={styles.tableCell}>{cliente.dni}</td>
                            <td style={styles.tableCell}>{cliente.nombre}</td>
                            <td style={styles.tableCell}>{cliente.email || 'Sin Email'}</td>
                            <td style={styles.tableCell}>{cliente.telefono || 'Sin Teléfono'}</td>
                            <td style={styles.tableCell}>{cliente.puntaje}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Estilos Responsivos */}
            <style>
                {`
                @media (max-width: 430px) {
                    .formGroup, .buttonGroup {
                        flex-direction: column;
                        width: 100%;
                    }
                    .table {
                        font-size: 12px;
                    }
                }
                `}
            </style>
        </div>
    );
}

const styles = {
    container: { padding: '20px' },
    title: { fontSize: '1.5rem', marginBottom: '20px' },
    form: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' },
    formGroup: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
    label: { marginBottom: '5px', fontSize: '14px' },
    input: { padding: '10px', fontSize: '14px', width: '150px' },
    button: { padding: '10px', fontSize: '14px', margin: '5px' },
    table: { width: '100%', marginTop: '20px', borderCollapse: 'collapse' },
    tableHeader: { backgroundColor: '#616161', color: '#fff', padding: '10px' },
    tableCell: { padding: '10px', border: '1px solid #ddd' },
};

export default ListaClientes;