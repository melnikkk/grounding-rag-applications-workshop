
import SearchBar from "./SearchBar";
import logo from '../../../public/logo.svg'
import Image from "next/image";

function Nav(props) {
    return (
        <div className={`nav ${props.fixed? "nav-fixed" : ""} `} >
            <a href="/">
                <Image
                    className="nav__logo"
                    src={logo}
                    alt=""
                />
            </a>
            {props.showSearch ? <div className="search_bar">
                <SearchBar />
            </div> : <></>}
        </div>
    );
}

// Set default props
Nav.defaultProps = {
    showSearch: false,
    fixed: false
};

export default Nav;
