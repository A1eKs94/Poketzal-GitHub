import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';


                
const Icon = styled("img")(({
    width: "130px",
    height: "130px",
    objectFit: "contain",
    objectPosition: "center"
}));

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor:'#008316', border: "6px solid #C40000"}}>
        <Toolbar sx={{height:"80px", gap:"30px"}}>
            <Icon src='src/images/mxball.png' alt='Poke-Quetzal' sx={{height:100,display: {xs:'none', sm:'block'}}}></Icon>
            <Typography
                variant="h2"  
                
                style={{ display: 'block',fontFamily: 'OCR A Std, monospace', fontWeight:'bold'}}
            >
                Poketzal
            </Typography >
        </Toolbar>
      </AppBar>
    </Box>
  );
}
