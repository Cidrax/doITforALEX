import React, { useEffect, useState } from 'react';
import styles from './Movie.module.scss';
import movieService from '../../services/movieService';
import { searchByIdResult } from '../../services/movieService';
import LoadingCircle from '../../components/loadingCircle/LoadingCircle';
import Container from 'react-bootstrap/Container';
import CustomHeader from "../../components/customHeader/CustomHeader";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LabeledText from "../../components/labledText/LabeledText";


const Movie = (props) => {
  const [movie, setMovie] = useState(searchByIdResult);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(
    () => {
      const { match: { params: { id } } } = props;
      movieService.searchById(id).then(result => {
        setMovie(result);
        setIsLoading(false);
      });
    },
    []
  );

  const renderMovieInfo = () => {
    return <Container className={ styles.MovieContainer }>
      <Row>
        <Col xs={ 4 } className={ styles.MovieImageCol }>
          <img
            src={ movie.poster }
            alt={ movie.title }
          />
        </Col>
        <Col className={ styles.MovieInfoCol }>
          <LabeledText label="Production" text={ movie.production }/>
          <LabeledText label="Plot" text={ movie.plot }/>
          <LabeledText label="Rated" text={ movie.ageRating }/>
          <LabeledText label="Release date" text={ movie.releaseDate }/>
          <LabeledText label="Writer" text={ movie.writer }/>
          <LabeledText label="Director" text={ movie.director }/>
          <LabeledText label="Actors" text={ movie.actors }/>
          <LabeledText label="Awards" text={ movie.awards }/>
          <LabeledText label="Rating" text={ `${ movie.rating }/10` }/>
          <LabeledText label="Votes" text={ movie.votes }/>
        </Col>
      </Row>
    </Container>
  };

  return (
    <>
      <CustomHeader>
        <Button
          variant="primary"
          className={ styles.BackButton }
          onClick={ () => {
            history.push('/');
          } }>Back</Button>
        <div className={ styles.Title }>{ !isLoading && movie.title }</div>
      </CustomHeader>
      { isLoading && <LoadingCircle/> }
      { !isLoading && renderMovieInfo() }
    </>
  );

};

export default Movie;
