import { ADD_POST, UPDATE_SCORE, SORT_POSTS, UPDATE_COMMENT_COUNT, DELETE_POST, UPDATE_POST, GET_ALL_POSTS } from './types'
import { getAllPostsServer } from '../utils/api'
export function addPost({ id, timestamp, title, body, author, category, voteScore, deleted, commentCount }) {
    return {
        type: ADD_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted,
        commentCount
    }
}

export function updateScore({ id, value }) {
    return {
        type: UPDATE_SCORE,
        id,
        value
    }
}

export function sortPosts({ order }) {
    return {
        type: SORT_POSTS,
        order
    }
}

export function updateCommentCount({ amount, id }) {
    return {
        type: UPDATE_COMMENT_COUNT,
        amount,
        id
    }
}

export function deletePost({ id }) {
    return {
        type: DELETE_POST,
        id
    }
}

export function updatePost({ id, updatedPost }) {
    return {
        type: UPDATE_POST,
        id,
        updatedPost
    }
}

export function getAllPosts({ posts }) {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export function fetchAllPosts() {
    return function(dispatch) {
        return getAllPostsServer().then((posts) => {
            dispatch(getAllPosts({ posts }))
        })
    }
}