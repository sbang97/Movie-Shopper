import React from "react";
import {Link, IndexLink} from "react-router"
import { Button, Icon, Drawer, Layout, Header, Textfield, Navigation, Content, Badge} from 'react-mdl';
import {store} from "../shared-state.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = store.getState();
    }

    componentDidMount() {
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        //unsubscribe from the store
        this.unsub();
    }

    render() {
        return (
                <div className="nav" style={{height: '3325px', position: 'relative'}}>
                    <Header className="top-header" title="Movie Shopper"> 
                    <Link to="/cart" activeClassName="active"><Badge text= {this.state.cart.length} overlap noBackground>
                            <Icon name="shopping_cart"/>
                        </Badge>
                    </Link>
                    <IndexLink to="/" activeClassName="topNav">Products</IndexLink>
                    </Header>
                         <main>
                            {this.props.children}
                        </main>
            </div>  

        );
    }
}
