import React, { Component } from 'react'
import {connect} from 'react-redux'
import PostThumbnail from './postThumbnail'
import '../assets/stylesheets/category.css'

class Category extends Component {
    render(){
        if(this.props.categoryNotFound && this.props.categoryNotFound===true){
            return(
                <div className="container">
                    <div className="alert alert-danger">
                        <p>Sorry! we counldn't find the category you are looking for :(</p>
                    </div>
                </div>
            )
        }
        return(
        <div className="container">
            <div className="row">
            </div>
            <div className='row'>
                {this.props.posts && this.props.posts.map((post) => (
                <PostThumbnail
                title={post.title}
                body={post.body}
                author={post.author}
                timestamp={post.timestamp}
                voteScore={post.voteScore}
                commentCount={post.commentCount}
                id={post.id}
                key={post.id}
                col={5}
                category={post.category}
                />
                ))}
            </div>
        </div>
        )
    }
}
function mapStateToProps(state,ownprops){
    const posts = state.posts.posts.filter((post) => (post.category === ownprops.match.params.category))
    if(posts.length===0){
        return{
            categoryNotFound:true
        }
    }
    return{
        posts:posts
    }
}
export default connect(mapStateToProps)(Category)