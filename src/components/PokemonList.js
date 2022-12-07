import React from 'react';
import { useState} from 'react';
import '../styles.css'
import { NavLink } from 'react-router-dom';
import SinglePokemon from './SinglePokemon';


function PokemonList({DataJson}) {
    //console.log(DataJson)
    
    const [readMore, setReadMore] = useState(false);
    const [clickedRandom, setClickedRandom] = useState(false);
    const [randomPokemon, setRandomPokemon] = useState(false);
    

    const linkName = readMore ? 'Show Less << ' : 'Show More >> ';

     let imgNum,imgUrl;

    const handleImgUrl = (id)=>{
        if(id<10 ) imgNum='00'+id;
        else if(id>=10 && id < 100) imgNum='0'+id;
        else imgNum=id;
        imgUrl='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+imgNum+'.png'
        return imgUrl;
     };
     
     const handleRandomPokemon = () =>{
       setClickedRandom(true);
       let randomNum= Math.floor(Math.random() * (809 - 1 +1)) + 1;
       setRandomPokemon(DataJson[randomNum]);
       
     }

    return (
        <div >
            <h2> POKEMON </h2>
            <div>Pick a random pokemon : 
                <button onClick={handleRandomPokemon} className='random-pokemon-btn'> Random </button>
               { clickedRandom && 
                      <div className='name-list' key={randomPokemon.id}>
                      <div>
                          <img className='poke-img' src={handleImgUrl(randomPokemon.id)} alt={randomPokemon.name.english} />
                          <div className='poke-Name' >{randomPokemon.name.english}</div>
                          <NavLink className='navlink-class'  to={`/pokemon/${randomPokemon.id}`} onClick={() => {setReadMore(prev => !prev)}}><span className='read-more-link'>{linkName}</span>
                          </NavLink>
                          {readMore && <SinglePokemon pokemon={randomPokemon}/> }
                      </div>
                  </div>
               }
            </div>
            <div className='grid-wrapper'>
            {DataJson.map(element => (
                <div className='name-list' key={element.id}>
                    <div>
                        <img className='poke-img' src={handleImgUrl(element.id)} alt={element.name.english} />
                        <div className='poke-Name' >{element.name.english}</div>
                        <NavLink className='navlink-class' to={`/pokemon/${element.id}`} onClick={() => {setReadMore(prev => !prev)}}><span className='read-more-link'>{linkName}</span>
                        </NavLink>
                        {readMore && <SinglePokemon pokemon={element}/> }
                    </div>
                </div>
            ))
            }
             </div>
        </div>
    )
}

export default PokemonList
