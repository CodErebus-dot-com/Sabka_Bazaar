import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const login = (email, password) => {
        setIsAuth(true);
        setEmail(email);
        setPassword(password);
    };
    
    const logout = () => {
        setIsAuth(false);
        setEmail(null);
        setPassword(null);
    };
    
    return (
        <AuthContext.Provider value={{ isAuth, email, password, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
    // return useContext(AuthContext);
}