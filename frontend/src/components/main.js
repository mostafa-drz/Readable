import React,{Component} from 'react'
import {sortPosts,addPost} from '../actions/posts'
import PostThumbnail from './postThumbnail'
import { connect } from 'react-redux'
import '../assets/stylesheets/main.css'
class Main extends Component{
    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='row'>
                        <label htmlFor='order'>Sort by:  </label>
                        <select defaultValue='voteScore' name='sort' id='order' onChange={(e) => { this.props.sortPosts({ order: e.target.value }) }}>
                            <option value='voteScore'>Vote Score</option>
                            <option value='timestamp'>Time</option>
                        </select>
                    </div>
                    <hr/>
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
            </div>      

        )
    }
}

function mapStateToProps(state) {
    return ({
        posts: state.posts.posts,
        categories:state.categories.categories
    })
}

export default connect(mapStateToProps, { sortPosts, addPost })(Main)