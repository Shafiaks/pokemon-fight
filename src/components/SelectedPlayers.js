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
    const [beforeFight, setBeforeFight] = useState(true);
    const [winner, setWinner] = useState();
    const [resultColor, setResultColor] = useState();
    const [result,setResult] =useState();
    const [resultTwo,setResultTwo] =useState();


    
    const { id } = useParams();

    let imgNum, imgUrl, randomNum, difference = 0;
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


    const decideWinner = () => {

        setShowStartGame(prev => !prev);
        setIsStartClicked(prev => !prev);
        if (selectedPokemon && fightingPokemon) {
            let selectedPokStrength = (selectedPokemon.base.Attack * selectedPokemon.base.Speed) + (selectedPokemon.base.Defense * selectedPokemon.base.HP);
            let randomPokStrength = (fightingPokemon.base.Attack * fightingPokemon.base.Speed) + (fightingPokemon.base.Defense * fightingPokemon.base.HP);
            difference = (selectedPokStrength - randomPokStrength);
            //difference = Math.ceil(difference);

            switch (true) {
                case (difference > 0): setWinner(selectedPokemon);
                    setResultColor("green")
                    setResult('You Won !!!')
                    setResultTwo('Congrats !!!')
                    break;
                case (difference < 0): setWinner(fightingPokemon);
                    setResultColor("red")
                    setResult('You Loose !')
                    setResultTwo('Try again !')
                    break;
                case (difference === 0): setWinner('tie');
                    setResultColor("green")
                    break;
                default: break;
            }
            setBeforeFight(false);
         
        }
        else return;
    }


    return (
        <div>  {
            selectedPokemon && fightingPokemon ?
                <div>

                    {beforeFight ?
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
                                <Button className='game-start-btn' onClick={decideWinner} variant="contained" color="error">
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
                        :
                        <div>
                            {
                                winner && <div className='result-component' style={{ 'background-color' :  resultColor  }} >
                                    <h1>Winner is </h1>
                                    <Card sx={{ maxWidth: 350 }} className='single-card'>
                                        <CardMedia
                                            component="img"
                                            width="100"
                                            image={imageURL(winner.id)}
                                            alt="pokemon"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {winner.name.english}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <h1>{result}</h1>
                                    <h1>{resultTwo}</h1>
                                </div>
                            }
                        </div>
                    }
                </div>

                : "Loading ....."
        }

        </div>
    )
}

export default SelectedPlayers
