import Link from "next/link";

export default function Header(): React.ReactElement<"header"> {
    return (
        <header className=" h-fit w-full fixed z-40">
            <div className="bg-zinc-950/10 backdrop-blur-xl absolute h-full w-full"></div>
            <nav className="flex justify-between mx-auto font-zinc-200 px-4 lg:px-16 py-5">
                <Link href={'/'} className="z-50 font-mono">
                    R&M
                </Link>
            </nav>
        </header>
    )
}