"use client"

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";

export const BillboardsClient = () => {
    const router = useRouter()
    const param = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Billboards (0)" description="Manage Billboard for your store"/>
                <Button onClick={() => router.push(`/${param.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
        </>
    )
}