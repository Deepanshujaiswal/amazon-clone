// import React from 'react'
// import './Header.css'
// import {useStateValue} from './StateProvider'
// import SearchIcon from '@material-ui/icons/Search';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import { Link } from 'react-router-dom';
// import { auth } from './firebase';
// function Header() {
//     const [{basket,user},dispatch]=useStateValue();
//     const handleAuthentication=()=>{
//         if(user)
//         {
//             auth.signOut();
//         }
//     }

//     return (
//         <div className='header'>
//             <Link to="/">
//             <img  className="imglogo"
//             src="ttp://pngimg.com/uploads/amazon/amazon_PNG11.png" />
//             </Link>
           
//         <div className="header_search">
//         <input className="header_searchInput" 
//          type="text" />
//          <SearchIcon
//            className="searchicon" />
//         </div> 
//         <div className="header_nav">
//             <Link to={!user && './login'}>
//             <div onClick={handleAuthentication} className="header_option">
//                 <span className="header_option1">
//                     Hello,{user ? user.email:'guest'}
//                 </span>
//                 <span className="header_option2">
//                     {user ? 'Singh Out': 'Singh In'}
//                 </span>
//             </div>
//             </Link>


//             <Link to='/orders'>

//             <div className="header_option">

//                 <span className="header_option1">
//                     Return
//                 </span>
//                 <span className="header_option2">
//                     & Orders
//                 </span>

//             </div>
//             </Link>

//             <div className="header_option">
//             <span className="header_option1">
//                     Your
//                 </span>
//                 <span className="header_option2">
//                     Prime
//                 </span>


//             </div>

//         </div>
        
//        <Link to="/checkout">
//        <div className="header_optionBasket">
//         <ShoppingBasketIcon />
//         <span className="header_option2 header_basketCount" >
//             {basket?.length} </span>
//         </div>
//        </Link>
      

// </div>);
    
// }

// export default Header


import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
