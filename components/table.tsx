import React from 'react'
import { CogIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import TableElement from './tableElement'
import { useRecoilState } from 'recoil'
import { DimensionModalState } from '../atoms/modelAtom'

interface Props {
  rows: number
  cols: number
}
const startdata = 
  {title:'',detail:'',timestamp:'',homework:[{title:'',desc:'',completed:false}]}

function Table({ rows, cols }: Props) {
  const [open, setopen] = useRecoilState(DimensionModalState)
  const [data, setdata] = useState(startdata)

  return (
    <div className="">
      {rows === 0 || cols === 0 ? (
        <div
          onClick={() => setopen(true)}
          className="flex h-[350px] items-center justify-center rounded-xl transition-all duration-100 hover:border-2 hover:text-slate-600"
        >
          <CogIcon className="h-12 w-12 hover:rotate-180 hover:scale-105 transition-all" />
        </div>
      ) : (
        <div className="">
          {[...Array(rows)].map((i) => (
            <div className="flex">
              {[...Array(rows).fill(startdata)].map((i) => (
                <TableElement {...i} rows={rows} cols={cols} />
              ))}
            </div>
          ))}
        </div>
      )}
      
    </div>
  )
}

export default Table
