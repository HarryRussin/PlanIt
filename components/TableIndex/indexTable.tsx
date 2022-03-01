import { DotsHorizontalIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
  title: string
  details: string
  id: string
}

function IndexTable({ title, details, id }: Props) {
  const [options, setoptions] = useState(false)
  return (
    <div className="group relative flex h-[150px] w-[290px] overflow-y-auto rounded-md py-1 px-4 shadow overflow-x-hidden scrollbar-thin scrollbar-thumb-black">
      <div className="max-w-[85%]">
        <Link href={`/table/${id}`}>
          <div className="">
            <div className="max-w-[90%]">
              <p className=" overflow-ellipsis text-2xl">{title}</p>
              <p className="text-sm text-gray-600">{details}</p>
            </div>
          </div>
        </Link>
      </div>
      <DotsHorizontalIcon
        onClick={() => setoptions(!options)}
        className={`absolute top-0 left-full box-content h-8 ${
          options && 'left-0'
        } w-8 transition-all`}
      />
    </div>
  )
}

export default IndexTable
