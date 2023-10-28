import { Component } from 'react';
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

  handleSearch = (searchQuery: string) => {
    this.setState({ isLoading: true });

    const queryURL = `https://api.pokemontcg.io/v2/cards/?pageSize=${
      this.state.pageSize
    }&q=name:${searchQuery + '*'}`;

    fetch(queryURL)
      .then((response) => response.json())
      .then((data: RootObject) => {
        if (data.count === 0) {
          this.setState({ error: 'No results were found for your request :(' });
        } else {
          this.setState({ results: data.data, error: null });
        }
        if (searchQuery === '*') {
          localStorage.removeItem('lastQuery');
        } else {
          localStorage.setItem('lastQuery', searchQuery);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  fetchDataOnLoading = () => {
    const lastQuery = localStorage.getItem('lastQuery');
    const newSearchQuery = lastQuery ? lastQuery : '*';
    this.handleSearch(newSearchQuery);
  };

  componentDidMount() {
    this.fetchDataOnLoading();
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
