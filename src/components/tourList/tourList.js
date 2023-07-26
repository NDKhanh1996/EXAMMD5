import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BasicTable() {
    const [data, setData] = useState([]);
    const [apiDataVersion, setApiDataVersion] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/tuors')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [apiDataVersion]);
    console.log(data);

    const handleApiDataChange = () => {
        setApiDataVersion(prevVersion => prevVersion + 1);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/tour/${row.id}`}>{row.title}</Link>
                                </TableCell>
                                <TableCell align="center">{parseInt(row.price).toLocaleString()} VNĐ</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="outlined" color="error">
                                            <Link to={`/edit/${row.id}`}>EDIT</Link>
                                        </Button>
                                        <Button variant="outlined" color="error">
                                            <Link to={`/delete/${row.id}`}>DELETE</Link>
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="error">
                    <Link to={`/add`}>Add</Link>
                </Button>
            </Stack>
        </>
    );
}