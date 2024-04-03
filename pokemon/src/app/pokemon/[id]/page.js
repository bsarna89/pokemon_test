"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export default function Pok() {
  const searchParams = useSearchParams();

  const [pokemon, setPokemon] = useState({});
  const id = searchParams.get("num");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`${API_URL}/${id}/`);
        console.log(response.data);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <div>
      {pokemon.name && (
        <div>
          <h1> {pokemon.name.toUpperCase()} </h1>

          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={200}
            height={200}
          />
          <Image
            src={pokemon.sprites.back_default}
            alt={pokemon.name}
            width={200}
            height={200}
          />
          <audio controls>
            <source src={pokemon.cries.latest} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
