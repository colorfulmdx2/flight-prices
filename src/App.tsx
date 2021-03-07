import React, {useEffect} from 'react';
import './App.scss';
import {LoginPage} from "./components/login-page/login-page";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux-store/store";
import {FlightInfo} from "./components/flight-info/flight-info";
import {setAuthWatcherAction} from "./redux-store/reducer";
import {Redirect, Route} from 'react-router-dom';

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAuthWatcherAction()) //initialization
    }, [dispatch])

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.reducer.auth)

    return (
        <>
            {!isAuth && <Redirect to={'/login'}/>}

            <Route exact path={'/'} render={() => <FlightInfo/>}/>
            <Route path={'/login'} render={() => <LoginPage/>}/>
        </>
    );
}

export default App;
