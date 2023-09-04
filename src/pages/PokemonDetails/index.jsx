import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAsync, { IDLE } from "../../tools/useAsync";
import PokemonCard from "../../components/PokemonCard";

function PokemonDetails() {
  const { name } = useParams();
  const { data: pokemon, run, error, loading, status } = useAsync();

  useEffect(() => {
    run(fetch(`https://pokeapi.co/api/v2/pokemon/${name}`));
  }, [run, name]);

  if (status === IDLE || loading) return <span>Loading...</span>;
  if (error) return <h3>{error}</h3>;

  return <PokemonCard pokemon={pokemon} />;
}

export default PokemonDetails;
