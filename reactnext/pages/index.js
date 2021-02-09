import React, {Component} from 'react'
import Link from 'next/link'
import Router from 'next/router'

class IndexPage extends Component{
    static async getInitialProps(context){
        console.log(context);
        const promise = new Promise((resolve,reject) =>{
            setTimeout(()=>{
                resolve({appName: 'Super App'})
            },1000);
        });
        //promise.then()
        return promise;
    }

    render(){
        return(
            <div>
                <h1>The Main Page {this.props.appName}</h1>
                <p>go to {" "}<Link href="/auth"><a>Auth</a></Link></p>
                <button onClick={() => Router.push('/auth')}>click to Auth</button>
            </div>
        );
    }
} 

export default IndexPage;