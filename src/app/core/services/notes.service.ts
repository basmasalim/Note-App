import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { NotesData } from '../interfaces/notes-data';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly _HttpClient = inject(HttpClient);

  addNotes(note: NotesData): Observable<any> {
    return this._HttpClient.post(environment.noteUrl, note, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  getAllNotes(): Observable<any> {
    return this._HttpClient.get(environment.noteUrl, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  deleteNote(noteId: string): Observable<any> {
    return this._HttpClient.delete(environment.noteUrl + noteId, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  handleUpdateNotes(noteDetails: NotesData, noteId: string): Observable<any> {
    return this._HttpClient.put(environment.noteUrl + noteId, noteDetails, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
}
