import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import Paper from '@mui/material/Paper';
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const InformeUsuarios = () => {

    const [tableData, setTableData] = useState([]);

    const handleGetUsers = () => {
        fetch('http://localhost:3030/getUsers')
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    setTableData(response.data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener users:', error);
            });
    };

    // Llamar a handleGetUsers cuando se cargue el componente
    useEffect(() => {
        handleGetUsers();
    }, []);

    const columns = [
        { title: 'Nombre', field: 'nombre', headerStyle: { textAlign: 'center' }},
        { title: 'Login', field: 'login', headerStyle: { textAlign: 'center' }},
        { title: 'Password', field: 'password', headerStyle: { textAlign: 'center' }},
        { title: 'Rol', field: 'rol', align: 'center', headerStyle: { textAlign: 'center' }, width: '100'},
    ];
    

    return (
        <Paper elevation={1} style={{ padding: 10, margin: 60 }}>
            <MaterialTable
                columns={columns}
                data={tableData}
                title="Informe de Usuarios"
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
            />
        </Paper>
    );
};


export default InformeUsuarios;
