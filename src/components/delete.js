import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function BasicTable() {
    const navigate = useNavigate();
    const { tourId } = useParams();
    const [tourData, setTourData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/tuors/${tourId}`)
            .then(response => response.json())
            .then(data => setTourData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleDelete = () => {
        fetch(`http://localhost:3000/tuors/${tourId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('Tour deleted successfully.');
                    navigate('/');
                } else {
                    console.error('Error deleting tour:', response.status);
                }
            })
            .catch(error => {
                console.error('Error deleting tour:', error);
            });
    };


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center" sx={{ width: '200px' }}>Price</TableCell>
                            <TableCell align="center">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{tourData.title}</TableCell>
                            <TableCell align="center">{parseInt(tourData.price).toLocaleString()} VNĐ</TableCell>
                            <TableCell align="left">{tourData.description}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="outlined" color="error" onClick={handleDelete}>
                DELETE
            </Button>
        </>
    );
}