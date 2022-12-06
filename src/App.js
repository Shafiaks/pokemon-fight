
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import SinglePokemon from './components/SinglePokemon';
import SuperDetailedView from './components/SuperDetailedView';
//import DataJson from './DataJson.json';
import axios from 'axios';


function App() {
  const [pokemons, setPokemons] = useState();

  const fetchPokemons = async () => {
    try {
      const { data } = await axios.get(
        "https://perfect-red-armadillo.cyclic.app/pokemon"
      );
      console.log("all pokemon ", data);
      setPokemons(data);
    } catch (err) {
      console.log(err);  
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [])

  return (
    <div className="App">
      <div className='router-wrapper'>
        {pokemons ? <Routes>
          <Route path='/' element={<PokemonList DataJson={pokemons} />} ></Route>
          <Route path='pokemon'>
            <Route path=':id' element={<SinglePokemon DataJson={pokemons} />}></Route>
            <Route path=':id/:info' element={<SuperDetailedView DataJson={pokemons} />} ></Route>
          </Route>
        </Routes>
          : <h2> "Loading ..." </h2>
        }
      </div>
    </div>
  );
}

export default App;
