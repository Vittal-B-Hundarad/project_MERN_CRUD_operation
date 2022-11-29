import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    return (
        <div>
            <img src="https://pbs.twimg.com/profile_images/999219501978681344/r3804TLb_400x400.jpg" alt="logo" className="logo"></img>
            <p className="kletech">KLE TECH SHOPPING MALL</p>
            {auth ?<ul className="nav-ul">
                <li><Link to="/">Items</Link></li>
                <li> <Link to="/add">Add Items</Link></li>
                {/* <li><Link to="/update">Update Products</Link></li> */}
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
            <ul className="nav-ul nav-right">
                <li><Link to="/signup">SignUp</Link></li>
                <li><Link to="/login">Admin Log IN</Link></li>
            </ul>
            }
        </div>
    );
};

export default Nav;
