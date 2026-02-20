import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <header className=' bg-amber-300 border-b border-base-content/10'>
            <div className='ms-auto max-w-6x1 p-1'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3x1 font-bold text-primary font-mono tracking-tight'> BOOKSTORE </h1>
                    <div className='flex items-center gap-4'>
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className='size-5' /> <span> New Book </span>
                        </Link>
                    </div>
                </div>
            </div></header>
            )}
            export default Navbar
