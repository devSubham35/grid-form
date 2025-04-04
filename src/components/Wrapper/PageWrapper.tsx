import React from 'react'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full px-4'>
            {children}
        </div>
    )
}

export default PageWrapper