import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import '../styles.css'

function ShowResult({ DataJson }) {

    const [fightingPokemon, setFightingPokemon] = useState();
    const [showBase, setShowBase] = useState(false);
    const { id } = useParams();

    let imgNum, imgUrl, randomNum;
    const ShowBaseMore = showBase ? ' <<< ' : '>>> ';

    // user selected pokemon
    const selectedPokemon = DataJson.find(element => element.id == id)
 

    const imageURL = (id) => {
        if (id < 10) imgNum = '00' + id;
        else if (id >= 10 && id < 100) imgNum = '0' + id;
        else imgNum = id;
        imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + imgNum + '.png'
        //console.log("img url is ",imgUrl);
        return imgUrl;
    };


    useEffect(() => {
      
    }, [])

    //selectedPokemon && fightingPokemon

    return (
        <div >  {
            
                <div className='players-card-flex'>
                     winner is 
                </div>
           
        }

        </div>
    )
}

export default ShowResult
