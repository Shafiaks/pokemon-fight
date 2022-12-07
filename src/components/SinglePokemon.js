import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../styles.css'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectedPlayers from './SelectedPlayers';



function SinglePokemon({ DataJson }) {
    const { id } = useParams();
 



    let imgNum, imgUrl, randomNum;

    // array.find() -> takes a function and finds the first item in that array that matches
    const selectedPokemon = DataJson.find(element => element.id == id)
    console.log("selectedPokemon  ", selectedPokemon);

    const imageURL = (id) => {
        if (id < 10) imgNum = '00' + id;
        else if (id >= 10 && id < 100) imgNum = '0' + id;
        else imgNum = id;
        imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + imgNum + '.png'
        //console.log("img url is ",imgUrl);
        return imgUrl;
    };



    return (
        <div >
            {selectedPokemon ?
                <div className='card-component'>
                    <Card sx={{ maxWidth: 280 }} >
                        <CardMedia
                            component="img"
                            width="30"
                            image={imageURL(selectedPokemon.id)}
                            alt="pokemon"
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {selectedPokemon.name.english}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ul className='type-ul'>
                                {
                                    Object.keys(selectedPokemon.type).map(key => <button className='type-btn' id={selectedPokemon.id}>{selectedPokemon.type[key]}</button>)
                                }
                            </ul>
                        </CardActions>
                        <CardActions>
                            
                            <ul base-ul>
                            <h4> BASE </h4>
                                {
                                    Object.keys(selectedPokemon.base).map(key => <li id={selectedPokemon.id} className='base-li'> {key + " : " + selectedPokemon.base[key]}</li>)
                                }
                            </ul>
                        </CardActions>

                            <NavLink  className="select-btn navlink-class" to={`/pokemon/${selectedPokemon.id}/start-game`} >
                                <Button variant="contained" color="success" >
                                SELECT
                            </Button> 
                            </NavLink>

                        
                    </Card>
                </div>
                : "Loading ..."
            }
            {/* <Link to={`/pokemon/${id}/name`}>Go to detailed view</Link> */}
        </div>
    )
};


export default SinglePokemon
