import { PlusCircleIcon } from '@heroicons/react/outline'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Header from '../components/header'
import IndexTable from '../components/TableIndex/indexTable'
import NewTableModal from '../components/TableIndex/NewTableModal'
import { db } from '../firebase'
import {TableState} from '../atoms/modelAtom.js'
import { useSetRecoilState } from 'recoil'


interface Table {
  title: string
}

function TableIndex() {
  const [tables, settables] = useState<[Table] | []>([])
  const [open, setopen] = useState(false)
  const settable = useSetRecoilState(TableState)

  const { data: session } = useSession()

  const uid = session ? session?.user?.uid : ''

  console.log(uid)

  useEffect(() => {
    session &&
      onSnapshot(
        query(
          collection(db, 'tables'),
          where('createdBy', '==', session?.user?.uid)
        ),
        (snapshot) => {
          const tableArr: any = []
          snapshot.forEach((doc) => {
            tableArr.push(Object.assign({ id: doc.id }, doc.data()))
          })
          settables(tableArr)
        }
      )
  }, [db,session])

  useEffect(() => {
     settable([])
  }, [])

  return (
    <div>
      <Header />
      <NewTableModal open={open} setopen={setopen} />
      <div
        className={` mt-10 flex w-full ${
          tables ? 'justify-left' : 'justify-center'
        }`}
      >
        <div className="mx-14 flex flex-wrap gap-10">
          <div
            onClick={() => setopen(true)}
            className="group flex h-[150px] w-[290px] flex-col items-center justify-center overflow-hidden rounded-md bg-cyan-500 text-white shadow"
          >
            <p
              className={`-translate-y-20 ${
                open && 'translate-y-0'
              } forwards  transition-all duration-300 group-hover:translate-y-0`}
            >
              Add Table
            </p>
            <PlusCircleIcon
              className={`h-12 w-12 ${
                open && 'translate-y-2'
              } -translate-y-4 transition-all duration-300 group-hover:translate-y-2`}
            />
          </div>
          {tables.map((table) => (
            <IndexTable {...table} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableIndex
