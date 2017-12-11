import React,{Component} from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {addPostServer} from '../utils/api'
import {addPost} from '../actions/posts'
class NewPost extends Component{
    state={
        modalIsOpen:false
    }

    constructor(props){
        super(props)
        this.closeModal = this.closeModal.bind(this)
    }
    closeModal(){
        this.setState(() => ({
            modalIsOpen:false
        }))
        this.props.onCloseModal()
    }

    componentWillMount(){
        this.setState(() => ({
            modalIsOpen:true
        }))
    }

    addThePost(){
         this.setState((preState) => ({
                    ...preState,
                    errors: [],
                    showError: false
                }))
                const title = document.getElementById('new_title').value;
                if (title.length <= 0) {
                    this.setState((preState) => ({
                        ...preState,
                        showError: true,
                        errors: preState.errors.concat('You should add a title')
                    }))
                }
                const category = document.getElementById('new_category').value
                if (category.length <= 0) {
                    this.setState((preState) => ({
                        ...preState,
                        showError: true,
                        errors: preState.errors.concat('You should select a category')
                    }))
                }

                const body = document.getElementById('new_body').value
                if (body.length <= 0) {
                    this.setState((preState) => ({
                        ...preState,
                        showError: true,
                        errors: preState.errors.concat('You can not add a post with empty body')
                    }))
                }
                const author = document.getElementById('new_author').value
                if (author.length <= 0) {
                    this.setState((preState) => ({
                        ...preState,
                        showError: true,
                        errors: preState.errors.concat('You should insert the name of author')
                    }))
                }
                if (this.state.showError === true) {
                    document.getElementById('new_error').style.display = 'block'
                    return
                } else {
                    document.getElementById('new_error').style.display = 'none'
                    addPostServer(title, category, body, author).then((post) => {
                        this.props.addPost(post)
                        this.closeModal()
                    })
                }
    }
    render(){
        return(
        <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        >
        <form>
            <div className="alert alert-danger" style={{ display: 'none' }} id='new_error'>
                <ul>
                    {this.state.showError && this.state.errors && this.state.errors.length > 0 && this.state.errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
            <div className='form-group'>
                <input type='text' className='form-control' placeholder='title' id='new_title' />
            </div>
            <div className='form-group'>
                <input type='text' className='form-control' placeholder='author' id='new_author' />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category </label>
                <select name="category" id="new_category">
                    <option value="">Select a category</option>
                    {this.props.categories && this.props.categories.map((category) => (
                        <option value={category.name} key={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <textarea name="body" id="new_body" cols="30" rows="10" className="form-control"></textarea>
            </div>
            <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault()
                this.addThePost()
            }

            }
            >Add the post</button>
        </form>
    </Modal>     
        )
    }
}
function mapStateToProps(state){
    return{
        categories:state.categories.categories
    }
}
export default connect(mapStateToProps,{addPost})(NewPost)