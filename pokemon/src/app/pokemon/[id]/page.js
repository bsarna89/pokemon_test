"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  DataList,
  Badge,
  Box,
} from "@radix-ui/themes";
import copy from "@/app/copy/pokemon.copy";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export default function PokemonPage() {
  const searchParams = useSearchParams();

  const [pokemon, setPokemon] = useState({});
  const id = searchParams.get("num");

  const { singlePokemonPage } = copy;

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`${API_URL}/${id}/`);
        setPokemon(response.data);
      } catch (error) {
        console.error(singlePokemonPage.errors.fetchError, error);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <div>
      <Container size="3">
        {pokemon.name && (
          <Flex direction="column" p="5" gap="3" align="center">
            <Heading size="8"> {pokemon.name.toUpperCase()} </Heading>
            <Grid columns="2">
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
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={200}
                height={200}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                width={200}
                height={200}
              />
            </Grid>
            <Box align="center" p="3">
              <Text size="5"> {singlePokemonPage.audio.text}</Text>
              <audio controls>
                <source src={pokemon.cries.latest} type="audio/ogg" />
              </audio>
            </Box>
            <DataList.Root p="3">
              <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                  {singlePokemonPage.abilities.title}
                </DataList.Label>
                <DataList.Value>
                  <Badge color="jade" variant="soft" radius="full">
                    {pokemon.abilities[0].ability.name}
                  </Badge>
                  <Badge color="jade" variant="soft" radius="full">
                    {pokemon.abilities[1].ability.name}
                  </Badge>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  {singlePokemonPage.experience.text}
                </DataList.Label>
                <DataList.Value>{pokemon.base_experience}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  {singlePokemonPage.height.text}
                </DataList.Label>
                <DataList.Value>{pokemon.height}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  {singlePokemonPage.weight.text}
                </DataList.Label>
                <DataList.Value>{pokemon.weight}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  {singlePokemonPage.url.text}
                </DataList.Label>
                <DataList.Value>
                  <Link target="_blank" href={pokemon.species.url}>
                    {singlePokemonPage.url.api}
                  </Link>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        )}
      </Container>
    </div>
  );
}
