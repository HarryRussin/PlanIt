import { Switch } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { TTEinfoState } from '../../atoms/modelAtom'

interface Props {
  title: string
  desc: string
  completed: boolean
}

function Homework({ title, desc, completed }: Props) {
  const [edit, setedit] = useState(false)
  const [complete, setcomplete] = useState(completed)

  const addComplete = ()=>{
    
  }

  return (
    <>
      {edit ? (
        <div>{title}</div>
      ) : (
        <div
          onClick={() => setcomplete(!complete)}
          className={`${
            complete
              ? 'bg-green-300  hover:bg-red-200'
              : 'bg-gray-100 hover:bg-green-200'
          } group relative mb-1 rounded-lg p-2 transition-all duration-300`}
        >
          {complete ? (
            <XCircleIcon className="absolute left-1/2 top-1/2 h-8 w-8 -translate-y-1/2 -translate-x-1/2 scale-0 transition-all group-hover:scale-100" />
          ) : (
            <CheckCircleIcon className="absolute left-1/2 top-1/2 h-8 w-8 -translate-y-1/2 -translate-x-1/2 scale-0 transition-all group-hover:scale-100" />
          )}
          <div className="">
            <p className="text-xl">{title}</p>
            <p className=" text-gray-500">{desc}</p>
          </div>
          <div className=""></div>
        </div>
      )}
    </>
  )
}

export default Homework
