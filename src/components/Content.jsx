import { Container } from "@mui/material";
import Item from "./Item";
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from "react";

export default function Content() {
    const [isLoading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=52`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                const pokemonRequests = data.results.map(async pokemon => {
                    const pokemonResponse = await fetch(pokemon.url);
                    return pokemonResponse.json();
                });
                const pokemonData = await Promise.all(pokemonRequests);

                setItems(pokemonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    return (
        <Container className="content" sx={{ marginTop: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: '15px'}}>
            {items.map((item, index) => (
                <Item
                    key={index}
                    initImg={item.sprites.versions["generation-v"]["black-white"].front_default}
                    initName={item.name}
                />
            ))}
        </Container>
    );
}