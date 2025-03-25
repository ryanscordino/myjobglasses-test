"use client"

import { getRandomsCharacters } from "@/api/rickAndMortyAPI";
import { Character } from "@/api/rickAndMortyAPI.types";
import { CharacterCard } from "@/components/container/characterCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [randomCharacters, setRandomCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState<string>(''); // Initialize with empty string
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return; // Don't search if empty
    router.push(`/characters?name=${encodeURIComponent(search.trim())}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRandomsCharacters();
        if (data && Array.isArray(data)) {
          setRandomCharacters(data as Character[]);
        } else {
          setRandomCharacters([]);
        }
      } catch (error) {
        console.error('Failed to fetch random characters:', error);
        setRandomCharacters([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-8 px-4">
      <section className="h-fit my-48 lg:my-0 lg:h-screen justify-center gap-4 items-center flex flex-col">
        <h1 className="text-lg lg:text-xl text-zinc-100 font-mono">Rick and Morty</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full">
          <Input
            placeholder="Morty Smith"
            className="text-zinc-200 border-zinc-900 max-w-xl"
            value={search}
            onChange={handleSearch}
          />
          <div className="flex gap-2">
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
            <Link href="/characters?page=1">
              <Button variant="outline" size="sm">
                See all characters
              </Button>
            </Link>
          </div>
        </form>
      </section>
      <section className="lg:-mt-32 flex flex-col gap-8 mx-auto">
        <h2 className="text-center font-mono">— explore randoms characters —</h2>
        <div className="flex flex-col md:grid sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {randomCharacters.map((c) => (
            <CharacterCard key={c.id} character={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
