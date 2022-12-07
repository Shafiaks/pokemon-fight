import { React, useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgressBar from './LinearProgressBar';

import '../styles.css'

function SelectedPlayers({ DataJson }) {

    const [fightingPokemon, setFightingPokemon] = useState();
    const [showBase, setShowBase] = useState(false);
    const [showStartGame, setShowStartGame] = useState(true);
    const [isStartClicked, setIsStartClicked] = useState(false);
    const { id } = useParams();

    let imgNum, imgUrl, randomNum;
    const ShowBaseMore = showBase ? ' <<< ' : '>>> ';

    // user selected pokemon
    const selectedPokemon = DataJson.find(element => element.id == id)
    //console.log("selectedPokemon  ", selectedPokemon);

    //Finding Random  pokemon to fight
    const randomFightingPokemon = () => {
        randomNum = Math.floor(Math.random() * (809 - 1 + 1)) + 1;
        if (selectedPokemon.id == randomNum) randomFightingPokemon();
        else setFightingPokemon(DataJson[randomNum]);
        // console.log("fighting pok ", randomNum)
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

    //selectedPokemon && fightingPokemon

    return (
        <div >  {
            selectedPokemon && fightingPokemon ?
                <div className='players-card-flex'>
                    <div >
                        <Card sx={{ maxWidth: 400 }} >
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
                            {showStartGame && <CardActions>
                                <ul className='type-ul'>
                                    {
                                        Object.keys(selectedPokemon.type).map(key => <button className='type-btn' id={selectedPokemon.id}>{selectedPokemon.type[key]}</button>)
                                    }
                                </ul>
                            </CardActions>
                            }
                            {showStartGame && <CardActions>
                                <Button size="small" onClick={() => { setShowBase(prev => !prev) }}> Base :  {ShowBaseMore} </Button>
                                <ul className='base-ul'>
                                    {showBase &&
                                        Object.keys(selectedPokemon.base).map(key => <li id={selectedPokemon.id} className='base-li'> {key + " : " + selectedPokemon.base[key]}</li>)
                                    }
                                </ul>
                            </CardActions>
                            }
                        </Card>
                        {isStartClicked &&
                            <LinearProgressBar SelectedBase={selectedPokemon.base} RandomBase={fightingPokemon.base} />

                        }
                    </div>

                    {showStartGame &&
                        <Button className='game-start-btn' onClick={() => { setShowStartGame(prev => !prev); setIsStartClicked(prev => !prev) }} variant="contained" color="error">
                            START GAME
                        </Button>
                    }
                    {/* to={`/pokemon/${selectedPokemon.id}/game-result`} */}

                    <div>
                        <Card sx={{ maxWidth: 400 }} className='single-card'>
                            <CardMedia
                                component="img"
                                width="100"
                                image={imageURL(fightingPokemon.id)}
                                // image={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+randomNum+'.png'}
                                alt="pokemon"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {fightingPokemon.name.english}
                                </Typography>
                            </CardContent>
                            {showStartGame && <CardActions>
                                <ul className='type-ul'>
                                    {
                                        Object.keys(fightingPokemon.type).map(key => <button className='type-btn' id={fightingPokemon.id}>{fightingPokemon.type[key]}</button>)
                                    }
                                </ul>
                            </CardActions>
                            }
                            {showStartGame && <CardActions>
                                <Button size="small" onClick={() => { setShowBase(prev => !prev) }}> Base :  {ShowBaseMore} </Button>
                                <ul className='base-ul'>
                                    {showBase &&
                                        Object.keys(fightingPokemon.base).map(key => <li id={fightingPokemon.id} className='base-li'> {key + " : " + fightingPokemon.base[key]}</li>)
                                    }
                                </ul>
                            </CardActions>
                            }

                        </Card>
                        {isStartClicked &&
                            <div >
                                <LinearProgressBar SelectedBase={selectedPokemon.base} RandomBase={fightingPokemon.base} />
                            </div>
                        }
                    </div>
                </div>
                : "Loading ....."
        }

        </div>
    )
}

export default SelectedPlayers
