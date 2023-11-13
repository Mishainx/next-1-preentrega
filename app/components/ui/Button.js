"use client"

const Button = ({children, className = '', ...args}) => {

    return (
        <button
            className={`${className}`}
            {...args}
        >
            {children}
        </button>
    )
}

export default Button