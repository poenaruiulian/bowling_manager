import {createContext, useState} from 'react';

export const AuthContext = createContext({
    isLogged: false,
    setIsLogged: () => {}
})

