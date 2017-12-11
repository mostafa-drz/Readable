import React, { Component } from 'react'
import {connect} from 'react-redux'
import {changeVote,deletePostServer} from '../utils/api'
import {updateScore,updateCommentCount,deletePost,updatePost} from '../actions/posts'
import {getAllPostComments,addNewComment,updatePostServer} from '../utils/api'
import Comment from './comment'
import '../assets/stylesheets/post.css'
import Modal from 'react-modal'
class Post extends Component {
    state={
        editMode:false,
        errors:[],
        showError:false,
        id:''
    }
    constructor(props){
        super(props);
        this.closeModal=this.closeModal.bind(this)
    }

componentDidMount(){
   getAllPostComments(this.props.match.params.post_id).then((comments) => {
       this.setState(() => ({
           comments:comments
       }))
   })
}

voteComment(id,vote){
    this.setState((preState) => ({
        ...preState,
        comments:preState.comments.reduce((accu,current) => {
            if(current.id===id){
                switch(vote){
                    case 'upVote':
                        return accu.concat({
                            ...current,
                            voteScore:current.voteScore+1
                        })
                    case 'downVote':
                        return accu.concat({
                            ...current,
                            voteScore:current.voteScore-1
                        })
                    default:
                        return accu.concat(current)
                }
            }else{
                return accu.concat(current)
            }
        },[])
    }))
    this.setState((preState) => ({
        ...preState,
        comments:preState.comments.slice().sort((a,b) => {
            if(a.voteScore>b.voteScore){
                      return -1
                    }else if(a.voteScore<b.voteScore){
                        return 1
                    }
                    return 0
      
        }
        )
    
    }))
}

removeComment(id){
    this.setState((preState) => ({
        ...preState,
        comments:preState.comments.filter((comment) => (comment.id!==id))
    }))
    this.props.updateCommentCount({id:this.props.id,amount:-1})
}

editComment(id,body){
    this.setState((preState) => ({
        ...preState,
        comments:preState.comments.reduce((accu,current) =>{
            if(current.id===id){
                return accu.concat({
                    ...current,
                    body:body
                })
            }
            return accu.concat(current)
        },[])
    }))
}

closeModal(){
    this.setState((preState) =>({
        ...preState,
        editMode:false
    }))
}

editThePost(){
    this.setState((preState) =>({
        ...preState,
        errors:[],
        showError:false
        }))
        const title=document.getElementById('title').value;
        if(title.length<=0){
        this.setState((preState) =>({
            ...preState,
            showError:true,
            errors:preState.errors.concat('You should add a title')
        }))
        }
        const category=document.getElementById('category').value
        if(category.length<=0){
        this.setState((preState) =>({
            ...preState,
            showError:true,
            errors:preState.errors.concat('You should select a category')
        }))
        }

        const body=document.getElementById('body').value
        if(body.length<=0){
        this.setState((preState) =>({
            ...preState,
            showError:true,
            errors:preState.errors.concat('You can not add a post with empty body')
        }))
        }
        const author=document.getElementById('author').value
        if(author.length<=0){
        this.setState((preState) =>({
            ...preState,
            showError:true,
            errors:preState.errors.concat('You should insert the name of author')
        }))
        }
        if(this.state.showError===true){
        document.getElementById('error').style.display='block'
        return
        }else{
        document.getElementById('error').style.display='none'
        updatePostServer(this.props.id,{title:title,body:body,author:author,category:category}).then((data) =>{
            this.props.updatePost({id:this.props.id,updatedPost:data})
            this.closeModal()
        })
        }
}

    render() {
        if(this.props.postNotFound && this.props.postNotFound===true){
            return (
                <div className="container">
                    <div className="alert alert-danger">
                        <p>sorry we couldn't find the post you are looking for :(</p>
                    </div>
                </div>
            )
        }
         return !this.state.editMode ? (
            <div className='post'>
                <div className="container">
                <article className='post-main'>
                        <div className='post-action'><span className='glyphicon glyphicon-edit' onClick={() => {
                            this.setState(() => ({
                                editMode:true
                            }))
                        }}></span> - <span className='glyphicon glyphicon-remove' onClick={() => {
                            deletePostServer(this.props.id).then(() => {
                                {this.props.history.push("/")}
                                this.props.deletePost({id:this.props.id})
                            })
                        }}></span></div>
                        <h1 className='post-title'>{this.props.title}</h1>
                    <p className='post-body'>
                        {this.props.body}
                    </p>
                    <footer>
                    <div className="post-info"><span>written by:{this.props.author}</span> - <span>{new Date(this.props.timestamp).toLocaleDateString()}</span></div>
                    {<p><span className="glyphicon glyphicon-thumbs-up" aria-hidden="true" onClick={() => changeVote(this.props.id,this.props.voteScore,1).then(() =>this.props.updateScore({id:this.props.id,value:1}))} ></span> <span> {this.props.voteScore} </span>
                    <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true" onClick={ () => changeVote(this.props.id,this.props.voteScore,-1).then(() =>this.props.updateScore({id:this.props.id,value:-1}))} > </span> <span className='glyphicon glyphicon-comment'><span className='text'>{this.props.commentCount}</span></span></p>}
                    </footer>
                    </article>
                <div>
                    {this.state.comments && this.state.comments.map((comment) => (
                        <Comment
                        body={comment.body}
                        author={comment.author}
                        id={comment.id}
                        timestamp={comment.timestamp}
                        voteScore={comment.voteScore}
                        key={comment.id}
                        onVoteComment={(id,vote) => {
                            this.voteComment(id,vote)
                        }}
                        onRemoveComment={(id) => {
                            this.removeComment(id)
                        }}
                        onEditComment={(id,body) => {
                            this.editComment(id,body)
                        }}
                        />
                    ))}
                        <div className="well new-comment">
                            <form>
                                <div className="form-group">
                                <input type="text" placeholder='your name' id='author'/>
                                </div>
                                <div className="form-group">
                                <textarea placeholder='your comment' className='form-control' id='body'></textarea>
                                <br/>
                                <button className='btn btn-primary' onClick={(e) =>{
                                    e.preventDefault();
                                    const author=document.getElementById('author').value
                                    const body=document.getElementById('body').value
                                    const comment={
                                        author:author,
                                        body:body,
                                        timestamp:Date.now(),
                                        id:Math.random().toString(36).slice(3,10),
                                        parentId:this.props.id,
                                    }
                                    addNewComment(comment).then((data) => {
                                        document.getElementById('author').value=''
                                        document.getElementById('body').value=''
                                        this.setState((preState) => ({
                                            ...preState,
                                            comments:preState.comments.concat(data)
                                        }))
                                        this.props.updateCommentCount({id:this.props.id,amount:1})
                                    })
                                }}>Send your comment</button>
                                </div>

                            </form>
                        </div>
                </div>
                </div>
            </div>
        )
        : (
        <Modal
          isOpen={this.state.editMode}
          onRequestClose={this.closeModal}
          >
          <form>
            <div className="alert alert-danger" style={{display:'none'}} id='error'>
            <ul>
                {this.state.showError && this.state.errors && this.state.errors.length>0 && this.state.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' defaultValue={this.props.title} id='title' />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' defaultValue={this.props.author} id='author'/>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category </label>
              <select defaultValue={this.props.category} name="category"  id="category">
                <option value="">Select a category</option>
                {this.props.categories && this.props.categories.map((category) => (
                     <option value={category.name} key={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <textarea name="body" id="body" cols="30" rows="10" className="form-control" defaultValue={this.props.body}></textarea>
            </div>
                <button className="btn btn-warning" onClick={(e) =>{
                  e.preventDefault()
                  this.editThePost()
                }
                
                }
                >Edit the post</button>
          </form>
          </Modal>
        )
    }
}

function mapStateToProps(state,ownProps){
    const post=state.posts.posts.filter((element) =>(element.id===ownProps.match.params.post_id))[0]
    if(post)
    {
        return {
            id:post.id,
            category:post.category,
            title:post.title,
            author:post.author,
            body:post.body,
            commentCount:post.commentCount,
            voteScore:post.voteScore,
            timestamp:post.timestamp,
            categories:state.categories.categories

        }
    }
    else{
        return{
            postNotFound:true
        }
    }
}

export default connect(mapStateToProps,{updateCommentCount,deletePost,updateScore,updatePost})(Post)