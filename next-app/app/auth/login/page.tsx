"use client"
import {useForm} from "react-hook-form";
import AuthLayout from "../layout";
import Link from "next/link";
import {useEffect, useRef} from "react";
import Input from "@/components/Input";
import axios from "axios";

type Inputs = {
    username: string,
    password: string
}
const Login = () => {
    const {register, handleSubmit, setValue, watch, formState: {errors},setError} = useForm<Inputs>()

    useEffect(() => {
        setValue("password", "Hansel@4")
        setValue("username", "hansel111@gmail.com")
    }, [])

    const onSubmit = async (data: Inputs) => {
        axios.post("http://localhost:3000/auth/login", data).then(r => {
            window.location.href = "/"
        }).catch(r => {
            console.log(r)
            setError("password",{type: 'custom',message: r.response?.data?.message})
        })
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input name="username" placeholder="yyy@company.com" type="email" label="Your email"
                   error={errors.username?.message} register={register}
                   rules={{required: "This field is required"}}/>
            <Input name="password" placeholder="Your password" type="password" label="Password"
                   error={errors.password?.message} register={register}
                   rules={{
                       required: "This field is required",
                   }}/>

            <button type="submit"
                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link href="/auth/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign up</Link>
            </p>
        </form>
    )
}
export default Login