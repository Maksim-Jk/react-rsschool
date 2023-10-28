import React, { Component } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar'; // Импортируйте компонент SearchBar
import styles from './Header.module.css';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

class Header extends Component<HeaderProps> {
  state = {
    hasError: false,
  };

  throwError = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Вы нажали кнопку "throw error"');
    }

    return (
      <div className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <h1 className={styles.title}>Find a Pokemon</h1>
          <button className={styles.error} onClick={this.throwError}>
            Throw error
          </button>
          <SearchBar onSearch={this.props.onSearch} />
        </div>
      </div>
    );
  }
}

export default Header;
