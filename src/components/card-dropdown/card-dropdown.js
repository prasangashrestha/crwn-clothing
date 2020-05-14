import React from 'react';

import './card-dropdown.styles.scss'
import CustomButton from '../custom-button/custom-button';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {toggleCartHidden} from '../../redux/cart/cart.actions'

import CartItem from '../cart-item/cart-item';

const CartDropdown = ({cartItems, history, dispatch}) => {
    return(
        <div className="cart-dropdown">
            <div className="cart-items">
            {
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
            }
            </div>
            <CustomButton onClick = {() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            } }>GO TO CHECKOUT</CustomButton>
        </div>
    )
    
}

const mapStateToProps = ({cart: {cartItems}}) => ({
    cartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))