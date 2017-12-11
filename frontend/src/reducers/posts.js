import {
    ADD_POST,
    UPDATE_SCORE,
    SORT_POSTS,
    UPDATE_COMMENT_COUNT,
    DELETE_POST,
    UPDATE_POST,
    GET_ALL_POSTS,
} from '../actions/types'


function posts(state = { posts: [], history: [] }, action) {
    switch (action.type) {
        case ADD_POST:
            const newPost = {}
            newPost.title = action.title
            newPost.author = action.author
            newPost.timestamp = action.timestamp
            newPost.id = action.id
            newPost.body = action.body
            newPost.category = action.category
            newPost.voteScore = action.voteScore
            newPost.deleted = action.deleted
            newPost.commentCount = action.commentCount
            return {
                ...state,
                posts: state.posts.concat(newPost)
            }
        case UPDATE_SCORE:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === action.id) {
                        return Object.assign({}, post, { voteScore: post.voteScore + action.value })
                    }
                    return post
                }).sort((a, b) => {
                    if (a.voteScore > b.voteScore) return -1
                    else return 1
                })
            }
        case SORT_POSTS:
            return {
                ...state,
                posts: state.posts.slice().sort((a, b) => {
                    if (a[action.order] > b[action.order]) {
                        return -1
                    }
                    if (a[action.order] < b[action.order]) {
                        return 1
                    }
                    return 0
                })
            }
        case UPDATE_COMMENT_COUNT:
            return {
                ...state,
                posts: state.posts.reduce((accu, current) => {
                    if (current.id === action.id) {
                        return accu.concat({
                            ...current,
                            commentCount: current.commentCount + action.amount
                        })
                    }
                    return accu.concat(current)
                }, [])
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.id)
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.id).concat(action.updatedPost)
            }
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: state.posts.concat(action.posts)
            }
        default:
            return state
    }
}

export default posts