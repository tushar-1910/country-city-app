import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch} from 'react-redux';
import { TextField } from '@mui/material';
import { getcity } from '../../Redux/City/action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal({item}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [enteredcity, setCity] = React.useState(item.city);
    const [enteredcountry, setCountry] = React.useState(item.country);
    const [enteredpopulation, setPopulation] = React.useState(item.population);
    const dispatch = useDispatch();
    const updateCity = async (e) => {
        e.preventDefault();
        try {
            await fetch(`https://country-city-app-tushar.herokuapp.com/cities/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: enteredcity,
                country: enteredcountry,
                population: enteredpopulation
            })
        })
        dispatch(getcity());
        handleClose();
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div>
            <Button onClick={handleOpen}>EDIT</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{textAlign:"center"}}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit City
                        </Typography>
                        <Box style={{display:'flex',gap:"10px",margin:"10px"}}>
                            <TextField id="standard-basic" label="Country" value={enteredcountry} onChange={(e)=>{setCountry(e.target.value)}} />
                            <TextField id="standard-basic" label="City" value={enteredcity} onChange={(e)=>{setCity(e.target.value)}} />
                            <TextField id="standard-basic" label="Population" value={enteredpopulation} onChange={(e)=>{setPopulation(e.target.value)}} />
                        </Box>
                        <Button onClick={(e)=>{handleClose();updateCity(e)}}>Update</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
