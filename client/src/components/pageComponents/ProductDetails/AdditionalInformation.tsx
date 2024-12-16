import React from 'react'

export default function AdditionalInformation({ data }: any) {
    return (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="mt-1 text-gray-800">{data.department}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="mt-1 text-gray-800">{data.brand}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="mt-1 text-gray-800">{data.model}</p>
            </div>
        </div>
    )
}
