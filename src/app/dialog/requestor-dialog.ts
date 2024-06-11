import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'requestor-dialog',
    templateUrl: 'requestor-dialog.html',
    styleUrls:['requestor-dialog.scss'],
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class RequestorDialog {
    constructor(
      public dialogRef: MatDialogRef<RequestorDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }

  export interface DialogData {
    animal: string;
    name: string;
  }