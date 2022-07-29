import { Link } from "react-router-dom";
import React from 'react'

const Header = () => {
  return (
    <header className="Header">
        <h1>Posts</h1>
        <nav>
            <li>
                <Link to='/'>HOME</Link>
             </li>
             <li>
              <Link to='post'>Post</Link>  
            </li>
            <li>
              <Link to='user'>Users</Link>  
            </li>
        </nav>
    </header>
  )
}

export default Header