import React, { useEffect } from 'react'
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
  {title:'hi',detail:'test',timestamp:'',homework:[{title:'',desc:'',completed:false}]}

function Table({ rows, cols }: Props) {
  const [open, setopen] = useRecoilState(DimensionModalState)
  const [data, setdata] = useState(startdata)

  const [table, settable] = useState([[startdata]])

  // DELETE WHEN ADDING FIREBASE
  const maketable=()=>{
    let tables = []
    for (let i = 0; i < rows; i++) {
      let row = []
      for (let j = 0; j < cols; j++) {
        row.push(startdata)        
      }
      tables.push(row)
    }
    settable(tables)
  }

  useEffect(() => {
     maketable()
  }, [rows,cols])

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
          {table.map((i) => (
            <div className="flex">
              {i.map((j) => (
                <TableElement {...j} rows={rows} cols={cols} />
              ))}
            </div>
          ))}
        </div>
      )}
      
    </div>
  )
}

export default Table
