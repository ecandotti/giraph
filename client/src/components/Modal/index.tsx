import React from 'react'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: JSX.Element
}

const Modal: React.FC<Props> = ({ open, setOpen, children }) => {
    return (
        <div
            className={`${open ? 'absolute' : 'hidden'} top-0 bottom-0 left-0 right-0 z-20`}
            id="modal"
        >
            <div className="relative h-full w-full">
                <div className="p-4 flex justify-center items-center w-full h-full">
                    <div className="z-30 bg-white rounded-lg text-black p-4">
                        {children}
                        <div className="font-bold mt-4">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 rounded-full bg-red-600 text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex absolute top-0 bottom-0 left-0 right-0 z-20 bg-black opacity-60" />
            </div>
        </div>
    )
}

export default Modal
