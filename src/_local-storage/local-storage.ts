

export const saveState = (state: { auth: boolean }) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('auth', serializedState);
    } catch {
        // ignore write errors
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('auth');
        if (serializedState === null) {
            return undefined;
        }
        let data = JSON.parse(serializedState)
        return data.auth;
    } catch (err) {
        return undefined;
    }
};

export const deleteState  = () => {
    localStorage.removeItem('auth')
}