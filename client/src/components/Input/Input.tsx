import React, { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    Icon?: IconType
}

const Input: React.FC<Props> = ({ label, required, Icon = null, ...rest }) => {
    return (
        <label htmlFor={label} className={rest.className}>
            <span>
                {label}
                {required ? <span className="text-red-600">*</span> : null}
            </span>
            <div className="flex items-center gap-2 border-b border-slate-400">
                {Icon ? <Icon /> : null}
                <input id={label} {...rest} className="flex-1 p-3 focus:outline-none w-full" />
            </div>
        </label>
    )
}

export default Input
