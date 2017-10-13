import { createStore, combineReducers } from 'redux';

// Actions
export const switchToFr = lang => ({
    type: 'SWITCH_TO_FR',
    lang
})

export const switchToEn = lang => ({
    type: 'SWITCH_TO_EN',
    lang
})

// Reducers
export const langReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SWITCH_TO_FR' :
            return action.lang
        case 'SWITCH_TO_EN' :
            return action.lang
        default :
            return state
    }
}

export const reducers = combineReducers({
    langReducer
})

// Store
export function configureStore(initialState = 'fr') {
    const store = createStore(
        langReducer,
        initialState
    )
    return store
}

export const store = configureStore();