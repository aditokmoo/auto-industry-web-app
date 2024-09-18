import { createContext, useContext, useReducer, Dispatch } from 'react';

// Define the context and state types properly
type reducerStateType = {
    currentUser: string | null;
    userRoles: string[]; 
    persist: boolean;
};

type reducerActionType =
    | { type: 'SET_CURRENT_USER'; payload: string }
    | { type: 'SET_USER_ROLES'; payload: string[] }
    | { type: 'SET_PERSIST'; payload: boolean }
    | { type: 'RESET_AUTH' };

type AuthContextType = {
    state: reducerStateType;
    dispatch: Dispatch<reducerActionType>;
};

type ContextPropsType = {
    children: React.ReactNode;
};

// Create the context correctly
const AuthContext = createContext<AuthContextType | null>(null);

// Define the initial state with persist data
const persistData = localStorage.getItem('persist');
const initialState: reducerStateType = {
    currentUser: null,
    userRoles: [],
    persist: persistData ? JSON.parse(persistData) : false,
};

// Reducer function
function reducer(state: reducerStateType, action: reducerActionType): reducerStateType {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };
        case 'SET_USER_ROLES':
            return { ...state, userRoles: action.payload };
        case 'SET_PERSIST':
            return { ...state, persist: action.payload };
        case 'RESET_AUTH':
            return initialState;
        default:
            return state;
    }
}

// Context Provider component
export function AuthContextProvider({ children }: ContextPropsType) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value= {{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
}

// Hook to use the context
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext must be used within an AuthContextProvider');
    return context;
}