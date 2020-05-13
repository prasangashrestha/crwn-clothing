import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'

import {ReactComponent as Logo} from '../../assets/crown.svg';


import './header.styles.scss'
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../card-dropdown/card-dropdown';

const Header = ({currentUser, hidden}) => {
    return (
        <div className="header">
            <Link className= 'logo-container' to= "/crwn-clothing">
                <Logo className='Logo' />
            </Link>
       

            <div className="options">
                <Link className="option" to="/crwn-clothing/shop">
                    SHOP
                </Link>

                <Link className="option" to="/crwn-clothing/contact">
                    CONTACT
                </Link>
                {
                    currentUser?
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to="/crwn-clothing/signin">SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {hidden? null : <CartDropdown /> }
        </div>
    );

}

const mapStateToProps = ({user: {currentUser}, cart:{hidden}}) => ({
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);