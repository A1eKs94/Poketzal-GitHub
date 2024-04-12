import React, { useState , useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/material";
import Item from "./Item";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:"white",
  marginLeft: 0,
  width: "100%",
  border: "3px solid black"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (searchTerm.trim() === "") {
        setFilteredPokemon([]);
        return;
      }

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filtered = data.results.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));
        const pokemonWithImages = await Promise.all(filtered.map(async pokemon => {
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemon.name,
            imgUrl: pokemonData.sprites.versions["generation-v"]["black-white"].front_default
          };
        }));
        setFilteredPokemon(pokemonWithImages);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setFilteredPokemon([]);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container className="content" sx={{marginTop:'50px' ,display:'flex',flexDirection:'row', justifyContent:'center', flexWrap:'wrap', gap:'30px'}}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Search>
      {filteredPokemon.map((pokemon, index) => (
        <Item
          key={index}
          initName={pokemon.name}
          initImg={pokemon.imgUrl}
        />
      ))}
    </Container>
  );
}