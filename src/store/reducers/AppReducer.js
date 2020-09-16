const initialState = {
    msg: 'hello world',
    pepoles: [],
    currPerson: '',
    filterBy: ''
}
export default function AppReducer(state = initialState, action) {
    // console.log("action:", action.currPerson)
    switch (action.type) {
        case 'SET_PEPOLES':
            return {
                ...state,
                pepoles: action.pepoles
            }
        case 'SET_CURR_PERSON':
            return {
                ...state,
                currPerson: action.currPerson
            }
        case 'REMOVE_PERSON_BY_ID':
            return {
                ...state,
                pepoles: state.pepoles.splice(action.idxRemove, 1)
            }
        case 'ADD_PERSON':
            return {
                ...state,
                pepoles: [...state.pepoles, action.person]
            };
        case 'UPDATE_PERSON':
            return {
                ...state,
                pepoles: state.pepoles.map(person => {
                    return (person.id === action.person.id) ? action.person : person
                })
            }
        default:
            return state;
    }
}