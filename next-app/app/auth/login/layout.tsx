import React from "react";

const LoginLayout = ({children}: {
    children: React.ReactNode,
})  =>{
    return (
        <>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login Page
        </h1>
            {children}
        </>
    )
}

export default LoginLayout