"use client"
import {useForm} from "react-hook-form";
import Input from "../../../components/Input";
import Link from "next/link";
import {useEffect} from "react";

type Inputs = {
    name: string,
    username: string
    password: string
    confirmPassword: string
}
const Signup = () => {
    const {register, handleSubmit,setValue, watch, formState: {errors}} = useForm<Inputs>()
    useEffect(() => {
        setValue("name", "Hansel@4")
        setValue("password", "Hansel@4")
        setValue("confirmPassword", "Hansel@4")
        setValue("username", "siza@gmail.com")
    }, [])

    const onSubmit = async (data:Inputs) => {
        await fetch("http://localhost:3000/auth/register", {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(r => {
            console.log(r)
        }).catch(r => {
            console.log(r)
        })
    }
    return (
        <>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Input name="name" placeholder="john doe" type="text" label="Name"
                       error={errors.name?.message} register={register}
                       rules={{required: "This field is required"}}/>
                <Input name="username" placeholder="johndoe@company.com" type="email" label="Your email"
                       error={errors.username?.message} register={register}
                       rules={{required: "This field is required"}}/>
                <Input name="password" placeholder="Your password" type="password" label="Password"
                       error={errors.password?.message} register={register}
                       rules={{
                           required: "This field is required",
                           minLength: {
                               value: 8,
                               message: "Password must have at least 8 characters"
                           },
                           pattern: {
                               value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                               message: "Enter a strong password"
                           }
                       }}/>
                <Input name="confirmPassword" placeholder="Retype the password" type="password" label="Confirm Password"
                       error={errors.confirmPassword?.message} register={register}
                       rules={{
                           required: "This field is required",
                           validate: value => value === watch("password") || "Passwords do not match"
                       }}/>

                <button type="submit"
                        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already registered?
                    <Link href="/auth/login"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Sign in</Link>
                </p>
            </form>
        </>
    )
}
export default Signup