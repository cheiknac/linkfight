import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss'
import Logo from '../../assets/Logo_linkfight.png'
import { NavLink } from 'react-router'
import { useAuth } from '../../context/useAuth';

import btnDisconnect from '../../assets/deconnexion.png'


export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleLogout() {
        logout();
        setIsMenuOpen(false);
        navigate('/login');
    }

    function closeMenu() {
        setIsMenuOpen(false);
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

                <button
                    id="burgerBtn"
                    aria-label="Ouvrir le menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {isMenuOpen && (
                <div id="mobileMenu">
                    {!user && (
                        <>
                            <button onClick={closeMenu}>
                                <NavLink to='/signup'>Inscription</NavLink>
                            </button>
                            <button className="logIn" onClick={closeMenu}>
                                <NavLink to='/login'>Connexion</NavLink>
                            </button>
                        </>
                    )}
                    {user && (
                        <button className="disconnectBtn" onClick={handleLogout}>
                            <img src={btnDisconnect} alt="" style={{ width: '24px' }} />
                            Déconnexion
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}