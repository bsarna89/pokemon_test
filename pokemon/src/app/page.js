"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  TextField,
  Card,
} from "@radix-ui/themes";
import getIdFromUrl from "./utils/get-id-from-url";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileterdPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`${API_URL}`);
        setPokemonList(response.data.results);
        setFilteredPokemonList(response.data.results);
        setLoading(false);
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
      <main>
        <Container size="3">
          <Flex direction="column" p="4" gap="3" align="center">
            <Heading>FIND YOUR POKOEMON</Heading>
            <TextField.Root
              size="3"
              placeholder="Search the pokemon..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {loading && <Spinner size="3"></Spinner>}
          </Flex>

          <Flex direction="column">
            {fileterdPokemonList.map((pokemon) => (
              <Card>
                <Link
                  key={pokemon.name}
                  href={{
                    pathname: `/pokemon/${pokemon.name}`,
                    query: { num: getIdFromUrl(pokemon.url) },
                  }}
                >
                  <Text> {pokemon.name}</Text>
                </Link>
              </Card>
            ))}
          </Flex>
        </Container>
      </main>
    </div>
  );
}
