import React from 'react'
import User from '../../components/User'

const indexAuthPage = (props) => (
    <div>
        <h1>The Auth Page - {props.appName}</h1>
        <User name="mixer" age="36"/>
    </div>
);

indexAuthPage.getInitialProps = context => {
    const promise = new Promise((resolve,reject) =>{
        setTimeout(()=>{
            resolve({appName: 'Super App'})
        },1000);
    });
    //promise.then()
    return promise;
}

export default indexAuthPage;