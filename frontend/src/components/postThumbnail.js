import React,{Component} from 'react'
import {connect} from 'react-redux'
import '../assets/stylesheets/PostThumbnail.css'
import {changeVote} from '../utils/api'
import {updateScore} from '../actions/posts'
import {Link} from 'react-router-dom'
class PostThumbnail extends Component{
    render(){
    return(
            <div className='post-thumbnail'>
                <div className={`col-md-${this.props.col} main`}>
                    <Link className='post-title' to={`/${this.props.category}/${this.props.id}`}>{this.props.title}</Link>
                    <p>
                        {this.props.body.length > 100 ? this.props.body.trim(0, 100) : this.props.body} <Link to={`/${this.props.category}/${this.props.id}`}>Read more</Link>
                    </p>
                    <footer>
                        <div className="post-info"><span>written by:{this.props.author}</span> - <span>{new Date(this.props.timestamp).toLocaleDateString()}</span></div>
                        {<p><span className="glyphicon glyphicon-thumbs-up" aria-hidden="true" onClick={() => changeVote(this.props.id,this.props.voteScore,1).then(() =>this.props.updateScore({id:this.props.id,value:1}))} ></span> <span> {this.props.voteScore} </span>
                        <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true" onClick={ () => changeVote(this.props.id,this.props.voteScore,-1).then(() =>this.props.updateScore({id:this.props.id,value:-1}))} > </span> <span className='glyphicon glyphicon-comment'><span className='text'>{this.props.commentCount}</span></span></p>}
                    </footer>
                </div>
            </div>
    )
}
}
function mapStateToProps(state){return{}}
export default connect(mapStateToProps,{updateScore})(PostThumbnail)