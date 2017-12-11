import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {capitalizer} from '../utils/helpers'
import AddIcon from 'react-icons/lib/md/add-circle'
import '../assets/stylesheets/navigation.css'
import NewPost from './NewPost'
class Navigation extends Component {
        state = {
        modalIsOpen: false,
        showError: false,
        errors: [],
    }
    render() {
        return (
            !this.state.modalIsOpen ? (
            <div className="container-fluid">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" id='brand' to="/">Readble</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {this.props.categories && ( this.props.categories.map((category) => (
                                    <li className='nav-item' key={category.name}><Link to={`/${category.name}`}>{capitalizer(category.name)}</Link></li>
                                )))}
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <AddIcon size={50} className='add-new-post-icon' onClick={() =>{
                                    this.setState(() => ({
                                        modalIsOpen:true
                                    }))
                                }}/>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>)
            :(
                <NewPost onCloseModal={() =>this.setState(() => ({
                    modalIsOpen:false
                }))}/>
            )
        )
    }
}
function mapStateToProps(state){
    return {
        categories:state.categories.categories
    }
}
export default connect(mapStateToProps)(Navigation)