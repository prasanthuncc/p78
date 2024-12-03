import {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';

import Menu from './Menu/Menu';
import Dashboard from './DashBoard/DashBoard';
import SummaryPage from './SummaryPage/SummaryPage';
import ReportPage from './ReportPage/ReportPage';
import Login from './Login/Login';

function App() {
    const navigate = useNavigate();
    const [isTokenAuthenticate, setIsTokenAuthenticate] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
            setIsTokenAuthenticate(false);
            return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log(decodedToken);

        const currentTime = Math.floor(Date.now() / 1000);
        const isTokenExpired = decodedToken.exp < currentTime;
        console.log(isTokenExpired);

        if (isTokenExpired) {
            localStorage.removeItem('token');
            setIsTokenAuthenticate(false);
            navigate('/login'); // Redirect to login page if the token has expired
        } else {
            setIsTokenAuthenticate(true);
        }
    }, [navigate]);

    return (
        <div className="App">
            <Menu className="navbar" isTokenAuthenticate={isTokenAuthenticate}
                  setIsTokenAuthenticate={setIsTokenAuthenticate}/>
            <div className='background'>
                <div className='mainContainer'>
                    <Routes>
                        <Route path='/' element={isTokenAuthenticate ? <Dashboard/> : <Login/>}/>
                        <Route path='/summary' element={isTokenAuthenticate ? <SummaryPage/> : <Login/>}/>
                        <Route path='/report' element={isTokenAuthenticate ? <ReportPage/> : <Login/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
