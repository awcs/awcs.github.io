import './Search.css';
import 'react-notifications/lib/notifications.css';
import React, {Component} from 'react';
import Rating from "react-star-rating-lite";
import {NotificationManager, NotificationContainer} from 'react-notifications';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, Col, Row, CardImgOverlay, CardSubtitle } from 'reactstrap';


class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      category: "Movie ",
      query: "",
      modal : false,
      dropdownOpen: false,
      movies : [],
      select : "0",
      color : [],
      cardOverlay: false,
      movie : {}
		}
    this.card ="";
    this.favorite = false;
  }

  fetchByCategory = () => {
    if(this.state.query.length > 0) {
      if(this.state.select === "0"){
        this.setState({ methodFetch : "search", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&query=${this.state.query}` },()=>this.researchQuery())
      }
      else if(this.state.select === "1"){
        this.setState({ methodFetch : "discover", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&primary_release_year=${this.state.query}`},()=>this.researchQuery())
      }
    }
  }

  researchQuery = () =>{
    fetch(`https://api.themoviedb.org/3/${this.state.methodFetch}/${this.state.targetFetch}?api_key=762ed8e154d8e7ff207952b1cc7074b0&${this.state.filmFetch}&page=1${this.state.queryFetch}`)
      .then(response => response.json()) 
			.then(json => {
            this.setState({movies : json.results},() =>{this.getDirectorFromMoviesId()});
            this.state.movies.map((movie) => {
              let poster = "data:image/jpeg;base64,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"
              if(movie.poster_path){
              poster = "https://image.tmdb.org/t/p/original" + movie.poster_path
              }
              return(
                movie.release_date = movie.release_date.slice(0,4),
                movie.vote_average = Math.round(movie.vote_average/2),
                movie.heartColor = "no-clicked-icon",
                movie.poster_path = poster,
                movie.cardOverlay = false
              )
            });
      })
			.then(() => {this.toggleModal()})
  }

  getDirectorFromMoviesId = () => {
    this.state.movies.map(movie =>{
      return(
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
      .then(response => response.json())
      .then(json =>{
        if(json.crew[0]) {
          movie.director = json.crew[0].name
          let results = json.cast.slice(0,4);
          let fullCast ="";
          for(let i=0; i<results.length; i++){
            if(i === 3) {
              fullCast+=`${results[i].name}... `;
            } else {
            fullCast +=`${results[i].name}, `;
            }
          } 
          movie.casting = fullCast;
          this.forceUpdate();
        } else {
          console.log("ERROR CREW NAME UNDEFINE");
        }
      })
    )})
    
  }

  inputChange = (event) => {
    this.setState({query: event.target.value })
  }

  changeValue= (e) => {
    if(e.target.value === "0"){
      this.setState({category: "Movie ", select : "0"});
    }
    else if(e.target.value === "1"){
      this.setState({category: "Year ", select : "1" });
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleKeyPress = (target) => {
    if(target.charCode === 13){
      this.fetchByCategory();
    }
  }

  handleClick = (movieId, movie) => {
    let movies = this.state.movies;
    movies.forEach((element) => {
      if(element.id === movieId) {
        if(element.heartColor === "no-clicked-icon"){
          this.favoriteMovies();
          element.favorite = true;
          element.heartColor = "push-heart";
        }
        else if(element.heartColor === "push-heart"){
          this.deleteMovies();
          element.favorite = false;
          element.heartColor = "no-clicked-icon";
        }
      }
    });

    this.setState({movies: movies});
    this.setState({ favorite: !this.state.favorite }, () => {this.setFavorite(movieId, movie)});
  }

	setFavorite = (movieId, movie) => {
    if(movie.favorite === true){
      this.setItem(movieId, movie);
    }
    else if(movie.favorite === false){
      this.removeItem(movieId);
    }
	}

  setItem = (movieId, movie) => {
    if(window.localStorage.getItem(movieId) === null) {
      window.localStorage.setItem(`${movieId}`, JSON.stringify(movie));
      if(window.location.pathname === "/favoris") {
        this.props.functionUpdateMovie(movie)
      }
    }
  }

  removeItem = (movieId) => {
    window.localStorage.removeItem(`${movieId}`);
  }

  favoriteMovies = () => {
		NotificationManager.success('Movie added!',"", 1000);
	}

	deleteMovies = () => {
		NotificationManager.warning('Movie removed!',"", 1000);
  }
  
  toggleCardOverlay = (movieId) => {
    let films = this.state.movies;
    films.forEach((element) => {
      if(element.id === movieId) {
        element.cardOverlay = !element.cardOverlay;
      }
    });
    this.setState({movies: films});
  }

  render(){
		const CloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px', color: "#5FD4F4" }} onClick={this.toggleModal}>&times;</button>;
    return(
      <div className="top-fixed-search">
        <Button onClick={this.fetchByCategory} className="btn-dark"><i className="fa fa-search icon"></i></Button>
        <Input placeholder="Search" onKeyPress={this.handleKeyPress} onChange={this.inputChange}/>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret className="btn btn-outline-secondary  dropdown-toggle-split">
              {this.state.category}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.changeValue} value="0">Movie</DropdownItem>
              <DropdownItem onClick={this.changeValue} value="1">Year</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg" backdropClassName="bd-black">
            <ModalHeader close={CloseBtn} className="bg-black">{`Results for ${this.state.query.toUpperCase()}`}</ModalHeader>
            <ModalBody className="bg-black">
              {this.state.movies.map((movie, index) =>{
							  return(	
                  <Col key={index} md="12 nopadding" sm="12 nopadding">
                    <Card>
                      <Row>
                      <Col lg="6 research-mobile-description">
                        <img src={`${movie.poster_path}`} alt={movie.title} className="movie-poster-favoris" />
                        {movie.cardOverlay ? 
                        <CardImgOverlay className="custom-overlay-movie"> {/* OVERLAY*/}
                          <CardBody>
                          <CardTitle className="text-uppercase ">{movie.title}</CardTitle>
                          <CardText tag="div" className="mb-4">
                            <i className= {`${movie.heartColor} fa fa-heart pull-right mr-3 mt-2 no-clicked-icon`} onClick={ () => {this.handleClick(movie.id, movie);}}></i>
                            <Rating value={`${movie.vote_average}`} color="#f4dc42" weight="24" readonly/>
                          </CardText>
                          <CardSubtitle className="lead text-white mb-2 ">
                            {movie.release_date} - {movie.director}
                          </CardSubtitle>
                            <CardText tag="div" className="font-weight-bold text-white font-italic">{movie.casting}</CardText>
                            <CardText tag="div" className="mt-4 text-white text-description-favoris">{movie.overview}</CardText>
                          </CardBody>
                          </CardImgOverlay> : null}
                        <CardText tag="div"> {/*BOUTON OVERLAY*/}
                          {!movie.cardOverlay ? <i onClick={() => {this.toggleCardOverlay(movie.id)}} className="fa fa-chevron-circle-up pull-right button-open-overlay"></i> :
                          <i onClick={() => {this.toggleCardOverlay(movie.id)}} className="fa fa-chevron-circle-down pull-right button-open-overlay-down"></i> }
                        </CardText>
                        </Col>
                        <Col lg="6" className="research-desktop-description d-none d-md-block"> {/* VERSION DESKTOP*/}
                          <CardBody>
                            <CardTitle className="display-4 text-uppercase ">{movie.title}</CardTitle>
                            <CardText tag="div" className="my-5">
                              <i className= {`${movie.heartColor} fa fa-heart pull-right mr-3`} onClick={ () => {this.handleClick(movie.id, movie)}}></i>
                              <Rating value={`${movie.vote_average}`} color="#f4dc42" weight="24" readonly/>
                            </CardText>
                            <CardSubtitle className="h4 text-white mb-2 ">
                              {movie.release_date} - {movie.director}
                            </CardSubtitle>
                            <CardText tag="div" className="font-weight-bold font-italic text-white">{movie.casting}</CardText>
                            <CardText tag="div" className="lead mt-4  text-white">{movie.overview}</CardText>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
									)})
							  }
            </ModalBody>
          </Modal>
        <NotificationContainer/>
      </div>
    )
  }
}

export default Search;