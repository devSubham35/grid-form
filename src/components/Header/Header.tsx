import React from 'react'
import ThemeToggler from '../Theme/ThemeToggler'
import { Separator } from '../ui/separator'

const Header = () => {
    return (
        <div className='w-full px-5 py-4'>
            <div className='w-full flex justify-end'>
                <ThemeToggler />
            </div>
            <Separator className="mt-4" />
        </div>
    )
}

export default Header