import React from 'react'

const user = (props) => (
    <div>
        <h1>{props.name}</h1>
        <p>{props.age}</p>
        <style jsx>{`
        div {
            border: 1px solid #eee;
        }
        `}</style>
    </div>
);

export default user;