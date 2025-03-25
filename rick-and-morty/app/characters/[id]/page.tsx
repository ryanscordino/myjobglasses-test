import { getEpisodeByURL, getOneCharacters } from "@/api/rickAndMortyAPI"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { CharacterStatus } from "@/components/ui/characterStatus"
import Image from "next/image"
import BackButton from "@/components/container/backButton"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const character = await getOneCharacters(id)

    if (!character) {
        notFound()
    }

    const firstEpisode = await getEpisodeByURL(character.episode[0])
    const lastEpisode = await getEpisodeByURL(character.episode[character.episode.length - 1])

    return (
        <div className="flex items-center justify-center mt-32 px-2">
            <Card className="bg-zinc-950 flex flex-col lg:flex-row max-w-4xl">
                <div className="h-64 w-64 lg:h-96 lg:w-128 relative m-auto lg:mx-8">
                    <Image
                        src={character.image}
                        alt={`Image of ${character.name}`}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="w-full p-6 flex-col flex">
                    <CardHeader className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold">{character.name}</h2>
                        <CharacterStatus characterStatus={character.status} />
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-zinc-400">Species</p>
                                <p>{character.species}</p>
                            </div>
                            <div>
                                <p className="text-zinc-400">Gender</p>
                                <p>{character.gender}</p>
                            </div>
                            <div>
                                <p className="text-zinc-400">Origin</p>
                                <p>{character.origin.name}</p>
                            </div>
                            <div>
                                <p className="text-zinc-400">Location</p>
                                <p>{character.location.name}</p>
                            </div>
                        </div>
                        <div className="text-sm text-zinc-400">
                            <p>First seen in episode: {firstEpisode?.name || "Error"}</p>
                            <p>Last seen in episode: {lastEpisode?.name || "Error"}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-8 lg:mt-auto">
                        <BackButton />
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}