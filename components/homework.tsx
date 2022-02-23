import { Switch } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'

interface Props {
  title: string
  desc: string
  completed: boolean
}

function Homework({ title, desc,completed }: Props) {
  const [edit, setedit] = useState(false)
  const [complete, setcomplete] = useState(completed)
  
  return (
    <>
      {edit ? (
        <div>{title}</div>
      ) : (
        <div onClick={()=>setcomplete(!complete)} className={`${complete?'bg-green-300  hover:bg-red-200':'hover:bg-green-200 bg-gray-100'} relative group transition-all p-2 rounded-lg mb-1 duration-300`}>
            {complete?
            <XCircleIcon className='w-8 h-8 absolute left-1/2 top-1/2 scale-0 group-hover:scale-100 -translate-y-1/2 -translate-x-1/2 transition-all'/>
            :
            <CheckCircleIcon className='w-8 h-8 absolute left-1/2 top-1/2 scale-0 group-hover:scale-100 -translate-y-1/2 -translate-x-1/2 transition-all'/>
}
          <div className="">
            <p className="text-xl">{title}</p>
            <p className=" text-gray-500">{desc}</p>
          </div>
          <div className="">
          </div>
        </div>
      )}
    </>
  )
}

export default Homework
