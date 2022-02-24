import { CogIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { DimensionModalState } from '../atoms/modelAtom'
import SettingsModal from '../components/settingsModal'
import Sidebar from '../components/sidebar'
import Table from '../components/table'
import TTElementModal from '../components/TTElementModal'

function Timetable() {
  const [rows, setrows] = useState(0)
  const [cols, setcols] = useState(0)
  const [open, setopen] = useRecoilState(DimensionModalState)

  return (
    <div>
      {/* sidebar */}
      <div className="flex">
        <Sidebar />
        <div className="flex w-full flex-col">
          <div className="ml-[200px] flex bg-slate-300 py-2 px-3">
            <p className="flex-1">Harry</p>
            <div className="flex space-x-2">
              <p>Home</p>
              <p>Timetables</p>
              <p>Account</p>
            </div>
          </div>

          {/* header */}
          <div className="m-5 ml-[230px] flex flex-col justify-center">
            <div className="flex justify-between">
              <p className="mb-3 text-4xl">Timetable</p>
              {rows === 0 || cols === 0 ? null : (
                <CogIcon
                  className="h-8 w-8 transition-all hover:rotate-180 hover:scale-105"
                  onClick={() => setopen(true)}
                />
              )}
            </div>

            {/* table */}
            <Table rows={rows} cols={cols} />
            <SettingsModal
              rows={rows}
              cols={cols}
              setrows={setrows}
              setcols={setcols}
            />
            {/* <TTElementModal /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timetable
