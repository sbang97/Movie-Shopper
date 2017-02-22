import React from "react";
import {store, removeItem, quantityCount} from "../shared-state.js";
import Movie from "./movie.jsx";
import {Button, Card, Navigation, Grid} from 'react-mdl';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = store.getState();
    }

    componentDidMount() {
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsub();
    }

    quantityChange(item, change) {
        item.quantity += change;
        console.log(item.quantity);
    }
    render() {
        var items;
        if (this.state.cart) {
            //when the user clicks the Remove button, create and dispatch
            //a remove favorite action, specifying the unique item ID value
            items = this.state.cart.map(item => 
            <tr key={item.mid}>
                <td>
                    <Card className="card" shadow={0} style={{width: '500px', height: '225px'}}>
                        <Movie movie={item.movie}>
                            <Button onClick={() => store.dispatch(removeItem(item.id))}>
                                Remove
                            </Button>
                        </Movie>
                    </Card>
                </td>
                <td>
                    <div>
                        <p className="details"> {item.format}</p>
                    </div>
                </td>
                 <td>
                    <div>
                        <p className="details"> <button onClick={() => item.quantity -= 1}> - 
                        </button> {item.quantity} <button onClick={() => item.quantity = item.quantity + 1}> + </button></p>
                    </div>
                </td>
                  <td>
                    <div>
                        <p className="details"> {item.price * item.quantity} </p>
                    </div>
                </td>
            </tr>);
        }
        return (
            <div className="cart">
                <h2>Your Cart</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                Movies
                            </th>
                            <th>
                                Format
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Price
                            </th>
                        </tr>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}