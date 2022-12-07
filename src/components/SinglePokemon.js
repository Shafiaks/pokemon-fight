import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    const [fightingPokemon, setFightingPokemon] = useState();

    const ShowBaseMore = showBase ? ' <<< ' : '>>> ';
    const ShowTypeMore = showType ? ' << ' : '  >> ';
    let imgNum, imgUrl, randomNum;

    // array.find() -> takes a function and finds the first item in that array that matches
    const selectedPokemon = DataJson.find(element => element.id == id)
    console.log("selectedPokemon  ", selectedPokemon);

    const randomFightingPokemon = () => {
        randomNum = Math.floor(Math.random() * (809 - 1 + 1)) + 1;
        if (selectedPokemon.id == randomNum) randomFightingPokemon();
        else setFightingPokemon(DataJson[randomNum]);
        console.log("fighting pok ",randomNum)
    }

    const imageURL = (id) => {
        if (id < 10) imgNum = '00' + id;
        else if (id >= 10 && id < 100) imgNum = '0' + id;
        else imgNum = id;
        imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + imgNum + '.png'
        //console.log("img url is ",imgUrl);
        return imgUrl;
    };

    useEffect(() => {
        randomFightingPokemon();
    }, [])


    return (
        <div className='card-component'>
            {selectedPokemon && fightingPokemon ? <div className='players-card-flex'>

                <div>
                    <Card sx={{ maxWidth: 300 }} className='single-card'>
                        <CardMedia
                            component="img"
                            width="100"
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
                            <Button size="small" onClick={() => { setShowBase(prev => !prev) }}> Base :  {ShowBaseMore} </Button>
                            <ul className='base-ul'>
                                {showBase &&
                                    Object.keys(selectedPokemon.base).map(key => <li id={selectedPokemon.id} className='base-li'> {key + " : " + selectedPokemon.base[key]}</li>)
                                }
                            </ul>
                        </CardActions>

                        <CardActions>
                            <Button size="small" onClick={() => { }} className="select-btn"> SELECT </Button>
                        </CardActions>
                    </Card>
                </div>
                {/* <div>
                    <Card sx={{ maxWidth: 250 }} className='single-card'>
                        <CardMedia
                            component="img"
                            width="150"
                            image={imageURL(fightingPokemon.id)}
                           // image={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+randomNum+'.png'}
                            alt="pokemon"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {fightingPokemon.name.english}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ul className='type-ul'>
                                {
                                    Object.keys(fightingPokemon.type).map(key => <button className='type-btn' id={fightingPokemon.id}>{fightingPokemon.type[key]}</button>)
                                }
                            </ul>
                        </CardActions>
                        <CardActions>
                            <Button size="small" onClick={() => { setShowBase(prev => !prev) }}> Base :  {ShowBaseMore} </Button>
                            <ul className='base-ul'>
                                {showBase &&
                                    Object.keys(fightingPokemon.base).map(key => <li id={fightingPokemon.id} className='base-li'> {key + " : " + fightingPokemon.base[key]}</li>)
                                }
                            </ul>
                        </CardActions>
                    </Card>
                </div> */}
            </div>
                : "Loading ..."
            }

            {/* <Link to={`/pokemon/${id}/name`}>Go to detailed view</Link> */}
        </div>
    )
}


export default SinglePokemon
