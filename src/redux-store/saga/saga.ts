import {loadState} from "../../_local-storage/local-storage";
import {setAuthStatus, setTicketData, setTicketDataWatcherAction} from "../reducer";
import {call, put, takeEvery} from 'redux-saga/effects'
import {ResponseDataType, skynnerAPI} from "../api-skyscanner/api";


export function* authWorker() {
    yield put(setAuthStatus(loadState()))
}

export function* fetchDataWorker(action: ReturnType<typeof setTicketDataWatcherAction>) {
    const data: ResponseDataType = yield call(skynnerAPI.getTicketData, action.date)
    yield  put(setTicketData(data))
}

export function* authWatcher() {
    yield takeEvery('SET_AUTH_STATUS_WATCHER', authWorker)
    yield takeEvery('SET_TICKET_DATA_WATCHER', fetchDataWorker)
}




