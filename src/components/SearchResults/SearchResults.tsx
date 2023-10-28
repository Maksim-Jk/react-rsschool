import React, { Component } from 'react';
import styles from './SearchResults.module.css';
import { Datum } from '@/types/apiResponse';
import PokemonCard from '@/components/PokemonCard/PokemonCard';

class SearchResults extends Component<{ results: Datum[] }> {
  render() {
    const { results } = this.props;
    return (
      <div className={styles.results}>
        {results.map((card) => (
          <PokemonCard key={card.id} card={card} />
        ))}
      </div>
    );
  }
}

export default SearchResults;
