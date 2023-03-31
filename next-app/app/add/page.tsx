"use client"
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import axios from "axios";
import Input from "@/components/Input";
import Link from "next/link";
import {SessionAuth, useSessionContext} from "supertokens-auth-react/recipe/session";
import {useRouter} from "next/navigation";

type Inputs = {
    title: string,
    description: string
}

const Add = () => {
    const {register, handleSubmit, setValue, watch, formState: {errors}, setError} = useForm<Inputs>()
    const router = useRouter();
    const session = useSessionContext();
    useEffect(() => {
            setValue("title", "Title")
            setValue("description", "Description")

            if (!(session.loading) && !session.doesSessionExist) {
                router.push('/')
            }


        }, [session.loading])

    const onSubmit = async (data: Inputs) => {
        axios.post("http://localhost:3000/message", data).then(r => {

            window.location.href = "/"
        }).catch(r => {
            console.log(r)
        })
    }
    return (
        <>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Input name="title" placeholder="Message title" type="text" label="Title"
                       error={errors.title?.message} register={register}
                       rules={{required: "This field is required"}}/>
                <Input name="description" placeholder="Message Description" type="text" label="Description"
                       error={errors.description?.message} register={register}
                       rules={{
                           required: "This field is required",
                       }}/>
                <button type="submit"
                        className="text-white w-6/12 bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Add message
                </button>
            </form>

        </>
    )
}
export default Add