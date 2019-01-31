import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  const API = 'https://hn.algolia.com/api/v1/search?query=';
  const DEFAULT_QUERY = 'redux';

  class Movie extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        movies: [],
        isLoading: false,
        error: null,
      };
    }
    

    componentDidMount() {
      this.setState({isLoading: true});

      fetch(API + DEFAULT_QUERY)
        .then(response => {
          if (response.ok) {
            return response.json();  
          } else{
            throw new Error('Something went wrong...');
          }
        })
        .then(data => this.setState({ movies: data.hits, isLoading: false }))
        .catch(error => this.setState({error, isLoading: false}));
    }

    render() {
      const { movies, isLoading, error } = this.state;
      
      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }

      return (
        <ul>
          {movies.map(hit =>
            <li key={hit.objectID}>
              <a href={hit.url}>{hit.title}</a>
            </li>
          )}
        </ul>
      );
    }
  }

  class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: [],
      }
    }

    render(){
      return (
        <div className="category" >
          <Movie />
        </div>
      );
    }
  }
  
  class Wrapper extends React.Component {
    render() {
      return (
        <div className="wrapper">
            <Category />
        </div>
      );
    }
  }

  
  // ========================================
  
  ReactDOM.render(
    <Wrapper />,
    document.getElementById('root')
  );
  