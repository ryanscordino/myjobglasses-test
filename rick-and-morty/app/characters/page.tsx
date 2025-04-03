"use client"

import { getAllCharacters } from "@/api/rickAndMortyAPI"
import { Character, CharacterFilter, Info } from "@/api/rickAndMortyAPI.types"
import { CharacterCard } from "@/components/container/characterCard"
import { useEffect, useState, Suspense } from "react"
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
import { Button } from "@/components/ui/button"

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [info, setInfo] = useState<Info<Character>>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentPage = searchParams.get('page') || '1'
  const filterName = searchParams.get('name') as CharacterFilter['name'] || ''
  const filterStatus = searchParams.get('status') as CharacterFilter['status'] || ''
  const filterSpecies = searchParams.get('species') as CharacterFilter['species'] || ''
  const filterType = searchParams.get('type') as CharacterFilter['type'] || ''
  const filterGender = searchParams.get('gender') as CharacterFilter['gender'] || ''

  useEffect(() => {
    async function fetchCharacters() {
      setIsLoading(true)
      setError(null)

      try {
        const activeFilters: CharacterFilter = {}

        if (filterName) activeFilters.name = filterName
        if (filterStatus) activeFilters.status = filterStatus
        if (filterSpecies) activeFilters.species = filterSpecies
        if (filterType) activeFilters.type = filterType
        if (filterGender) activeFilters.gender = filterGender

        const response = await getAllCharacters(currentPage, activeFilters)
        setInfo(response)
      } catch (err) {
        setError("Failed to fetch characters. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCharacters()
  }, [currentPage, filterName, filterStatus, filterSpecies, filterType, filterGender])

  function updateSearchParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())


    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        params.set(key, value.trim())
      } else {
        params.delete(key)
      }
    })

    router.push(`/characters?${params.toString()}`)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const updates: Record<string, string> = {}

    for (const [key, value] of formData.entries()) {
      updates[key] = value?.toString() || ''
    }

    updates['page'] = '1'

    updateSearchParams(updates)
  }

  function handlePageChange(newPage: number) {
    if (newPage < 1 || (info?.info?.pages && newPage > info.info.pages)) {
      return
    }

    updateSearchParams({ page: newPage.toString() })
  }

  function handleResetFilters() {
    router.push('/characters?page=1')
  }

  return (
    <div className="flex flex-col mt-32 px-2 lg:px-16 gap-8">
      <h2 className="font-mono">All characters</h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 md:items-end flex-wrap">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Rick"
            defaultValue={filterName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            className="rounded-md border border-input bg-background px-3 py-2"
            defaultValue={filterStatus}
          >
            <option value="">Any</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="species">Species</Label>
          <Input
            id="species"
            name="species"
            placeholder="Human"
            defaultValue={filterSpecies}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            name="type"
            placeholder="Parasite"
            defaultValue={filterType}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            name="gender"
            className="rounded-md border border-input bg-background px-3 py-2"
            defaultValue={filterGender}
          >
            <option value="">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="flex gap-2 self-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="px-4 h-10"
          >
            {isLoading ? 'Loading...' : 'Apply Filters'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleResetFilters}
            className="px-4 h-10"
          >
            Reset
          </Button>
        </div>
      </form>

      <Suspense fallback={<div className="text-center py-10">Loading characters...</div>}>
        {error && <div className="text-center text-red-500">{error}</div>}
        {isLoading && <div className="text-center py-10">Loading characters...</div>}

        <div className="flex gap-x-4 gap-y-10 flex-wrap mx-auto justify-between">
          {info?.not_found &&
            <p className="text-center w-full">No characters match your filters.</p>
          }

          <div className="flex flex-col md:grid md:grid-cols-5 gap-8">
            {info?.results?.map((character: Character) =>
              <CharacterCard character={character} key={character.id} />
            )}
          </div>
        </div>

        {info?.info && info.info.pages > 0 && (
          <Pagination className="py-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Number(currentPage) - 1)}
                  className={Number(currentPage) <= 1 ? "pointer-events-none opacity-20" : "cursor-pointer"}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Number(currentPage) + 1)}
                  className={Number(currentPage) >= (info.info?.pages || 0) ? "pointer-events-none opacity-20" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Suspense>
    </div>
  )
}
