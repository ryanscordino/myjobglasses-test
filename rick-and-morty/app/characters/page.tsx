"use client"

import { getAllCharacters } from "@/api/rickAndMortyAPI"
import { Character, CharacterFilter, Info } from "@/api/rickAndMortyAPI.types"
import { CharacterCard } from "@/components/container/characterCard"
import { useEffect, useState, Suspense, useCallback } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Page() {

  const searchParams = useSearchParams()
  const pageNumber = searchParams.get('page') || '1'

  const [filters, setFilters] = useState<CharacterFilter>({
    name: searchParams.get('name') || '',
    status: (searchParams.get('status') as CharacterFilter['status']) || '',
    species: searchParams.get('species') || '',
    type: searchParams.get('type') || '',
    gender: (searchParams.get('gender') as CharacterFilter['gender']) || ''
  })

  const router = useRouter()

  const baseURL = '/characters?page='

  const [info, setInfo] = useState<Info<Character>>()

  const fetchData = useCallback(async () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    ) as CharacterFilter

    const response = await getAllCharacters(pageNumber, activeFilters)
    setInfo(response)
  }, [filters, pageNumber])

  useEffect(() => {
    fetchData()
  }, [fetchData, pageNumber, searchParams])

  const handleFilterChange = (key: keyof CharacterFilter) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters(prev => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div className="flex flex-col mt-32 px-2 lg:px-16 gap-8">
      <h2 className="font-mono">All characters</h2>
      <div className="flex flex-col md:flex-row gap-4 md:items-end flex-wrap">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            placeholder="Rick"
            value={filters.name}
            onChange={handleFilterChange('name')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Status</Label>
          <select
            className="rounded-md border border-input bg-background px-3 py-2"
            value={filters.status}
            onChange={handleFilterChange('status')}
          >
            <option value="">Any</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Species</Label>
          <Input
            placeholder="Human"
            value={filters.species}
            onChange={handleFilterChange('species')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Type</Label>
          <Input
            placeholder="Parasite"
            value={filters.type}
            onChange={handleFilterChange('type')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Gender</Label>
          <select
            className="rounded-md border border-input bg-background px-3 py-2"
            value={filters.gender}
            onChange={handleFilterChange('gender')}
          >
            <option value="">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      <Suspense>
        <div className="flex gap-x-4 gap-y-10 flex-wrap mx-auto justify-between">
          {info?.not_found &&
            <p className="text-center w-full">Any character match your filters.</p>
          }

          <div className="flex flex-col md:grid md:grid-cols-5 gap-8">
            {info?.results?.map((character: Character) =>
              <CharacterCard character={character} key={character.id} />
            )}

          </div>
        </div>
        <Pagination className="py-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => router.push(`${baseURL}${String(Number(pageNumber) - 1)}`)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{pageNumber}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => router.push(`${baseURL}${String(Number(pageNumber) + 1)}`)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Suspense>
    </div>
  )
}
