import BookList from '@/components/BookList';
// import { sampleBooks } from '@/constants';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { desc, eq } from 'drizzle-orm';
import React from 'react'

const page = async () => {

  const BorrowedBooks = await db
    .select()
    .from(books)
    .innerJoin(borrowRecords, eq(books.id, borrowRecords.bookId)) // Only books that exist in borrowRecords
    .orderBy(desc(books.createdAt));

  if (BorrowedBooks.length === 0) {
    return (
      <div className='text-center text-red-600 '>
        <p className='text-xl font-bold'>No Books Borrowed</p>
      </div>
    )
  }

  return (
    <>
      <BookList title="Borrowed Books" books={BorrowedBooks.map(record => record.books)} />
    </>
  )
}

export default page
