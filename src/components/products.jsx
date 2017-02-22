import React from "react";
//polyfill for the fetch() API so that we can use
//it in Safari and older browsers
//this module was already included in our package.json
//so after you execute `npm install` this module will
//be in the node_modules directory, so we can load it
//simply by importing it's module name
import "whatwg-fetch";
import {Button, Cell, Card, CardActions, CardText, Drawer, Layout, Header, Textfield, Navigation, Grid} from 'react-mdl';
import Movie from "./movie.jsx";
import {store, addItem} from "../shared-state.js";

const APIKEY = "e51fd804736e53cd2e55680fafe45f18";
const BASE_URL = "https://api.themoviedb.org/3"
const DISCOVER_API = BASE_URL + "/discover/movie?api_key=" + APIKEY;
const GENRES_API = BASE_URL + "/genre/movie/list?api_key=" + APIKEY;
const SEARCH_API = BASE_URL + "/search/movie?api_key=" + APIKEY;

export default class extends React.Component {
    constructor(props) {
        super(props);
        
        //initialize the component state to the
        this.state = {movieURL: DISCOVER_API, genres: []}
    }

    getMovies(URLtype, value) {
        var addOn;
        var currentURL;
        if (URLtype == SEARCH_API) {
            addOn = "&query=" + value.target.value
        } else {
            addOn = "&with_genres=" + value;
        }
        currentURL = URLtype + addOn;
        fetch(currentURL)
            .then(response => response.json())
            .then(data => this.setState({
                movies: data,
                movieURL: currentURL
            }));
    }

    movePage(pageMove) {
        if ((pageMove === 1 || (this.state.movies.page > 1) )) {
            fetch(this.state.movieURL + "&page=" + (this.state.movies.page + pageMove))
                .then(response => response.json())
                .then(data => this.setState({
                    movies: data,   
                    page: this.state.movies.page + pageMove
                }));
        }
    }

    componentDidMount() {
        fetch(DISCOVER_API)
            //asynchronous, essentially just returns response.json as a result of the function taking in response
            .then(response => response.json())
            //this assigns the state of the component to movie, and assigns data to it (aka the response.json)
            .then(data => this.setState({movies: data}));
         fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + APIKEY)
            .then(response => response.json())
            .then(data => this.setState({
                genres: data.genres
            }));
    }

    render() {
        var genres;
        var totalPages;
        var movies;
        var item;
        if (this.state.movies) {
            // this will calculate this total pages from the data
            totalPages = (<p> {this.state.movies.page} of {this.state.movies.total_pages} pages</p>)
            // movies = [];
            // // this constructs a Movie tag for each movie data that passes through
            // this.state.movies.results.forEach(function(m) {
            //     movies.push(<Movie key={m.id} movie={m} />);
            // });
            genres = this.state.genres.map(g =>
                <a key={g.id} href="javascript: void(0)" onClick={() => this.getMovies(DISCOVER_API, g.id)}>{g.name}</a>
            );
            movies = this.state.movies.results.map(m => 
                <Cell key={m.id} col={6} style={{margin:'5px'}}>
                 <Card className="card" shadow={0} style={{width: '100%', height: '150px', margin: '0'}}>
                    <Movie key={m.id} movie={m}>
                        <Button onClick={() => store.dispatch(addItem(item = {id: m.id + "DVD", mid: m.id, quantity: 1, price: 14.95, format: "DVD", movie: m}))} colored className="buy">Buy on DVD</Button> 
                        <Button onClick={() => store.dispatch(addItem(item = {id: m.id + "Bluray", mid: m.id, quantity: 1, price: 19.95, format: "Bluray", movie: m}))} colored className="buy">Buy on Bluray</Button>
                    </Movie>
                </Card>
                </Cell>
            );
        }
        return ( 
             <div>
                <Layout className="sideNav" fixedDrawer>
                    <Drawer className="drawer">
                        <form className="search-form">
                            <input value={this.state.input} placeholder="Search for Movies" type="text" className="text-field" onChange={(s) => this.getMovies(SEARCH_API, s)} style={{width:'195px', height: '30px', fontSize:'20px'}}/>
                        </form>
                        <Navigation className="sideNav">
                            {genres}
                        </Navigation>
                    </Drawer>
                </Layout>
            <div className="container">
                <div className="pages">
                    {totalPages}
                    <Button className="raised" id="nextPage"
                    onClick={() => this.movePage(-1)}>
                        Previous
                    </Button>
                    <Button className="raised" id = "prevPage"
                    onClick={() => this.movePage(1)}>
                        Next
                    </Button>
                </div>
                <div style={{width: '100%',  margin: '0px', marginTop: '0px'}}>
                    <Grid className="grid">
                        {movies}
                    </Grid>
                </div>
            </div>
            </div>

        );
    }
}