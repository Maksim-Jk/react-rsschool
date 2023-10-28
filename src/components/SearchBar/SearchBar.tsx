import React, { Component, ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  value: string;
  validateForm: boolean;
  placeholderText: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    value: '',
    validateForm: true,
    placeholderText: 'Enter Pokemon name',
  };

  getLastSearchQuery = () => {
    const lastQuery = localStorage.getItem('lastQuery');
    lastQuery && this.setState({ value: lastQuery });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value, validateForm: true });
    this.setState({ placeholderText: 'Enter Pokemon name' });
  };

  handleSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      this.setState({ validateForm: false });
      this.setState({ placeholderText: 'Fill in the field' });
    } else {
      const regex = /^[a-zA-Z]+$/;
      if (regex.test(value)) {
        this.props.onSearch(value.trim());
      } else {
        this.setState({ validateForm: false });
        this.setState({ value: '', placeholderText: 'Only english letters' });
      }
    }
  };

  handleResetClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.value !== '') {
      event.preventDefault();
      this.props.onSearch('*');
      this.setState({ value: '', validateForm: true });
    }
  };

  inputRef = React.createRef<HTMLInputElement>();
  componentDidMount() {
    this.getLastSearchQuery();
    this.inputRef.current?.focus();
  }

  render() {
    return (
      <form className={styles.searchBar} onSubmit={this.handleSearchClick}>
        <div className={styles.inputContainer}>
          <input
            ref={this.inputRef}
            type="text"
            placeholder={this.state.placeholderText}
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
