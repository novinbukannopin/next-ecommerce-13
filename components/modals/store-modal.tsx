"use client"

import {Modal} from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setLoading(true)
            const response = await axios.post("/api/stores", values)
            // toast.success("Store created.")
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal title={"Create Store"}
               description={"add a new store to manage product and categories"}
               isOpen={storeModal.isOpen}
               onClose={storeModal.onClose}>
            <div>
                <div className={"space-y-4 py-2 pb-4"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder={"E-Commerce"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name={"name"}
                                       control={form.control}
                            />
                            <div className={"pt-6 space-x-2 flex items-center justify-end w-full"}>
                                <Button variant={"outline"} disabled={loading}
                                        onClick={storeModal.onClose}>Cancel</Button>
                                <Button type={"submit"}
                                        disabled={loading}>{loading ? 'Creating ....' : 'Continue'}</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}