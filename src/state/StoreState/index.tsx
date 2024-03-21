import React, {ReactNode, useContext} from 'react';
import noop from 'lodash/noop';
import reducer from './reducer';
import { VolumeData } from '../../components/Volume/Volume';
import { StoreActionTypes } from './constants';
import useStore from './useStore/useStore';

export interface StoreStateType {
    totalVolumes: number;
    isFirstPageLoaded: boolean;
    isLoadingInProgress: boolean;
    isAllDataLoaded: boolean
    volumes: VolumeData[]; 
    dispatch: React.Dispatch<{type: StoreActionTypes; payload?: any}>;
    volumesInCart: VolumeData[],
    startLoad: boolean,
    lastToLoad: number;
    loadedCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

export const initialState: StoreStateType = {
    totalVolumes: 0,
    isFirstPageLoaded: false,
    isLoadingInProgress: false,
    isAllDataLoaded: false,
    volumes: [], 
    volumesInCart: [],
    dispatch: noop,
    startLoad: false,
    lastToLoad: 0,
    loadedCallback: noop
};

export const StoreStateContext =
    React.createContext<StoreStateType>(initialState);

export const useStoreContext = () => useContext(StoreStateContext);

interface ContextProviderProps {
    children: ReactNode;
}

const StoreContextProvider = ({children}: ContextProviderProps) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const storeState = useStore();

    return (
        <StoreStateContext.Provider value={{...state, ...storeState,dispatch}}>
            {children}
        </StoreStateContext.Provider>
    );
};

export default StoreContextProvider;
