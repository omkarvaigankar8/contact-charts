import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: any) => {
    return (
        <>
            <div className='flex flex-auto min-h-screen'>
                <Sidebar />
                <div className='grow'>
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout