'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useRouter } from 'next/navigation'

interface PaginationProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
  page: number
  totalPages: number
}

export function PaginationComponent({
  hasNextPage,
  hasPrevPage,
  nextPage,
  prevPage,
  page,
  totalPages,
}: PaginationProps) {
  const router = useRouter()

  const handlePageChange = (pageNumber: number | null, e: React.MouseEvent) => {
    if (!pageNumber) {
      e.preventDefault()
      return
    }
    router.push(`?page=${pageNumber}`)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPrevPage ? `?page=${prevPage}` : '#'}
            aria-disabled={!hasPrevPage}
            onClick={(e) => handlePageChange(prevPage, e)}
            className={!hasPrevPage ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={`?page=${pageNum}`}
              isActive={pageNum === page}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(pageNum, e)
              }}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? `?page=${nextPage}` : '#'}
            aria-disabled={!hasNextPage}
            onClick={(e) => handlePageChange(nextPage, e)}
            className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
