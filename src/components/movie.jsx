import React from "react";
import {ReadMore, Truncate} from 'react-read-more';
import {Button, Cell, Card, CardMenu, IconButton, CardText, CardTitle, CardActions, Drawer, Layout, Header, Textfield, Navigation, Content} from 'react-mdl';
import {store, addItem} from "../shared-state.js"; 
const BASEURL = "http://image.tmdb.org/t/p/";
const DEFAULTSIZE = "w154";
export default class extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="posterIMG">
                    <img src={BASEURL + DEFAULTSIZE + this.props.movie.poster_path} alt={this.props.movie.title}/>
                </div>
                <CardText className="card-text">
                    <CardTitle style={{padding: '0px', fontSize: '20px'}}> {this.props.movie.title}</CardTitle>
                     <ReadMore lines={3} onShowMore={this.props.onChange} text="more">  
                        <p>
                            {this.props.movie.overview}
                        </p>
                    </ReadMore>
                    <CardActions border style={{display: 'flex', boxSizing: 'border-box', alignItems: 'stretch'}}>
                        {this.props.children}
                    </CardActions>
                </CardText>
            </div>
        );
    }
}