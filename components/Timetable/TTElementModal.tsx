import {
  ChevronDownIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/solid'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  TableState,
  TTEinfoState,
  TTElementModalState,
  TTElementPosState,
} from '../../atoms/modelAtom'
import { Dialog, Transition, Switch } from '@headlessui/react'
import Homework from './homework'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'

function TTElementModal({ tableId }: { tableId: string }) {
  const [open, setopen] = useRecoilState(TTElementModalState)
  const [info, setinfo] = useRecoilState(TTEinfoState)
  const [pos, setpos] = useRecoilState(TTElementPosState)
  const [table, settable] = useRecoilState(TableState)

  const [showmore, setshowmore] = useState(true)
  const [hwTitle, sethwTitle] = useState('')
  const [hwDesc, sethwDesc] = useState('')
  const [title, settitle] = useState('')
  const [details, setdetails] = useState('')
  const [completed, setcompleted] = useState(false)

  const [homeworks, sethomeworks] = useState([])

  useEffect(() => {
    sethwDesc('')
    sethwTitle('')
    setcompleted(false)
    getHomeworks()
  }, [open])

  const getHomeworks = async () => {
    let homeworkArr: any = []
    let q = query(
      collection(
        db,
        'tables',
        tableId,
        `row_${pos[0]}`,
        `item_${pos[1]}`,
        'homeworks'
      )
    )
    let data = await getDocs(q)
    data.forEach((doc) => {
      console.log(doc.data())
      homeworkArr.push(doc.data())
    })
    sethomeworks(homeworkArr)
    console.log(homeworkArr)
  }

  const addHw = async () => {
    if (hwTitle === '') {
      return
    }
    const hw = { title: hwTitle, desc: hwDesc, completed: completed }

    let homeworkArr = JSON.parse(JSON.stringify(homeworks))
    homeworkArr.push(hw)
    sethomeworks(homeworkArr)

    await addDoc(
      collection(
        db,
        'tables',
        tableId,
        `row_${pos[0]}`,
        `item_${pos[1]}`,
        'homeworks'
      ),
      {
        title: hwTitle,
        desc: hwDesc,
        completed: completed,
        timestamp: serverTimestamp(),
      }
    )

    sethwDesc('')
    sethwTitle('')
    setcompleted(false)
  }

  const saveAll = async () => {
    let infos = JSON.parse(JSON.stringify(info))
    infos.title = title
    infos.detail = details

    await setDoc(
      doc(db, 'tables', tableId, `row_${pos[0]}`, `item_${pos[1]}`),
      {
        title: title,
        detail: details,
        timestamp: serverTimestamp(),
      }
    )
    setinfo(infos)
    let tableCop = JSON.parse(JSON.stringify(table))

    tableCop[pos[0]][pos[1]] = infos
    settable(tableCop)
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
            <Dialog.Overlay className="fixed inset-0 bg-white" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block align-middle" aria-hidden="true">
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
            <div className=" my-2 mx-auto box-border inline-block h-[90vh] transform rounded bg-white p-6 text-left transition-all">
              <div
                onClick={() => setopen(false)}
                className=" absolute -right-4 top-0 z-10 rounded-full bg-gray-300 pt-1 transition-all active:p-2"
              >
                <XIcon className=" h-8 w-16 text-2xl transition-all hover:scale-90" />
              </div>
              <div className="flex justify-between space-x-5">
                <div className="">
                  <h2 className="ml-8">Title</h2>

                  <Dialog.Title
                    className={`relative flex items-center text-3xl font-semibold`}
                  >
                    <PencilIcon className="absolute top-1.5 left-0 h-8 w-8" />
                    <input
                      className="mx-8 appearance-none rounded border-2 border-black pl-1 pt-0 outline-none placeholder:text-black"
                      onChange={(e) => settitle(e.target.value)}
                      placeholder={info.title}
                    />
                  </Dialog.Title>
                  <div className="mx-8 mt-2">
                    <h2 className="">Description</h2>
                    <textarea
                      onChange={(e) => setdetails(e.target.value)}
                      rows={7}
                      placeholder={info.detail}
                      className="w-full appearance-none rounded border-2 border-black p-0 text-lg outline-none placeholder:text-black focus:border-black focus:outline-none focus:ring-0"
                    />
                    <button
                      onClick={saveAll}
                      className="w-full rounded-md bg-cyan-500 p-1 font-bold text-black"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="w-[50vw] border p-4">
                  <h3 className=" text-3xl">Homework</h3>
                  <hr className="m-2" />
                  <div className=" mt-2 flex flex-col p-2">
                    {homeworks && (
                      <div className="z-10 max-h-[30vh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500">
                        {homeworks.map((item) => (
                          <Homework {...item} />
                        ))}
                      </div>
                    )}
                    <hr className="my-2" />
                    <form className=" group flex flex-col px-2 transition-all">
                      <div className="relative flex ">
                        <input
                          onChange={(e) => sethwTitle(e.target.value)}
                          value={hwTitle}
                          type="text"
                          placeholder="Title"
                          className="form-input flex-1 appearance-none rounded-lg border-0 p-2 outline-none focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        <ChevronDownIcon
                          onClick={() => setshowmore(!showmore)}
                          className={`h-7 w-7 ${
                            showmore ? 'rotate-180' : ''
                          } absolute right-10 top-1.5 transition-all`}
                        />
                        <PlusIcon
                          onClick={addHw}
                          className="absolute right-0 top-0 h-7 w-7 rounded-md bg-cyan-500 p-1 ring-2 ring-black"
                        />
                      </div>
                      <div
                        className={`max-h-0 ${
                          showmore ? 'max-h-[300px]' : ''
                        } flex flex-col overflow-hidden transition-all duration-300`}
                      >
                        <hr className="m-2" />
                        <textarea
                          onChange={(e) => sethwDesc(e.target.value)}
                          value={hwDesc}
                          placeholder="Extra Information"
                          className=" mx-1 box-border flex-1 appearance-none rounded-md border-none p-2 outline-none focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        <hr className="m-2" />
                        <div className="m-2 flex items-center">
                          <Switch
                            checked={completed}
                            onChange={setcompleted}
                            className={`${
                              completed ? 'bg-cyan-500' : 'bg-teal-700'
                            }
          relative mr-2 inline-flex h-[23px] w-[43px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={`${
                                completed ? 'translate-x-5' : 'translate-x-0'
                              }
            pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                          </Switch>
                          <p className="text-md font-semibold">
                            {completed ? 'Completed' : 'Not Completed'}
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TTElementModal
