import { useNavigate } from 'react-router-dom';
import './Header.scss'
import Logo from '../../assets/Logo_linkfight.png'
import { NavLink } from 'react-router'
import { useAuth } from '../../context/useAuth';

import btnDisconnect from '../../assets/deconnexion.png'


export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div>
            <div id="head">
                <div>
                    <img src={Logo} alt="logo linkefight" />
                </div>
                <div id="btnsNavigate">
                    {!user && (
                        <>
                            <button><NavLink to='/signup'>Inscription</NavLink></button>
                            <button className="logIn"><NavLink to='/login'>Connexion</NavLink></button>
                        </>
                    )}
                    {user && (
                        <img
                            style={{ width: '40px', cursor: 'pointer', marginLeft: '10px' }}
                            src={btnDisconnect}
                            alt="deconnexion"
                            onClick={handleLogout}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}