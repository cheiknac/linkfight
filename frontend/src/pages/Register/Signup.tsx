import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';

const initialFormData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    type: '',
    birthday: '',
    address: '',
    zip_code: '',
    city: '',
    avatar: '',
    legals: false,
};

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || "Erreur lors de l'inscription.");
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);

            navigate('/login'); // adapte la route de redirection
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Header />
            <div>
                <div>
                    <h1>Rejoignez-nous</h1>
                    <p>Veuillez remplir ce formulaire ci-dessous afin d'obtenir un compte</p>
                </div>

                <div id="formRegister">
                    <form onSubmit={handleSubmit}>
                        <label>Vous êtes</label>
                        <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="">-- Sélectionnez votre rôle</option>
                            <option value="sponsor">sponsor</option>
                            <option value="media">media</option>
                            <option value="sportif">Combattant</option>
                        </select>

                        <label>Prénom<span className="requireRed">*</span></label>
                        <input
                            id="firstname"
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />

                        <label>Nom<span className="requireRed">*</span></label>
                        <input
                            id="lastname"
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />

                        <label>Email<span className="requireRed">*</span></label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>Mot de passe<span className="requireRed">*</span></label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <label>Date de naissance<span className="requireRed">*</span></label>
                        <input
                            id="birthday"
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />

                        <label>Adresse<span className="requireRed">*</span></label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <label>Code postal<span className="requireRed">*</span></label>
                        <input
                            id="zip_code"
                            type="text"
                            name="zip_code"
                            value={formData.zip_code}
                            onChange={handleChange}
                            required
                        />

                        <label>Ville<span className="requireRed">*</span></label>
                        <input
                            id="city"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />

                        <label>Avatar<span className="requireRed">*</span></label>
                        <input
                            id="avatar"
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            required
                        />

                        <div className="ppBox">
                            <input
                                type="checkbox"
                                id="legals"
                                name="legals"
                                checked={formData.legals}
                                onChange={handleChange}
                                required
                            />
                            <label>J'accepte la <a href="#">politique de confidentialité</a></label>
                        </div>

                        {error && <p className="errorMessage">{error}</p>}

                        <div>
                            <button type="submit" className="btnValidate" disabled={isLoading}>
                                {isLoading ? 'Inscription...' : 'Valider'}
                            </button>
                        </div>

                    </form>
                </div>

            </div>

            <Footer />
        </div>
    );
}