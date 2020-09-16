import PepolesService from '../services/PepolesService'

export function loadPepoles(filterBy) {
    return async dispatch => {
        const pepoles = await PepolesService.getPepoles(filterBy);
        dispatch({ type: 'SET_PEPOLES', pepoles })
    }
}

export function loadPerson(id) {
    return async dispatch => {
        const currPerson = await PepolesService.getPerson(id);
        dispatch({ type: 'SET_CURR_PERSON', currPerson })
    }
}
export function removePerson(id) {
    return async dispatch => {
        const idxRemove = await PepolesService.removePerson(id);
        dispatch({ type: 'REMOVE_PERSON_BY_ID', idxRemove })
    }
}
export function savePerson(personToAdd) {
    return async dispatch => {
        const person = await PepolesService.savePerson(personToAdd);
        if (personToAdd.id) {
            dispatch({ type: 'UPDATE_PERSON', person })
        } else {
            dispatch({ type: 'ADD_PERSON', person })
        }
    }
}