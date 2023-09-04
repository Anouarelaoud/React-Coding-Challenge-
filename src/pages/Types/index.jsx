import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import useAsync, { IDLE } from "../../tools/useAsync";
import { SearchInput, List } from "../../components";
import styles from "../../app.module.scss";

function Types() {
  const { run, data, loading, error, status } = useAsync();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    run(fetch("https://pokeapi.co/api/v2/type?limit=20"));
  }, [run]);

  useEffect(() => {
    if (data) {
      setItems(data.results);
    }
  }, [data]);

  const filterItemsByName = debounce((query) => {
    const regex = new RegExp("^" + query, "i");
    let filteredItems = data.results.filter((item) => {
      return regex.test(item.name);
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
        <h1>Types of pokemons </h1>
        <SearchInput
          placeholder="Filter by name"
          value={query}
          onChange={handleOnchange}
        />
      </div>
      <List
        pokemons={items}
        url="/types/"
        run={run}
        status={status}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Types;
