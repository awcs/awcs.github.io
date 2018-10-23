import React, { Component } from 'react';
import './Actuality.css';
import 'react-notifications/lib/notifications.css';
import Rating from "react-star-rating-lite";
import {NotificationManager, NotificationContainer} from 'react-notifications';

import { Card, CardBody, Container, CardTitle, CardText, Col, Row, CardImgOverlay, CardSubtitle } from 'reactstrap';

import posed from 'react-pose';

const Box = posed.div({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

class Actuality extends Component {
  constructor(props){
    super(props);
    this.state = {
      movie : {},
      readMore: false,
      color: "no-clicked-icon",
      isVisible : true,
      cardOverlay: false,
      colorsHeartMovies: []
    }
    this.rate ="";
		this.favorite = false;
  }

  favoriteMovies = () => {
		NotificationManager.success('Movie added!',"", 1000);
	}

	deleteMovies = () => {
		NotificationManager.warning('Movie removed!',"", 1000);
	}

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=762ed8e154d8e7ff207952b1cc7074b0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.getRandomArbitrary(1,3)}&primary_release_year=2018`)
      .then(response => response.json())
      .then(json => {
        this.setState({movie : json.results[this.getRandomInt(19)]},() => this.getDirectorFromMovieId());
			})
      .then(() => {
        this.setState({movie : {...this.state.movie,vote_average : Math.round(this.state.movie.vote_average/2)}});
        this.setState({movie : {...this.state.movie,release_date : this.state.movie.release_date.slice(0,4)}});
        this.rate = <Rating value={`${this.state.movie.vote_average}`} color="#f4dc42" className="pull-left" readonly/>
      })
    setTimeout(() => {this.setState({ isVisible: !this.state.isVisible });}, 500);
  }

  getDirectorFromMovieId = () => {
    fetch(`https://api.themoviedb.org/3/movie/${this.state.movie.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
      .then(response => response.json())
      .then(json =>{
        this.setState({movie : {...this.state.movie,director : json.crew[0].name}});
        this.setState({movie : {...this.state.movie,poster_path : "https://image.tmdb.org/t/p/original" + this.state.movie.poster_path}});

        let results = json.cast.slice(0,4);
        let fullCast ="";
        for(let i=0; i<results.length; i++){
          if(i === 3) {
            fullCast+=`${results[i].name}... `;
          } else {
          fullCast +=`${results[i].name}, `;
          }
        } 
        this.setState({movie : {...this.state.movie,casting : fullCast}});
        this.forceUpdate();
    })
  }

  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max)); 
  }

  handleClick = () => {
    if(this.state.color=== "no-clicked-icon"){
      this.setState({color:"push-heart"});
      this.favoriteMovies();
    }
    else if(this.state.color === "push-heart"){
      this.setState({color:"no-clicked-icon"});
      this.deleteMovies();
    }

    this.setState({ favorite: !this.state.favorite }, () => {
      this.setFavorite();
    });
  }

	setFavorite = () => {
    if(this.state.favorite===true){
      this.setItem();
    }
    else if(this.state.favorite===false){
      this.removeItem();
    }
	}

  setItem = () => {
    window.localStorage.setItem(`${this.state.movie.id}`, JSON.stringify(this.state.movie));
  }

  removeItem = () => {
    window.localStorage.removeItem(`${this.state.movie.id}`);
  }

  toggleReadMore = () => {
    this.setState({readMore: !this.state.readMore});
  }

  toggleCardOverlay = () => {
    this.setState({cardOverlay: ! this.state.cardOverlay});
  }
  
  render() {
    return (
      <Container fluid={true} className="custom-global-container">
        <div className="container-overlay pl-0"></div>
          <Box pose={this.state.isVisible ? 'hidden' : 'visible'}>
          <Card inverse>
            <Row className="actuality-container nopadding">
              <Col lg="7" className="nopadding">
                <img src={`${this.state.movie.poster_path}`} alt={this.state.movie.title} className="movie_poster" ></img>
                {this.state.cardOverlay ? <CardImgOverlay className="custom-overlay-movie">{/* OVERLAY*/}
                  <CardBody>
                    <CardTitle className="display-3 text-uppercase ">{this.state.movie.title}</CardTitle>
                    <CardText tag="div" className="my-5">
                      <i className= {`${this.state.color} fa fa-heart pull-right mr-3`} onClick={ () => {this.handleClick()}}></i>
                      {this.rate}
                    </CardText>
                    <CardSubtitle className="h4 text-white mb-2 ">
                      {this.state.movie.release_date} - {this.state.movie.director}
                    </CardSubtitle>
                    <CardText tag="div" className="font-weight-bold text-white font-italic">{this.state.movie.casting}</CardText>
                    <CardText tag="div" className="lead mt-4 overview-text-actuality text-white mb-5">{this.state.movie.overview}</CardText>
                  </CardBody>
                </CardImgOverlay> : null}
                <CardText tag="div">{/* BOUTON OVERLAY*/}
                {!this.state.cardOverlay ? <i onClick={this.toggleCardOverlay} className="fa fa-chevron-circle-up pull-right button-open-overlay"></i> :
                  <i onClick={this.toggleCardOverlay} className="fa fa-chevron-circle-down pull-right button-open-overlay"></i> }
                </CardText>
              </Col>
              <Col lg="5" className="actuality-desktop-description pt-5"> {/*VERSION DESKTOP*/}
                <CardBody>
                  <CardTitle className="display-3 text-uppercase ">{this.state.movie.title}</CardTitle>
                  <CardText tag="div" className="my-5">
                    <i className= {`${this.state.color} fa fa-heart pull-right mr-3`} onClick={ () => {this.handleClick()}}></i>
                    {this.rate}
                  </CardText>
                  <CardSubtitle className="h4 text-white mb-2 ">
                    {this.state.movie.release_date} - {this.state.movie.director}
                  </CardSubtitle>
                  <CardText tag="div" className="font-weight-bold font-italic">{this.state.movie.casting}</CardText>
                  <CardText tag="div" className="lead mt-4">{this.state.movie.overview}</CardText>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Box>
        <NotificationContainer/>
      </Container>
    );
  }
}

export default Actuality;