import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  books: Book[] = [];
  bookSearch: string = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.bookSearch = params['search'] || '';
    });
    this.books =
      this.bookSearch.trim() !== ''
        ? this.searchBooks()
        : this.getLatestBooks();
  }

  getLatestBooks(): Book[] {
    this.bookService
      .getLatestBooks()
      .subscribe((books) => (this.books = books));
    return this.books;
  }

  handleSearch(searchText: string) {
    this.bookSearch = searchText;
    this.books =
      this.bookSearch.trim() !== ''
        ? this.searchBooks()
        : this.getLatestBooks();

    // Update the URL with the search term
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.bookSearch },
      queryParamsHandling: 'merge',
    });
  }
  searchBooks(): Book[] {
    this.bookService.searchBooks(this.bookSearch).subscribe((data) => {
      this.books = data;
    });
    return this.books;
  }

  navigateToBooks(): void {
    this.router.navigate(['/books']);
  }
  navigateToBook(id: string) {
    this.router.navigate(['/book-detail', id]);
  }
}
