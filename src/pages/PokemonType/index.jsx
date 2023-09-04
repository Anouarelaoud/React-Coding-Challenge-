import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import useAsync, { IDLE } from "../../tools/useAsync";
import styles from "../../app.module.scss";
import { SearchInput, List } from "../../components";

const PokemonType = () => {
  const { name } = useParams();
  const { run, data, loading, error, status } = useAsync();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    run(fetch(`https://pokeapi.co/api/v2/type/${name}/?limit=20`));
  }, [run, name]);

  useEffect(() => {
    if (data) {
      setItems(data.pokemon);
    }
  }, [data]);

  const filterItemsByName = debounce((query) => {
    const regex = new RegExp("^" + query, "i");
    let filteredItems = data.pokemon.filter((item) => {
      return regex.test(item.pokemon.name);
    });
    setItems(filteredItems);
  }, 500);

  const handleOnchange = (e) => {
    setQuery(e.target.value);
    filterItemsByName(e.target.value);
  };

  return (
    <div className={styles.content}>
      <div className={styles.card_header}>
        <h1>Pokemons of Type {name} </h1>
        <SearchInput
          placeholder="Filter by name"
          value={query}
          onChange={handleOnchange}
        />
      </div>
      <List
        pokemons={items}
        url="/pokemon/"
        run={run}
        status={status}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PokemonType;
