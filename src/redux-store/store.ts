import {applyMiddleware, combineReducers, createStore} from 'redux'
import {reducer} from "./reducer";
import createSagaMiddleware from 'redux-saga'
import {authWatcher} from "./saga/saga";


const rootReducer = combineReducers({
    reducer: reducer
})
let sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(authWatcher)



export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = typeof store


// @ts-ignore
window.store = store;

