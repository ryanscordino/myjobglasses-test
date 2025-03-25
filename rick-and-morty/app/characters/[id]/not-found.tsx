import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center my-auto gap-4 h-screen">
            <h2>Character not found. Please try another ID.</h2>
            <p>Or come back to the home</p>
            <Link href={"/"}><Button>Back home</Button></Link>
        </div>
    )
}