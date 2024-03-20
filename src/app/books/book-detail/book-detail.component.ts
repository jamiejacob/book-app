import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../book.model';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  bookId: string = '';
  book?: Book;
  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
  }

  ngOnInit() {
    this.getBookDetails();
  }

  getBookDetails() {
    this.bookService.getBookDetails(this.bookId).subscribe((data) => {
      this.book = data;
    });
  }
}
