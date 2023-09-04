import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Evolutions from "../Evolutions";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.pokemon}>
      <img
        className={styles.pokemon_img}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="card_content">
        <span className={styles.pokemon_name}>Name : {pokemon.name}</span>
        <hr />
        <span className={styles.pokemon_type}>Types : </span>
        {pokemon.types.map((type) => (
          <li key={type.type.name}>
            <Link
              key={type.type.name}
              className={styles.link}
              to={`/types/${type.type.name}`}
            >
              {type.type.name}
            </Link>
          </li>
        ))}
        <hr />
        <Evolutions id={pokemon.id} />
      </div>
    </div>
  );
};

export default PokemonCard;
