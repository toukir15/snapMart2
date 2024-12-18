import { Input } from '@nextui-org/input'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

export default function ImageUploader({ imagePreviews, onChange, onRemove, multiple, required = false }: any) {
    return (
        <div className="col-span-full">
            <Input variant='bordered' type="file" required={required} multiple={multiple} accept="image/*" onChange={onChange} />
            <div className="grid grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((preview: any, index: any) => (
                    <div
                        key={`${preview.file.name}-${index}`}
                        className="relative group"
                    >
                        <img
                            src={preview.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => onRemove(preview.file)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                            <IoCloseSharp />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
