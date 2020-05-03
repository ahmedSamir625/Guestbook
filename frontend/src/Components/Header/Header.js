import React from 'react'
import './Header.css'

const Header = ({ onRouteChange }) => {


    return (
        <div className="header-pos header-style">

            <div className="items-positions">
                <label className="title-style">GUESTBOOK</label>
                <label
                    className="logout"
                    onClick={onRouteChange.bind(this, 'Auth')}
                >Logout</label>

            </div>

            <div className="bottom-line"></div>
        </div>
    )
}

export default Header
