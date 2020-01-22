import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useDebounce from "../../helpers/debouce";
import movieService from "../../services/movieService";

import styles from './Home.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingCircle from '../../components/loadingCircle/LoadingCircle';
import CustomHeader from "../../components/customHeader/CustomHeader";

const defaultMoviesObject = {
  searchedArray: [],
  totalResults: 0,
  errorText: '',
  responseIsValid: false,
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState(defaultMoviesObject);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const history = useHistory();

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        movieService.searchByName(debouncedSearchTerm).then(results => {
          setIsSearching(false);
          setMovies(results);
        });
      } else {
        setMovies(defaultMoviesObject);
      }
    },
    [debouncedSearchTerm]
  );

  const renderRows = () => {
    if (!isSearching) {
      return movies.searchedArray.map((movie, index) => (
        <Row key={ `${ movie.id }-${ index }` }
             onClick={ () => {
               history.push(`/movie/${ movie.id }`)
             } }
        >
          <Col/>
          <Col className={ styles.MovieBox } xs={ 4 }>
            <h4 className={ styles.Title }>{ movie.title }</h4>
            <h3>{ movie.year }</h3>
            <img
              src={ movie.poster }
              alt={ movie.title }
            />
          </Col>
          <Col/>
        </Row>
      ));
    }
    return null;

  };

  const renderLoadingAndError = () => {
    if (isSearching) {
      return (<LoadingCircle/>);
    } else if (!isSearching && !movies.responseIsValid) {
      return <div className={ styles.Search }>{ movies.errorText }</div>
    }
    return null;
  };
  return (
    <div className={ styles.MainContainer }>
      <CustomHeader>
        <input
          placeholder="Search movie"
          onChange={ event => setSearchTerm(event.target.value) }
        />
      </CustomHeader>

      <Container className={ styles.MoviesContainer }>
        { renderLoadingAndError() }
        { renderRows() }
      </Container>
    </div>
  );
};

export default Home;
