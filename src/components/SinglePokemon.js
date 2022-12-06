import { React, useState } from 'react';
import {useParams } from 'react-router-dom';
import '../styles.css'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function SinglePokemon({ DataJson }) {
    const { id } = useParams();
    const [showBase, setShowBase] = useState(false);
    const [showType, setShowType] = useState(false);

    const ShowBaseMore = showBase ? ' <<< ' : '>>> ';
    const ShowTypeMore = showType ? ' << ' : '  >> ';
    let imgNum,imgUrl;

    // array.find() -> takes a function and finds the first item in that array that matches
    const selectedPokemon = DataJson.find(element => element.id == id)
    console.log("selectedPokemon  ", selectedPokemon);
    
     const imageURL = ()=>{
        if(selectedPokemon.id<10 ) imgNum='00'+selectedPokemon.id;
        else if(selectedPokemon.id>=10 && selectedPokemon.id < 100) imgNum='0'+selectedPokemon.id;
        else imgNum=selectedPokemon.id;
        imgUrl='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+imgNum+'.png'
         //console.log("img url is ",imgUrl);
         return imgUrl;
     };
     
  
     
 
    return (
        <div className='card-component'>
            {  selectedPokemon ?
                <Card sx={{ maxWidth: 375 }} className='single-card'>
                    <CardMedia
                        component="img"
                         width="100"
                        image={imageURL()} 
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
                        <Button size="small" onClick={() =>{setShowBase(prev => !prev)}}> Base :  {ShowBaseMore} </Button>
                          <ul className='base-ul'>
                                { showBase &&
                                Object.keys(selectedPokemon.base).map(key => <li  id={selectedPokemon.id} className='base-li'> {key + " : " + selectedPokemon.base[key]}</li>) 
                              }
                            </ul>
                    </CardActions>
                    {/* <CardActions>
                        <Button size="small" onClick={() =>{setShowType(prev => !prev)}}> TYPE :  {ShowTypeMore} </Button>
                          <ul>
                               {
                               showType && Object.keys(selectedPokemon.type).map(key => <li id={selectedPokemon.id}>{selectedPokemon.type[key]}</li>)
                              }
                         </ul>
                    </CardActions> */}
                    <CardActions>
                        <Button size="small" onClick={() =>{}} className="select-btn"> SELECT </Button>
                    </CardActions>
                </Card>
                : "Loading ..."  
                }

            {/* <Link to={`/pokemon/${id}/name`}>Go to detailed view</Link> */}
        </div>
    )
}


export default SinglePokemon
