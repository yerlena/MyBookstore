import { StoreStateType } from './index';
import { StoreActionTypes } from './constants';

export default (
    state: StoreStateType,
    action: { type: StoreActionTypes; payload?: any }
): StoreStateType => {
    const { type, payload } = action;
    switch (type) {
        case StoreActionTypes.START_LOADING:
            return {
                ...state,
                startLoad: false,
                isLoadingInProgress: payload.isLoadingInProgress
            };
        case StoreActionTypes.ALL_DATA_LOADED:
            return {
                ...state,
                isAllDataLoaded: payload.isAllDataLoaded,
                volumes: payload.volumes
            };
        case StoreActionTypes.FIRST_PAGE_LOADED:
            return {
                ...state,
                isFirstPageLoaded: payload.isFirstPageLoaded,
                volumes: payload.volumes
            };
        case StoreActionTypes.SET_PAGE_TO_LOAD:
            return {
                ...state,
                lastToLoad: payload.lastToLoad,
                loadedCallback: payload.loadedCallback
            };
            case StoreActionTypes.ADD_VOLUME_TO_CART:
            return {
                ...state,
                volumesInCart: [...state.volumesInCart, payload]
            };
        default:
            return state;
    }
};
