import './Footer.scss'
import { NavLink } from 'react-router'


export default function Footer() {
    return (
        <div id="footerContainer">
                <div className="footerNav">
                    <NavLink to="">Qui sommes nous ?</NavLink>
                    <NavLink to="">Mentions légales</NavLink>
                    <NavLink to="">Politiques de confidentialité</NavLink>
                </div>

                <div className="credit">
                    <p>LinkFight Corporation © 2026</p>
                </div>
            
        </div>
    )
}