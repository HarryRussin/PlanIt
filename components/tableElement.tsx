import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { TTEinfoState, TTElementModalState } from '../atoms/modelAtom'
import TTElementModal from './TTElementModal'

interface Homework {
  title:string
  desc:string
  completed:boolean
}

interface Props {
  rows: number
  cols: number
  title:string
  detail:string
  timestamp:string
  homework:[Homework]
}

function TableElement({ rows, cols,title,detail,homework,timestamp }: Props) {
  const [open, setopen] = useRecoilState(TTElementModalState)
  const [TTEinfo, setTTEinfo] = useRecoilState(TTEinfoState)

  let info = {title:title,timestamp:timestamp,detail:detail,homework:homework}
  
  return (
    <div
    onClick={()=>{setopen(true);setTTEinfo(info)}}
      style={{
        height: 70 / rows + 'vh',
        width: 70 / cols + 'vw',
      }}
      className={` border bg-blue-300`}
    >
      <p className=''>{title}</p>
      <p className='text-gray-600'>{detail}</p>
    </div>
  )
}



export default TableElement
