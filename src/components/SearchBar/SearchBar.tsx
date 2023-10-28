import React, { Component, ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  searchTerm: string;
  validateForm: boolean;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    searchTerm: localStorage.getItem('lastSearchTerm') || '',
    validateForm: true,
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value, validateForm: true });
  };

  handleSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = this.state;

    searchTerm.trim() !== ''
      ? this.props.onSearch(searchTerm.trim())
      : this.setState({ validateForm: false });
  };

  handleResetClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(localStorage.getItem('lastSearchTerm'));
    if (localStorage.getItem('lastSearchTerm') === '') {
      return;
    }
    this.setState({ searchTerm: '' });
    this.props.onSearch('');
  };

  render() {
    return (
      <form className={styles.searchBar} onSubmit={this.handleSearchClick}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter Pokemon name"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            className={`${styles.input} ${
              this.state.validateForm ? '' : styles.invalidInput
            }`}
          />
          <button
            onClick={this.handleResetClick}
            className={styles.resetButton}
          >
            x
          </button>
        </div>
        <input type="submit" value="Find" className={styles.submitButton} />
      </form>
    );
  }
}

export default SearchBar;
