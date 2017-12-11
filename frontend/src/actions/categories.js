import { ADD_CATEGORIES } from './types'
import { getAllCategoriesServer } from '../utils/api'

export function addCategories({ categories }) {
    return {
        type: ADD_CATEGORIES,
        categories
    }

}

export function fetchAllCategories() {
    return function(dispatch) {
        return getAllCategoriesServer().then((categories) => {
            dispatch(addCategories({ categories }))
        })
    }
}