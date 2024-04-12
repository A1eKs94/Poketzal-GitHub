import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Item({ initImg, initName, initDescription }) {
  const nameInUpperCase = initName.toUpperCase();

  return (
    <Card sx={{ backgroundColor: "#FCFFCA", display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "230px", height: "330px", border: "6px solid #9F8C00" }}>
      <CardActionArea sx={{ padding: "10px" }} onClick={() => console.log("TEST")}>
        <CardMedia
          component="img"
          sx={{ width: "100%", height: "220px", objectFit: 'contain', objectPosition: 'center', justifyContent: 'center', marginBottom: "10px" }}
          image={initImg}
          alt={initName}
        />
        <CardContent>
          <Typography textAlign="center" gutterBottom variant="h5" component="div" color="white" sx={{backgroundColor:"#9F8C00" ,display: 'flex', justifyContent: "center", border: "3px solid #675B00 "}}>
            {nameInUpperCase}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}