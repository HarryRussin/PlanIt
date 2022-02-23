import {
  ChevronDownIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/solid'
import { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { TTEinfoState, TTElementModalState } from '../atoms/modelAtom'
import { Dialog, Transition, Switch } from '@headlessui/react'
import Homework from './homework'

function TTElementModal({ rows, cols, setrows, setcols }: any) {
  const [open, setopen] = useRecoilState(TTElementModalState)
  const [info, setinfo] = useRecoilState(TTEinfoState)
  const [showmore, setshowmore] = useState(true)
  const [completed, setcompleted] = useState(false)

  const [hwTitle, sethwTitle] = useState('')
  const [hwDesc, sethwDesc] = useState('')
  const titleRef = useRef(null)

  const addHw = () => {
    if(hwTitle===''){return}
    const hw = { title: hwTitle, desc: hwDesc, completed: completed }
    let infos = JSON.parse(JSON.stringify(info))
    infos.homework.push(hw)
    setinfo(infos)
    sethwDesc('')
    sethwTitle('')
    setcompleted(false)
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
            <div className=" my-2 box-border h-[90vh] inline-block mx-auto transform rounded bg-white p-6 text-left transition-all">
              <div
                onClick={() => setopen(false)}
                className=" absolute -right-4 top-0 z-10 rounded-b-xl bg-gray-300 pt-1 transition-all hover:pt-2 active:pt-4"
              >
                <XIcon className=" h-8 w-16 text-2xl" />
              </div>
              <div className="flex justify-between space-x-5">
                <div className="">
                <h2 className="ml-8">Title</h2>

                  <Dialog.Title
                    className={`relative flex items-center text-3xl font-semibold`}
                  >
                    <PencilIcon className="absolute top-1.5 left-0 h-8 w-8" />
                    <input
                      className="mx-8 appearance-none rounded border-2 pl-1 pt-0 border-black outline-none placeholder:text-black"
                      placeholder={info.title}
                      ref={titleRef}
                    />
                  </Dialog.Title>
                  <div className="mx-8 mt-2">
                    <h2 className="">Description</h2>
                    <textarea
                      rows={3}
                      placeholder={info.detail}
                      className="w-full appearance-none rounded border-2 border-black p-0 text-lg outline-none placeholder:text-black focus:border-black focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              <div className="w-[50vw] border p-4">
                <h3 className=" text-3xl">Homework</h3>
                <hr className='m-2'/>
                <div className=" mt-2 flex flex-col p-2 ">
                  <div className="overflow-y-auto max-h-[30vh] scrollbar-thin scrollbar z-10 scrollbar-thumb-gray-500">
                    {info.homework.map((item) => (
                      <Homework {...item}/>
                    ))}
                  </div>
                  <hr className='my-2'/>
                  <form className=" group px-2 flex flex-col transition-all">
                    <div className="relative flex ">
                      <input
                        onChange={(e) => sethwTitle(e.target.value)}
                        value={hwTitle}
                        type="text"
                        placeholder="Title"
                        className="form-input rounded-lg flex-1 appearance-none border-0 p-2 outline-none focus:outline-none focus:ring-1 focus:ring-black"
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
                        className=" box-border flex-1 appearance-none rounded-md border-none mx-1 p-2 outline-none focus:outline-none focus:ring-1 focus:ring-black"
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
