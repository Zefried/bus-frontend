const customState = {
  AuthState: { 
    isAuthenticated: false, 
    userId: null 
  },


  listeners: [],
};

const AuthAction = {

    initiateAuthState: () => {
        localStorage.setItem('auth', JSON.stringify(customState.AuthState));
        
        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    updateState: (newState) => {
        customState.AuthState = { ...customState.AuthState, ...newState };
        localStorage.setItem('auth', JSON.stringify(customState.AuthState));

        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    getState: (key) => {
        const saved = localStorage.getItem(key);
        if (saved) {
        customState.AuthState = JSON.parse(saved);
        }

        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    resetState: () => {
        return AuthAction.initiateAuthState();
    },

    subscribe: (listenerFunction) => {
        customState.listeners.push(listenerFunction);
        listenerFunction(customState.AuthState);
    },
};





export { AuthAction, customState };
