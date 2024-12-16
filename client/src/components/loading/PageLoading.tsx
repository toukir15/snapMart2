import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function PageLoading() {
    return (
        <div className="h-screen bg-black/30 fixed inset-0 z-[999] backdrop-blur-sm flex justify-center items-center">
            <Spinner size="lg" color="warning" />
        </div>
    )
}
