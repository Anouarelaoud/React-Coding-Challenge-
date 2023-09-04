import { useEffect, useState } from "react";
import useAsync, { IDLE } from "../../tools/useAsync";

const Evolutions = ({ id }) => {
  const { run, data, loading, error, status } = useAsync();
  const [evolutions, setEvolutions] = useState([]);
  useEffect(() => {
    run(fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`));
  }, [run, id]);

  useEffect(() => {
    if (data) {
      let possibleEvolutions = getEvolutions(data);
      setEvolutions(possibleEvolutions);
    }
  }, [data]);

  if (status === IDLE || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  function getEvolutions(data) {
    const chain = data.chain;
    const evolutions = [];

    const navigateChain = (evolutionData) => {
      const { species, evolves_to } = evolutionData;

      evolutions.push(species.name);

      evolves_to.forEach((evolution) => {
        navigateChain(evolution);
      });
    };

    navigateChain(chain);

    return evolutions;
  }

  return (
    <div>
      <span>Evolutions : </span>
      <ul>
        {evolutions.map((evolution) => (
          <li key={evolution}>{evolution}</li>
        ))}
      </ul>
    </div>
  );
};

export default Evolutions;
