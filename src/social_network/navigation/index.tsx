import { Link, useLocation } from "react-router-dom";
import { CiUser, CiSearch, CiLogin, CiHome, CiBowlNoodles, CiBoxList } from "react-icons/ci";
import { LiaUtensilSpoonSolid } from "react-icons/lia";


import "./index.css"
function Navigation() {
    const links = [
        { label: " ", icon: <CiBowlNoodles className="noodle" />},
        { label: "Home", icon: <CiHome className="fs-2" />},
        { label: "LogIn", icon: <CiLogin className="fs-2" />},
        { label: "Profile",  icon: <CiUser className="fs-2" /> },
        { label: "Search",  icon: <CiSearch className="fs-2" /> },
        { label: "Recipes",  icon: <CiBoxList className="fs-2" /> },
        { label: "Spoonacular", icon: <LiaUtensilSpoonSolid className="fs-2"/>}
    ];
    const { pathname } = useLocation();
    return (
        <ul className="navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/${link.label}`}> {link.icon } {link.label} </Link>
                </li>
            ))}
        </ul>
    );
}
export default Navigation;

