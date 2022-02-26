import React, { useEffect } from 'react'
import { CogIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import TableElement from './tableElement'
import { useRecoilState } from 'recoil'
import { DimensionModalState } from '../../atoms/modelAtom'
import { db, storage } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

interface Props {
  rows: number
  cols: number
  tableId: string
  dimensions: { cols: number; rows: number }
}

const startdata = {
  title: 'hi',
  detail: 'test',
  timestamp: '',
  homework: [{ title: '', desc: '', completed: false }],
}

function Table({ rows, cols, tableId, dimensions }: Props) {
  const [open, setopen] = useRecoilState(DimensionModalState)
  const [data, setdata] = useState(startdata)

  const [table, settable] = useState({ 0: [startdata] })
  const { data: session } = useSession()

  //ADDS TABLE ELEMENTS AND ROWS
  const maketable = async () => {
    let tables: any = []
    for (let i = 0; i < rows; i++) {
      let row = []
      for (let j = 0; j < cols; j++) {
        await setDoc(doc(db, 'tables', tableId, `row_${i}`, `item_${j}`), {
          title: 'hi',
          detail: 'test',
          timestamp: serverTimestamp(),
        })
        row.push(startdata)
      }
      tables.push(row)
    }
    settable(tables)
  }

  const getTable = async () => {
    let tables:any =[]
    for (let i = 0; i < dimensions.rows; i++) {
      let row: any = []
      let q = query(collection(db, 'tables', tableId, `row_${i}`))
      let data = await getDocs(q)
      data.forEach((doc) => {
        row.push(doc.data())
      })
      tables.push(row)
    }
    settable(tables)
  }

  const addDimensions = async () => {
    await setDoc(doc(db, 'tables', tableId), {
      dimensions: { rows: rows, cols: cols },
    },{merge:true})
  }

  useEffect(() => {
    addDimensions()
    maketable()
  }, [db, rows, cols])

  useEffect(() => {
    getTable()
  }, [db])

  return (
    <div className="">
      {rows === 0 || cols === 0 ? (
        <div
          onClick={() => setopen(true)}
          className="flex h-[350px] items-center justify-center rounded-xl transition-all duration-100 hover:border-2 hover:text-slate-600"
        >
          <CogIcon className="h-12 w-12 transition-all hover:rotate-180 hover:scale-105" />
        </div>
      ) : (
        <div className="">
          {Object.keys(table).map((_, i) => (
            <div className="flex">
              {table[_].map((s, j) => (
                <TableElement {...s} pos={[i, j]} rows={rows} cols={cols} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Table
