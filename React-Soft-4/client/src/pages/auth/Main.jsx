import { useEffect, useState } from 'react';
import Login from './Login';
import Home from './Home';

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al parsear el token JWT:", error);
        return null;
    }
}

const Main = () => {
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const parsedToken = parseJwt(token);
            if (parsedToken && parsedToken.exp * 1000 > Date.now()) {
                setTokenValid(true);
            } else {
                setTokenValid(false);
            }
        } else {
            setTokenValid(false);
        }
    }, []);

    return (
        <>
            {tokenValid ? <Home /> : <Login />}
        </>
    );
};

export default Main;
