import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() searchTerm: string = '';

  @Output() searchEvent = new EventEmitter<string>();
 

  onSearch(): void {
    this.searchEvent.emit(this.searchTerm);
  }
}
