import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Header = () => {
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
