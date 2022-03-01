import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { useSession } from 'next-auth/react'

function NewTableModal({ setopen, open }: any) {
  const [title, settitle] = useState('')
  const [detail, setdetail] = useState('')

  const {data:session} = useSession()

  const addTable = async ()=>{
    const docRef = await addDoc(collection(db, 'tables'), {
        title: title,
        details: detail,
        createdBy: session?.user?.uid,
        timestamp: serverTimestamp(),
        dimensions:{rows:0,cols:0}
      })

    settitle('')
    setdetail('')
    console.log('document added with id ',docRef.id);

    setopen(false)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
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
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
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
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl border bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="min-h-64 flex flex-col">
                <div className="mb-5">
                  <Dialog.Title className={`text-xl font-semibold`}>
                    Add New Table
                  </Dialog.Title>
                </div>
                <div className="mb-2 flex-1">
                  <input
                    onChange={(e) => settitle(e.target.value)}
                    className=" mb-3 w-full appearance-none rounded-lg p-2 outline-none drop-shadow-[0px_2px_3px_#999] placeholder:text-black focus:ring-1"
                    placeholder={'Title'}
                  />
                  <textarea
                    onChange={(e) => setdetail(e.target.value)}
                    rows={3}
                    placeholder={'Detail'}
                    className=" w-full appearance-none rounded-lg border-0 p-2 outline-none drop-shadow-[0px_2px_3px_#999] placeholder:text-black"
                  />
                </div>
                <button
                  type="submit"
                  onClick={addTable}
                  className="mt-1 box-border w-full rounded-md bg-cyan-500 p-1 text-center text-lg outline-none ring-0 ring-black transition-all hover:ring-1"
                >
                  Create Table
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default NewTableModal
