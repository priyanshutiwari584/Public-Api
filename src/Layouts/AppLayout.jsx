import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import SearchBar from '../Components/Search'
import Cart from '../Components/Cart'

export default function AppLayout() {
    return (
        <>
            <Header />
            <main className='min-h-full w-full'>
                <Outlet />
            </main>
        </>
    )
}
