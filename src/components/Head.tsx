"use client"
import { usePathname } from "next/navigation";
import { mapPageTitle } from "@/lib/utils";

export default function Head(): JSX.Element {
    const pathParam = usePathname();
    const title = mapPageTitle(pathParam);
    return (
        <head>
            <title>{title}</title>
            <meta name="description" content="Vietnamese Student Association in Trondheim" />
            <link rel="icon" href="/favicon.ico" />
        </head>
    )
}