import { useSession } from "next-auth/react"
import Link from "next/link"

function Header() {
  
    const {data:session} = useSession()

  return (
      <div className="flex bg-slate-300 py-2 px-3">
        <p className="flex-1">{session?.user?.name}</p>
        <div className="flex space-x-2">
          <p>Home</p>
          <p>Timetables</p>
          <Link href={{pathname:'/auth/signin'}} replace>Account</Link>
        </div>
      </div>
  )
}

export default Header
