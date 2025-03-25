import { Character } from "@/api/rickAndMortyAPI.types"
import { Card, CardFooter, CardHeader, CardContent } from "../ui/card"
import Image from "next/image";
import { CharacterStatus } from "../ui/characterStatus";
import Link from "next/link";
import { Button } from "../ui/button";



export const CharacterCard = ({ character }: { character: Character }) => {
    return (
        <Card className="mx-auto w-full h-112 shadow-xl shadow-zinc-600/20">
            <CardHeader>
                {
                    character.image &&
                    <div className="h-32 w-full relative">
                        <Image src={character.image} className="shadow-xl border border-zinc-100/80 shadow-zinc-300/20" objectFit="cover" alt={`Image of ${character.name}`} fill />
                    </div>
                }
                <div className="flex flex-col gap-2 py-2">
                    <CharacterStatus characterStatus={character.status} />
                    <h3 className="">{character.name}</h3>
                </div>
            </CardHeader>
            <CardContent className="text-sm my-auto">
                <p>📍 {character.origin.name}</p>
                <p>🔭 {character.species}, {character.gender}</p>
            </CardContent>
            <CardFooter className="mt-auto">
                <Link href={`/characters/${character.id}`} className="w-full">
                    <Button variant={`outline`} size={`sm`} className="w-full">See more</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};