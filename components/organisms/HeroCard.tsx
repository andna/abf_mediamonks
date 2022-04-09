import React from "react";
import {Hero} from "../../types/Hero";
import {Card, Button, CardActions, CardContent, CardMedia, Typography} from "@mui/material";


type Props = {
    hero: Hero;
}
const HeroList: React.FC<Props> = ({hero }) => {
    return  <Card sx={{width: 375, marginBottom: 2}}>
        <CardMedia
            component="img"
            height="100"
            image={''}
            alt="survey img"
        />
        <CardContent>
            {hero.name}
        </CardContent>
        <CardActions>
            <Button variant="contained"
                sx={{marginLeft: "auto",}}
                >
                View Details
            </Button>
        </CardActions>
    </Card>
}

export default HeroList;