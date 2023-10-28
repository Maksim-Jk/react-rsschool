import React, { Component } from 'react';
import styles from './PokemonCard.module.css';
import { Datum } from '@/types/apiResponse';

class SearchResults extends Component<{ card: Datum }> {
  render() {
    const { card } = this.props;
    return (
      <a href={card.cardmarket?.url} target="_blank" rel="noreferrer">
        <div className={styles['pokemon-card']}>
          <img src={card.images.small} alt={card.name} />
          <div className={styles.body}>
            <h2>{card.name}</h2>
            <p>Supertype: {card.supertype}</p>
            {card.subtypes && <p>Subtypes: {card.subtypes.join(', ')}</p>}
            {card.level && <p>Level: {card.level}</p>}
            {card.hp && <p>HP: {card.hp}</p>}
            {card.types && card.types.length > 0 && (
              <p>Types: {card.types.join(', ')}</p>
            )}
          </div>
        </div>
      </a>
    );
  }
}

export default SearchResults;
