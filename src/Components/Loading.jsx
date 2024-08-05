import React from 'react'
import HashLoader from "react-spinners/HashLoader";


export default function Loading() {
    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <HashLoader color="#66ff66" size={80} aria-label="Loading Spinner" />
        </div>
    )
}
