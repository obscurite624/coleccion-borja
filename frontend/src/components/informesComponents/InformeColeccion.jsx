import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const InformeColeccion = () => {
    const [tableData, setTableData] = useState([]);

    const handleGetItem = () => {
        fetch('http://localhost:3030/getData')
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    setTableData(response.data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    };

    // Llamar a handleGetItem cuando se cargue el componente
    useEffect(() => {
        handleGetItem();
    }, []);

    const columns = [
        { title: 'Nombre', field: 'nombre', headerStyle: { textAlign: 'center' } },
        { title: 'Marca', field: 'marca', headerStyle: { textAlign: 'center' } },
        { title: 'Tipo', field: 'tipo', headerStyle: { textAlign: 'center' } },
        { title: 'Precio', field: 'precio', align: 'center', headerStyle: { textAlign: 'center' }, width: '100' },
    ];

    return (
        <Paper elevation={1} style={{ padding: 10, margin: 60 }}>
            <MaterialTable
                columns={columns}
                data={tableData}
                title="Informe de Colección"
                options={{
                    filtering: true,
                    columnsButton: true,
                    exportMenu: [
                        {
                            label: "Exportar a PDF",
                            exportFunc: (columns, tableData) => ExportPdf(columns, tableData, "InformeEnPDF"),
                        },
                        {
                            label: "Exportar a CSV",
                            exportFunc: (columns, tableData) => ExportCsv(columns, tableData, "InformeEnCSV"),
                        },
                    ],
                }}
                renderSummaryRow={({ column, data }) =>
                    column.field === "precio"
                        ? {
                            value: `Total: ${data.reduce((agg, row) => agg + row.precio, 0)} €`,
                            style: { background: "red" },
                        }
                        : undefined
                }
            />
        </Paper>
    );
};


export default InformeColeccion;
