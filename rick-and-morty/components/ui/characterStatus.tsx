import { Character } from "@/api/rickAndMortyAPI.types"

export const CharacterStatus = ({ characterStatus }: { characterStatus: Character['status'] }) => {
    let colorStatus = "bg-zinc-300";
    let bgStatus = "bg-zinc-600";

    if (characterStatus === "Alive") {
        colorStatus = "motion-safe:animate-pulse bg-green-400";
        bgStatus = "bg-green-800";
    }
    if (characterStatus === "Dead") {
        colorStatus = "bg-zinc-600";
        bgStatus = "bg-zinc-800";
    }

    return (
        <div className={`flex gap-2 items-baseline text-xs ${bgStatus} rounded-full w-fit px-2`}>
            <div className={`w-2 h-2 rounded-full ${colorStatus}`}></div>
            <p>{characterStatus}</p>
        </div>
    );
}