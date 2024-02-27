"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

// import {
//   BsChevronDoubleLeft,
//   BsChevronDoubleRight,
//   BsChevronLeft,
//   BsChevronRight,
// } from "react-icons/bs"

type Props = {
  totalPages: number
}

export default function Pagination({ totalPages }: Props) {
  const currentPath = usePathname()
  const query = useSearchParams()
  const currentPage = processPageQuery(query.get("page"))

  function processPageQuery(str: string | null | undefined) {
    if (!str) return 1
    const page = Math.min(Math.max(1, +str.replace(/\D/g, "")), totalPages)
    return !isNaN(page) ? page : 1
  }
  function setPage(page: number) {
    const newQuery = new URLSearchParams(query)
    newQuery.set("page", page.toString())
    return currentPath + "?" + newQuery.toString()
  }
  if (totalPages <= 1) return null
  const lastPage = totalPages > 500 ? 500 : totalPages
  const prevPages = []
  const nextPages = []
  const activePage = (
    <span
      className="min-w-[2rem] bg-accent flex border border-primary align-middle justify-center rounded px-2 py-1 fluid-base text-secondary"
      title={currentPage.toString()}
    >
      {currentPage}
    </span>
  )

  for (
    let page = currentPage - 1;
    page > 1 && page + 3 !== currentPage;
    --page
  ) {
    prevPages.unshift(
      <Link
        title={page.toString()}
        key={page}
        href={setPage(page)}
        className=" bg-secondary border border-accent hover:bg-accent hover:text-secondary min-w-[2rem] transition-color fluid-base rounded px-2 py-1 text-textPrimary flex align-middle justify-center"
      >
        {page}
      </Link>
    )
  }

  for (
    let page = currentPage + 1;
    page < lastPage && page - 3 !== currentPage;
    ++page
  ) {
    nextPages.push(
      <Link
        title={page.toString()}
        key={page}
        href={setPage(page)}
        className=" bg-secondary border border-accent hover:bg-accent hover:text-secondary min-w-[2rem] transition-color fluid-base rounded px-2 py-1 text-textPrimary flex align-middle justify-center"
      >
        {page}
      </Link>
    )
  }

  return (
    <div className="flex justify-center gap-2 m-4 fluid-base gap-x-2 h-max">
      {currentPage === 1 ? null : (
        <Link
          title={(currentPage - 1).toString()}
          href={setPage(currentPage - 1)}
          className=" bg-secondary border border-accent hover:bg-accent hover:text-secondary min-w-[2rem] items-center fluid-base transition-color rounded px-2 py-1 text-textPrimary flex align-middle justify-center"
        >
          {/* <BsChevronLeft /> */}
          Left
        </Link>
      )}
      {currentPage === 1 ? null : (
        <Link
          title="1"
          href={setPage(1)}
          className=" bg-secondary border border-accent hover:bg-accent hover:text-secondary min-w-[2rem] items-center fluid-base transition-color rounded px-2 py-1 text-textPrimary flex align-middle justify-center"
        >
          {/* <BsChevronDoubleLeft /> */}
          To the start
        </Link>
      )}

      {prevPages.length > 1 ? (
        <span className="text-textPrimary fluid-base ">...</span>
      ) : null}
      {[...prevPages]}
      {activePage}
      {[...nextPages]}
      {nextPages.length > 1 ? (
        <span className="text-textPrimary fluid-base ">...</span>
      ) : null}

      {currentPage === lastPage ? null : (
        <Link
          title={lastPage.toString()}
          href={setPage(lastPage)}
          aria-disabled={currentPage === lastPage}
          className=" bg-secondary border border-accent hover:bg-accent hover:text-secondary items-center min-w-[2rem] fluid-base transition-color rounded px-2 py-1 text-textPrimary flex align-middle justify-center"
        >
          {/* <BsChevronDoubleRight /> */}
          Right
        </Link>
      )}
      {currentPage === lastPage ? null : (
        <Link
          title={(currentPage + 1).toString()}
          href={setPage(currentPage + 1)}
          aria-disabled={currentPage === lastPage}
          className=" bg-secondary border border-accent hover:bg-accent hover:text-secondary items-center min-w-[2rem] fluid-base transition-color rounded px-2 py-1 text-textPrimary flex align-middle justify-center"
        >
          {/* <BsChevronRight /> */}
          To the end
        </Link>
      )}
    </div>
  )
}
