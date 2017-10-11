const changeLang = (state = 'en', action) => {
    switch (action.type) {
        case 'SET_FR_LANG':
            return action.lang
        case 'SET_EN_LANG':
            return action.lang
        default:
            return state
    }
}