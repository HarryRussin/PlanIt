import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { DimensionModalState } from '../atoms/modelAtom'
import { Dialog, Transition } from '@headlessui/react'

function SettingsModal({ rows, cols, setrows, setcols }: any) {
  const [open, setopen] = useRecoilState(DimensionModalState)
  const [col, setcol] = useState(cols)
  const [row, setrow] = useState(rows)
  const initialButtonRef = useRef(null)

  const handleRows = (amount: number) => {
    if (row + amount < 0) {
      setrow(0)
    } else if (row + amount >= 10) {
      setrow(10)
    } else {
      setrow(row + amount)
    }
  }

  const handleCols = (amount: number) => {
    if (col + amount <= 0) {
      setcol(0)
    } else if (col + amount >= 10) {
      setcol(10)
    } else {
      setcol(col + amount)
    }
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
      initialFocus={initialButtonRef}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setopen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed bg-black opacity-50 inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block bg-white border w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
              <div className="">
                <Dialog.Title className={`text-xl font-semibold`}>Dimensions</Dialog.Title>
                <div className="flex items-center">
                  <p className="flex-1">Rows: {row}</p>
                  <div className="flex h-10 w-10">
                    <PlusIcon
                      onClick={() => handleRows(1)}
                      className="active:scale-90"
                    />
                    <MinusIcon
                      onClick={() => handleRows(-1)}
                      className="active:scale-90"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="flex-1">Columns: {col}</p>
                  <div className="flex h-10 w-10">
                    <PlusIcon
                      onClick={() => handleCols(1)}
                      className="active:scale-90"
                    />
                    <MinusIcon
                      onClick={() => handleCols(-1)}
                      className="active:scale-90"
                    />
                  </div>
                </div>
              </div>
              <button
                ref={initialButtonRef}
                type="submit"
                onClick={() => {
                  setrows(row)
                  setcols(col)
                  setopen(false)
                }}
                className="mt-1 box-border w-full rounded-md bg-cyan-500 p-1 text-center outline-none ring-black hover:ring-2"
              >
                confirm
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SettingsModal
