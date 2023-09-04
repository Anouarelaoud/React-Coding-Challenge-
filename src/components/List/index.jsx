import { IDLE } from "../../tools/useAsync";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const List = ({
  pokemons,
  url,
  next,
  previous,
  run,
  status,
  error,
  loading,
}) => {
  const handlePagination = (e) => {
    const target = e.target.getAttribute("data-id");
    target === "next" ? run(fetch(next)) : run(fetch(previous));
  };

  if (status === IDLE || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!pokemons.length) return <h3>0 results</h3>;

  return (
    <div className={styles.content}>
      <table className={styles.custom_table}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((item, index) => {
            let pokemon = item;
            if (item.pokemon) pokemon = item.pokemon;
            return (
              <tr key={pokemon.name}>
                <td>{index + 1}</td>
                <td>
                  <Link className={styles.link} to={`${url}${pokemon.name}`}>
                    {pokemon.name}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!next && !previous ? null : (
        <div className={styles.pagination}>
          <button
            disabled={!previous}
            data-id="previous"
            onClick={handlePagination}
          >
            Previous
          </button>
          <button disabled={!next} data-id="next" onClick={handlePagination}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
