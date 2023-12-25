import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Copy, Server} from "lucide-react";
import {Badge, BadgeProps} from "@/components/ui/badge";
import {Button} from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
    title: string,
    description: string,
    variant: "admin" | "public"
}

const TextMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public"
    , admin: "Admin"
}

const VariantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export const ApiAlert: React.FC<ApiAlertProps> = ({title, description, variant = "public"}) => {

    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description)
        toast.success("API ROUTE copied to the clipboard.")
    }
    return (
        <Alert>
            <Server className={"h-4 w-4"}/>
            <AlertTitle className={"flex items-center gap-x-2"}>
                {title}
                <Badge variant={VariantMap[variant]}>
                    {TextMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className={"mt-4 flex items-center justify-between"}>
                <code className={"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"}>
                    {description}
                </code>
                <Button variant={"outline"} size={"icon"} onClick={() => onCopy(description)}>
                    <Copy className={"w-4 h-4"}/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}