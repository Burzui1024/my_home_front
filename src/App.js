import './App.css';
import SignIn from "./SignIn";
import {useEffect, useState} from "react";
import SearchInCadastar from "./SearchInCadastar";


function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState(null)
    useEffect(() => {

    }, [isAuth, token]);
    return (
        <>
            {
                !isAuth ? <SignIn setIsAuth={setIsAuth} setToken={setToken}/> : <SearchInCadastar token={token}/>
            }
        </>
    );
}

export default App;
