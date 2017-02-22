import {createStore} from "redux";

const ADD_ITEM_ACTION = "additem";
const REMOVE_ITEM_ACTION = "removeitem";
const COUNT_QUANTITY = "countQuantity"
const DEFAULT_STATE = {cart: []};

const LS_KEY = "redux-store";

function reducer(state, action) {
    // switch is kinda like if/else 
    switch(action.type) {
        case ADD_ITEM_ACTION: 
            if (state.cart.find(item => item.id == action.item.id)) {
                action.item.quantity += 1;
            } else {
                var newState = Object.assign({}, state);
                newState.cart = newState.cart.concat(action.item);
                return newState;
            }
        case REMOVE_ITEM_ACTION:
            return Object.assign({}, state, {cart: state.cart.filter(item => item.id != action.id)});
        default:
            return state;
    }
}

export function addItem(item) {
    return {
        type: ADD_ITEM_ACTION,
        item: item
    }
}

export function removeItem(id) {
    return {
        type: REMOVE_ITEM_ACTION,
        id: id
    }
}

var savedState = JSON.parse(localStorage.getItem(LS_KEY));

export var store = createStore(reducer, savedState || DEFAULT_STATE);
store.subscribe(() => localStorage.setItem(LS_KEY, JSON.stringify(store.getState())));
