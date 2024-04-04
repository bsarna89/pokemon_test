"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Spinner,
  TextField,
  Card,
  Box,
  AspectRatio,
} from "@radix-ui/themes";
import copy from "./copy/pokemon.copy";
import { getIdFromUrl, sortByName } from "./utils/utils";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const API_URL_LIST = "https://pokeapi.co/api/v2/pokemon?limit=151";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileterdPokemonList, setFilteredPokemonList] = useState([]);
  const [frontPokemon, setFrontPokemon] = useState({});

  const { mainPage } = copy;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const randomValue = Math.floor(Math.random() * 151) + 1;
        const responseSingle = await axios.get(`${API_URL}/${randomValue}`);

        setFrontPokemon(responseSingle.data);
        if (responseSingle.status === 200) {
          try {
            const response = await axios.get(`${API_URL_LIST}`);
            if (response.status === 200) {
              setPokemonList(sortByName(response.data.results));
              setFilteredPokemonList(response.data.results);
              setLoading(false);
            }
          } catch (error) {
            console.error(mainPage.errors.fetchError, error);
          }
        }
      } catch (error) {
        console.error(mainPage.errors.fetchError, error);
      }
    }
    fetchPokemons();
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
    <main>
      <Container size="3">
        <AspectRatio ratio={2 / 1}>
          <img
            src={mainPage.header.url}
            alt="Pokemon"
            style={{
              objectFit: "fill",
              width: "80%",
              height: "80%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
        {loading && (
          <Flex direction="column" align="center">
            <Spinner size="3"></Spinner>
          </Flex>
        )}
        {!loading && (
          <div>
            <Box>
              <Card>
                <Flex>
                  <Heading p="10px">
                    {" "}
                    {frontPokemon.species.name.toUpperCase()}{" "}
                  </Heading>
                  <Image
                    src={frontPokemon.sprites.front_default}
                    alt={frontPokemon.name}
                    width={300}
                    height={300}
                  />
                  <Text p="10px">{mainPage.frontPokemon.text}</Text>
                </Flex>
              </Card>
            </Box>
            <Flex direction="column" p="4" gap="3" align="center">
              <Heading>{mainPage.header.text}</Heading>
              <TextField.Root
                size="3"
                placeholder={mainPage.textInput.placeholder}
                value={searchTerm}
                onChange={handleSearch}
              />
            </Flex>
            <Grid columns="2">
              {fileterdPokemonList.map((pokemon) => (
                <Box
                  key={pokemon.name}
                  p="2"
                  minWidth="200px"
                  maxWidth="300px"
                  align="center"
                >
                  <Link
                    href={{
                      pathname: `/pokemon/${pokemon.name}`,
                      query: { num: getIdFromUrl(pokemon.url) },
                    }}
                  >
                    <Card>
                      <Text> {pokemon.name.toUpperCase()}</Text>
                    </Card>
                  </Link>
                </Box>
              ))}
            </Grid>
          </div>
        )}
      </Container>
    </main>
  );
}
