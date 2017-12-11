import React,{Component} from 'react'
import {voteComment,removeComment,editComment} from '../utils/api'
import '../assets/stylesheets/comment.css'
class Comment extends Component{
    state={
        editMode:false,
    }

 
    render(){
        return(
            !this.state.editMode ? (
            <div className='comment'>
                <div className="well comment-container">
                <div className='comment-action'><span className='glyphicon glyphicon-edit' onClick={() => {
                    this.setState(() => ({
                        editMode:true
                    }))
                }}></span> - <span className='glyphicon glyphicon-remove' onClick={() =>{
                    removeComment(this.props.id).then(() =>{
                        this.props.onRemoveComment(this.props.id)
                    })
                }}></span></div>
                    <header>
                        <h3>{this.props.author}</h3>
                    </header>
                        <p>{this.props.body}</p>
                    <footer>
                        <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true" onClick={() => {
                            voteComment(this.props.id,'upVote').then(() =>{
                                this.props.onVoteComment(this.props.id,'upVote')
                            })
                        }}></span>
                        <span> {this.props.voteScore} </span> <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true" onClick={() =>{
                            voteComment(this.props.id,'downVote').then(() =>{
                                this.props.onVoteComment(this.props.id,'downVote')
                            })
                        }}></span> .
                        <span> {new Date(this.props.timestamp).toLocaleDateString()}</span>
                    
                    </footer>
                    </div> 
                </div>)
                : (
                  <div className='well'>
                    <div className='form-group'>
                        <header>
                            <h3>{this.props.author}</h3>
                        </header>
                    </div>
                    <div className="form-group">
                        <textarea id='body' className='form-control'>{this.props.body}</textarea>
                        <br/>
                        <button className='btn btn-primary' onClick={(e) =>{
                            e.preventDefault();
                            const body=document.getElementById('body').value
                            editComment(this.props.id,{body:body}).then(() => {
                                this.props.onEditComment(this.props.id,body)
                                this.setState(() => ({
                                    editMode:false
                                }))
                            })
                        }}>Edit</button>
                    </div>
                </div>
                )
        )
    }
}

export default Comment