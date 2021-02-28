import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '@todoapp/books';

@Component({
  selector: 'todoapp-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css'],
})
export class BookCollectionComponent {
  @Input() books: Array<Book>;
  @Output() remove = new EventEmitter();
}
