import React, { Component, ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  value: string;
  validateForm: boolean;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    value: '',
    validateForm: true,
  };

  getLastSearchQuery = () => {
    const lastQuery = localStorage.getItem('lastQuery');
    lastQuery && this.setState({ value: lastQuery });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value, validateForm: true });
  };

  handleSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      this.setState({ validateForm: false });
    } else {
      this.props.onSearch(value.trim());
    }
  };

  handleResetClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.value !== '') {
      event.preventDefault();
      this.props.onSearch('*');
      this.setState({ value: '', validateForm: true });
    }
  };

  componentDidMount() {
    this.getLastSearchQuery();
  }

  render() {
    return (
      <form className={styles.searchBar} onSubmit={this.handleSearchClick}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter Pokemon name"
            value={this.state.value}
            onChange={this.handleInputChange}
            className={`${styles.input} ${
              this.state.validateForm ? '' : styles.invalidInput
            }`}
          />
          <button
            type="button"
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
