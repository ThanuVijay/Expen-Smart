import React from 'react'

export default function Spinner() {
    return (
        <div className='d-flex justify-content-center'>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}