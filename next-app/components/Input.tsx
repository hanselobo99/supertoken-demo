import {RegisterOptions, UseFormRegister} from "react-hook-form";

type inputProps = {
    name: string,
    placeholder: string,
    type: string,
    label: string,
    register: UseFormRegister<any>
    error: string | undefined,
    rules: RegisterOptions
}

const Input = (props: inputProps) => {
    return (
        <div>
            <label htmlFor={props.name}
                   className="block text-sm font-medium text-gray-900 dark:text-white">
                {props.label}</label>
            <input {...props.register(props.name, {...props.rules})}
                type={props.type} name={props.name} id={props.name}
                   className="bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={props.placeholder}/>
            {props.error && <p className="mt-2 text-sm text-red-600 ">
                <span className="font-medium"></span> {props.error} </p>}
        </div>
    )
}

export default Input