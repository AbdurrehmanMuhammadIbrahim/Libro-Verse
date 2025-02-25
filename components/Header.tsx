import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Session } from 'next-auth'
import { getInitials } from '@/lib/utils'

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex 
     justify-between
     items-center
     gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <h1 className='text-5xl font-semibold underline decoration-white md:text-7xl; text-primary '>LibroVerse</h1>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className='bg-amber-100'>{getInitials(session?.user?.name || "IN")}</AvatarFallback>  </Avatar>  </Link>

        </li>

        <li>
          {/* <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form> */}
        </li>
      </ul>
    </header>
  )
}

export default Header
