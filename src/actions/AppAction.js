import PepolesService from '../services/PepolesService'

export function loadPepoles(filterBy) {
    return async dispatch => {
        const pepoles = await PepolesService.getPepoles(filterBy);
        dispatch({ type: 'SET_PEPOLES', pepoles })
    }
}

export function loadPepole(id) {
    return async dispatch => {
        const currPepole = await PepolesService.getPepole(id);
        dispatch({ type: 'SET_CURR_PEPOLE', currPepole })
    }
}
