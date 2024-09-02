/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';

const pokemonTypes = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting',
  'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost',
  'Dragon', 'Dark', 'Steel', 'Fairy'
];

function CustomDialog({ open, handleClose, onSave }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const handleSave = () => {
        if (name && type && height && weight) {
            onSave({ name, type, height, weight });
            handleClose();
            toast.success("Pokémon added successfully!");
        } else {
            toast.error("Please fill in all fields!");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add a Pokémon</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Pokémon Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    select
                    margin="dense"
                    id="type"
                    label="Pokémon Type"
                    fullWidth
                    variant="standard"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    {pokemonTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    id="height"
                    label="Height (meters)"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="weight"
                    label="Weight (kg)"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomDialog;

