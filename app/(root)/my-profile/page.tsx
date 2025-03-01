import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
// import { sampleBooks } from '@/constants';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { desc, eq } from 'drizzle-orm';
import React from 'react'

const page = async() => {

  const BorrowedBooks = await db
    .select()
    .from(books)
    .innerJoin(borrowRecords, eq(books.id, borrowRecords.bookId)) // Only books that exist in borrowRecords
    .orderBy(desc(books.createdAt));


  return (
    <>

      <form action={async () => {
        "use server";
        await signOut();
      }} >

        <Button type="submit" >

          Logout
        </Button>
      </form>

      <BookList title="Borrowed Books" books={BorrowedBooks.map(record => record.books)} />
    </>
  )
}

export default page
