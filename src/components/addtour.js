import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function MultilineTextFields() {
    const [formData, setFormData] = React.useState({
        title: '',
        price: '',
        description: ''
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        fetch('http://localhost:3000/tuors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error creating tour:', error);
            });
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column', // Đặt chiều dọc
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="title"
                    label="Title"
                    multiline
                    maxRows={4}
                    variant="filled"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    id="price"
                    label="Price"
                    placeholder="Placeholder"
                    multiline
                    variant="filled"
                    value={formData.price}
                    onChange={handleChange}
                />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="error" onClick={handleSubmit}>
                    <Link to={`/`}>Submit</Link>
                </Button>
            </Stack>
        </Box>
    );
}
