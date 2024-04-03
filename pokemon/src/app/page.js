"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import getId from "./utils/getId";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileterdPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`${API_URL}`);
        setPokemonList(response.data.results);
        setFilteredPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    }

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPokemonList(filtered);
  }, [searchTerm, pokemonList]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <header>
        <h1 className="text-4xl font-bold text-center my-4">POKEMON SERACH</h1>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded-md mb-4 mx-auto block w-80"
        />
      </header>

      <main>
        <div> POKEMON LIST </div>
        {fileterdPokemonList.map((pokemon) => (
          <Link
            key={pokemon.name}
            href={{
              pathname: `/pokemon/${pokemon.name}`,
              query: { num: getId(pokemon.url) },
            }}
          >
            <h2>{pokemon.name} </h2>
          </Link>
        ))}
      </main>
    </div>
  );
}
