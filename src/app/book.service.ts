import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Book } from './book.model';
import bookData from './books.json';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}
  private books: Book[] = bookData;

  getLatestBooks(): Observable<Book[]> {
    return of(this.books).pipe(
      catchError((error: any) => {
        console.error('Error fetching all books:', error);
        return of([]); // Return an empty array in case of an error
      }),
      map((allBooks: Book[]) => {
        // Sort books by year in decreasing order
        allBooks.sort((a: Book, b: Book) => b.year - a.year);

        // Get the lastest 3 books
        const latestBooks = allBooks.slice(0, 3);
        return latestBooks;
      })
    );
  }

  getAllBooks(): Observable<Book[]> {
    // Return all books
    return of(this.books);
  }

  getBookDetails(id: string): Observable<any> {
    // Return details for a specific book
    return of(this.books.find((book) => book.id === id));
  }

  searchBooks(title: string): Observable<Book[]> {
    // Use of operator to simulate an HTTP request
    return of(this.books).pipe(
      catchError((error: any) => {
        console.error('Error fetching all books:', error);
        return of([]); // Return an empty array in case of an error
      }),
      map((allBooks: Book[]) => {
        // Filter books based on the search term
        const searchResults = allBooks.filter((book: Book) =>
          book.title.toLowerCase().includes(title.toLowerCase())
        );

        return searchResults;
      })
    );
  }
}
