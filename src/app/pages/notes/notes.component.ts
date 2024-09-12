import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { NotesService } from '../../core/services/notes.service';
import { NotesData } from '../../core/interfaces/notes-data';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../core/pipes/filter.pipe';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NgStyle,
    SideNavComponent,
    DialogComponent,
    FormsModule,
    FilterPipe,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  private readonly _NotesService = inject(NotesService);
  searchInput: string = '';
  allNotes: NotesData[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this._NotesService.getAllNotes().subscribe({
      next: (res) => {
        this.allNotes = res.notes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openDialog(noteDetails?: NotesData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '500px',
      data: {
        title: noteDetails?.title,
        content: noteDetails?.content,
        _id: noteDetails?._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  deleteNote(deletedNote: string, noteIndex: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          this._NotesService.deleteNote(deletedNote).subscribe({
            next: (res) => {
              this.allNotes.splice(noteIndex, 1);
              this.ngOnInit();
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      }
    });
  }

  updateDate(noteDetails: NotesData, noteIndex: number): void {
    this.openDialog({
      title: noteDetails.title,
      content: noteDetails.content,
      _id: noteDetails._id,
    });
  }
}
