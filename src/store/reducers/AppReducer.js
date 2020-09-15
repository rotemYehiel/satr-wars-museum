const initialState = {
    msg: 'hello world',
    pepoles: [],
    currPepole: '',
    filterBy: ''
}
export default function AppReducer(state = initialState, action) {
    console.log("action:", action)
    switch (action.type) {
        case 'SET_PEPOLES':
            return {
                ...state,
                pepoles: action.pepoles
            }
        case 'SET_CURR_PEPOLE':
            return {
                ...state,
                currPepole: action.currPepole
            }
        default:
            return state;
    }
}