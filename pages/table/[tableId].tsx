import { CogIcon } from '@heroicons/react/outline'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'
import { GetServerSideProps, GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { DimensionModalState } from '../../atoms/modelAtom'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import SettingsModal from '../../components/Timetable/settingsModal'
import Table from '../../components/Timetable/table'
import TTElementModal from '../../components/Timetable/TTElementModal'
import { db } from '../../firebase'
import { TableType } from '../../typings'

function Timetable({tableData}:{tableData:TableType}) {
  const [rows, setrows] = useState(tableData.dimensions.rows)
  const [cols, setcols] = useState(tableData.dimensions.cols)
  const [open, setopen] = useRecoilState(DimensionModalState)

  return (
    <div>
      {/* sidebar */}
      <div className="flex">
        <Sidebar />
        <div className="flex w-full flex-col">
          <div className="ml-[200px]">
            <Header />
          </div>

          {/* header */}
          <div className="m-5 ml-[230px] flex flex-col justify-center">
            <div className="flex justify-between">
              <p className="mb-3 text-4xl">{tableData.title||'Not Named'}</p>
              {rows === 0 || cols === 0 ? null : (
                <CogIcon
                  className="h-8 w-8 transition-all hover:rotate-180 hover:scale-105"
                  onClick={() => setopen(true)}
                />
              )}
            </div>

            {/* table */}
            
            <Table rows={rows} cols={cols} tableId={tableData.id} dimensions={tableData.dimensions}/>
            <SettingsModal
              rows={rows}
              cols={cols}
              setrows={setrows}
              setcols={setcols}
            />
            <TTElementModal tableId={tableData.id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const docRef = doc(db, "tables", ctx.query.tableId);
  const docSnap = await getDoc(docRef);
  const data = Object.assign({id:docSnap.id},docSnap.data())
  if (!data) return { notFound: true };
  return { props: { tableData: JSON.parse(JSON.stringify(data)) } };
};

export default Timetable
