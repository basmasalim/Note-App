import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(notes: any[], value: string): any {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(value.toLowerCase())
    );
  }
}
