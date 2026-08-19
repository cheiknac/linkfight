import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.tsx';
import './Login.scss';
import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'


export default function Login() {

    const { setUser } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || 'Email ou mot de passe incorrect');
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);

            setUser(data.user);

            navigate(`/profil/${data.slug}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <div>
            <Header />
            <h1>Connexion</h1>

            <div id="formLogin">
                    <form onSubmit={handleSubmit}>

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

                        {error && <p className="errorMessage">{error}</p>}

                        <div>
                            <button type="submit" className="btnValidate" disabled={isLoading}>
                             {isLoading ? 'Connexion...' : 'Valider'}
                            </button>
                        </div>

                    </form>
                </div>

            <Footer />
        </div>
    );

}