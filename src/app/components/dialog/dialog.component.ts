import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotesData } from '../../core/interfaces/notes-data';
import { NotesService } from '../../core/services/notes.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotesData
  ) {}

  private readonly _NotesService = inject(NotesService);

  dialogForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title ? this.data.title : ''),
    content: new FormControl(this.data.content ? this.data.content : ''),
  });

  dialogSubmit(form: FormGroup): void {
    if (!this.data.title && !this.data.content) {
      this.addNote(form.value);
    } else {
      this.updateNote(form.value);
    }
  }

  addNote(newNote: NotesData): void {
    this._NotesService.addNotes(newNote).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateNote(newNote: NotesData): void {
    this._NotesService.handleUpdateNotes(newNote, this.data._id).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
