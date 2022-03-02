import { DotsHorizontalIcon, PencilAltIcon, PencilIcon, XCircleIcon, XIcon } from '@heroicons/react/outline'
import { deleteDoc, doc } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { TableType } from '../../typings'

function IndexTable({ title, details, id,timestamp,dimensions }: TableType) {
  const [options, setoptions] = useState(false)

  const router = useRouter()

  const handleDelete = async()=>{
    await deleteDoc(doc(db,'tables',id))
  }

  return (
    <div className="group relative flex h-[150px] w-[290px] overflow-y-auto rounded-md bg-slate-200 py-1 pl-2 shadow overflow-x-hidden scrollbar-thin scrollbar-thumb-black">
      <div
        onClick={() => router.replace(`/table/${id}`)}
        className={`w-full max-w-[85%] translate-x-0 overflow-hidden`}
      >
        <div className="">
          <div className="max-w-[90%] m-5 mt-3 flex flex-col">
            <p className=" overflow-ellipsis font-semibold text-xl text-gray-800">{title}</p>
            <p className='text-xs mb-2'>{new Date(parseInt(timestamp.seconds)*1000).toDateString()}</p>
            <div className="overflow-y-auto h-[70px] scrollbar-thin scrollbar-thumb-gray-400">
            <p className="text-sm text-gray-600 h-full">{details}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-blue z-10`}>
        <DotsHorizontalIcon
          onClick={() => setoptions(!options)}
          className={`mx-0 box-content h-8 w-8 pl-1 ${options?'hidden':''}`}
        />
        <XIcon
          onClick={() => setoptions(!options)}
          className={`mx-0 box-content h-8 w-8 pl-1 ${options?'':'hidden'}`}
        />
        <div className={`flex flex-col mx-1 items-center space-y-2 mt-2 ${options ? 'translate-x-0' : 'translate-x-[140%]'} transition-all`}>
          <PencilAltIcon className='h-8 w-8 text-yellow-600'/>
          <XCircleIcon onClick={handleDelete} className='h-8 w-8 text-red-600'/>
        </div>
      </div>
    </div>
  )
}

export default IndexTable
