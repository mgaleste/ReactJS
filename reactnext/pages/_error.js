import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const errorPage = () => (
    <div>
        <h1>OOps!</h1>
        <p>go to <Link href="/"><a>Back</a></Link></p>
     </div>
);

export default errorPage;