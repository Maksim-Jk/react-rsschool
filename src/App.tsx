import React, { Component } from 'react';
import SearchResults from '@/components/SearchResults/SearchResults';
import Header from '@/components/Header/Header';
import { Datum, RootObject } from '@/types/apiResponse';
import Loader from '@/components/Loader/Loader';

interface IAppState {
  results: Datum[] | [];
  pageSize: number;
  error: null | string;
  isLoading: boolean;
}

class App extends Component<NonNullable<unknown>, IAppState> {
  state = {
    results: [],
    pageSize: 10,
    error: null,
    isLoading: false,
  };

  handleSearch = (searchTerm: string = '') => {
    this.setState({ isLoading: true });
    const prevSearchTerm = localStorage.getItem('lastSearchTerm');
    const searchQuery =
      prevSearchTerm && prevSearchTerm !== ''
        ? `&q=name:*${prevSearchTerm}*&page=1`
        : searchTerm !== ''
        ? `&q=name:*${searchTerm}*&page=1`
        : '';
    const queryURL = `https://api.pokemontcg.io/v2/cards/?pageSize=${this.state.pageSize}${searchQuery}`;
    // Вызов API с использованием fetch
    fetch(queryURL)
      .then((response) => response.json())
      .then((data: RootObject) => {
        data.data.length !== 0
          ? this.setState({ results: data.data })
          : this.setState({ error: 'Ничего не найдено' });
        data.data.length !== 0 &&
          localStorage.setItem('lastSearchTerm', searchTerm);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (
      <div className="App">
        <Header onSearch={this.handleSearch} />
        <div className="container main">
          {this.state.isLoading ? (
            <Loader />
          ) : this.state.error ? (
            <p>{this.state.error}</p>
          ) : (
            <SearchResults results={this.state.results} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
