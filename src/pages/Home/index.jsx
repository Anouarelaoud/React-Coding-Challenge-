import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { SearchInput, List } from "../../components";
import useAsync from "../../tools/useAsync";
import styles from "../../app.module.scss";

function Home() {
  const { run, data, loading, error, status } = useAsync();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    run(fetch("https://pokeapi.co/api/v2/pokemon?limit=20"));
  }, [run]);

  useEffect(() => {
    if (data) {
      setItems(data.results);
      setNext(data.next);
      setPrevious(data.previous);
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
        <h1>Home page </h1>
        <SearchInput
          placeholder="Filter by name"
          value={query}
          onChange={handleOnchange}
        />
      </div>
      <List
        pokemons={items}
        url="/pokemon/"
        next={next}
        previous={previous}
        run={run}
        status={status}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Home;
