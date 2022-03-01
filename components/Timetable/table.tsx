import React, { useEffect } from 'react'
import { CogIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import TableElement from './tableElement'
import { useRecoilState } from 'recoil'
import { DimensionModalState, TableState } from '../../atoms/modelAtom'
import { db } from '../../firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'

interface Props {
  rows: number
  cols: number
  tableId: string
  dimensions: { cols: number; rows: number }
}

const startdata = {
  title: '',
  detail: '',
}

function Table({ rows, cols, tableId, dimensions }: Props) {
  const [open, setopen] = useRecoilState(DimensionModalState)
  const [table, settable] = useRecoilState<any>(TableState)
  const [tableData, settableData] = useState<any>()

  const [data, setdata] = useState(startdata)
  const [loading, setloading] = useState(false)

  //ADDS TABLE ELEMENTS AND ROWS
  const maketable = async () => {
    // copy existing table
    if (!tableData) {
      console.log('no data yet')
      return
    }
    let tables: any = JSON.parse(JSON.stringify(tableData))
    let tableCop: any = []
    let tableLength = rows < dimensions.rows ? rows : dimensions.rows
    // for each row that already has data, add columns if needed
    for (let p = 0; p < tableLength; p++) {
      let row = []
      if (tables[p]) {
        for (let i = 0; i < cols; i++) {
          if (i >= tables[p].length) {
            row.push(startdata)
          } else {
            row.push(tables[p][i])
          }
        }
      }
      console.log(row)

      tableCop.push(row)
    }

    // add remaining rows
    let ll = rows - tables.length ? rows - tables.length : rows - tables.length
    for (let j = 0; j < ll; j++) {
      let row = []
      for (let q = 0; q < cols; q++) {
        row.push(startdata)
      }
      tableCop.push(row)
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        await setDoc(doc(db, 'tables', tableId, `row_${i}`, `item_${j}`), {
          title: tableCop[i][j].title,
          detail: tableCop[i][j].detail,
          timestamp: serverTimestamp(),
        })
      }
    }

    settable(tableCop)
    return
  }

  const getTable = async () => {
    let tables: any = []
    for (let i = 0; i < dimensions.rows; i++) {
      let row: any = []
      let q = query(collection(db, 'tables', tableId, `row_${i}`))
      let data = await getDocs(q)
      data.forEach((doc) => {
        row.push(doc.data())
      })
      tables.push(row)
    }
    tables = tables.filter((n:any) => n.length)
    console.log('table got - ', tables)

    settableData(tables)
  }

  const addDimensions = async () => {
    await setDoc(
      doc(db, 'tables', tableId),
      {
        dimensions: { rows: rows, cols: cols },
      },
      { merge: true }
    )
  }

  useEffect(() => {
    setloading(true)
    addDimensions()
    maketable().then(() => setloading(false))
  }, [ rows, cols, tableData])

  useEffect(() => {
    getTable()
  }, [rows,cols])

  return (
    <div className="">
      {!loading ? (
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
              {Object.keys(table).map((_:any, i):any => (
                <div className="flex">
                  {table[_].map((s: any, j: number) => (
                    <TableElement
                      {...s}
                      position={[i, j]}
                      rows={rows}
                      cols={cols}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto block translate-y-1/2 bg-transparent"
          width="150px"
          height="150px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <g transform="rotate(0 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.9166666666666666s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(30 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.8333333333333334s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(60 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.75s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(90 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.6666666666666666s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(120 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.5833333333333334s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(150 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.5s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(180 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.4166666666666667s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(210 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.3333333333333333s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(240 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.25s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(270 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.16666666666666666s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(300 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.08333333333333333s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(330 50 50)">
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#06b6d4"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
        </svg>
      )}
    </div>
  )
}

export default Table
