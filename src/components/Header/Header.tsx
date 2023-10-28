import React, { Component } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar'; // Импортируйте компонент SearchBar
import styles from './Header.module.css';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <h1 className={styles.title}>Find a Pokemon</h1>
          <SearchBar onSearch={this.props.onSearch} />
        </div>
      </div>
    );
  }
}

export default Header;
