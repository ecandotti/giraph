import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import ReactLoading from 'react-loading'

interface Props extends HTMLAttributes<HTMLButtonElement> {
    title: string
    loading?: boolean
    Icon?: IconType
}

const Button: React.FC<Props> = ({ className, title, loading, Icon, ...rest }) => {
    return (
        <button {...rest} className={`flex items-center rounded-full font-bold text-white bg-blue-600 px-6 py-2  ${className}`}>
            {Icon ? <Icon /> : null}
            {loading ? <ReactLoading type="spin" width={24} height={24} /> : title}
        </button>
    )
}

export default Button
