import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { TTEinfoState, TTElementModalState } from '../../atoms/modelAtom'
import { Props } from '../../typings'
import TTElementModal from './TTElementModal'





function TableElement({ rows, cols,title,detail,homework,timestamp}: Props) {
  const [open, setopen] = useRecoilState(TTElementModalState)
  const [TTEinfo, setTTEinfo] = useRecoilState(TTEinfoState)
  const [completed, setcompleted] = useState(false)

  let infos = {title:title,timestamp:timestamp,detail:detail,homework:homework}
  
  return (
    <div
    onClick={()=>{setopen(true);setTTEinfo(infos)}}
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
