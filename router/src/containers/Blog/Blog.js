import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
// import axios from 'axios';
import axios from '../../axios';

import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';
import './Blog.css';

class Blog extends Component {

    render () {
            return (
            <div className="Blog">
                <header>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to={{
                                    pathname: '/new-post',
                                    hash: '#Submit',
                                    search: '?quick=true'
                                }}>New Post</Link></li>
                            </ul>
                        </nav>
                </header>
                {/*<Route path="/"  exact render={() =>(<h1>HOME</h1>)}/>
                <Route path="/new-post"  render={() =>(<h1>New Post</h1>)}/>
                */ }
                <Route path="/" exact component={Posts}/>
                <Route path="/new-post" exact component={NewPost}/>
                
                
                </div>
        );
    }
}

export default Blog;