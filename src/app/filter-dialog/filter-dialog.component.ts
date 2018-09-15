import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  isHandset$: Observable<boolean> = this.appService.isHandset$;

  constructor (
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ) { }

  ngOnInit () {
    console.log(this.data);
  }

  selectItem (item, key) {
    console.log(item);
    this.dialogRef.close({ item, key });
  }

  onNoClick (): void {
    this.dialogRef.close();
  }

}
