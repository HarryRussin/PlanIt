import Link from 'next/link'
import React from 'react'

interface Props {
  title: string
  details: string
  id:string
}

function IndexTable({ title, details,id }: Props) {
  return (
    <Link href={`/table/${id}`}>
    <div className="h-[150px] w-[290px] rounded-md py-1 overflow-auto scrollbar-thin scrollbar-thumb-black px-4 shadow">
      <p className="overflow-ellipsis text-2xl ">{title}</p>
      <p className="text-sm text-gray-600">{details}</p>
    </div>
    </Link>
  )
}

export default IndexTable
