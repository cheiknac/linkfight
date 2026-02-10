import './Header.scss'
import Logo from '../../assets/react.svg'
import { NavLink } from 'react-router'


export default function Header() {
    return (
        <div>
            <div id="head">
                <div>
                    <img src={Logo} alt="logo linkefight" />
                </div>
                <div>
                    <button><NavLink to='/signup'>Inscription</NavLink></button>
                    <button className="logIn"><NavLink to='/login'>Connexion</NavLink></button>
                </div>
            </div>
        </div>
    )
}