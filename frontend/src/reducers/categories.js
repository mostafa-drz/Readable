import { ADD_CATEGORIES } from '../actions/types'

function categories(state = { categories: [] }, action) {
    switch (action.type) {
        case ADD_CATEGORIES:
            return {
                ...state,
                categories: state.categories.concat(action.categories)
            }
        default:
            return state
    }
}

export default categories