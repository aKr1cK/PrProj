import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import * as mammoth from 'mammoth';

@Component({
    selector: 'file-viewer-modal',
    templateUrl: 'file-viewer.component.html',
    styleUrls:['file-viewer.component.scss'],
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
      CommonModule
    ],
  })
  export class FileViewerComponent implements OnInit {
    public viewer: string = '';
    htmlContent: any;
    imageUrl: string  = '';
    constructor(
      public dialogRef: MatDialogRef<FileViewerComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {  
      if(this.data.type.includes('image')){
        this.viewer = 'image';
      }else if(this.data.type === 'application/msword' || this.data.type.includes('officedocument') || this.data.type === 'application/msword'){
        this.viewer = 'docx';
      }else if(this.data.type  == 'text/plain'){
        this.viewer = 'text';
      }else{
        this.viewer = 'notSupported';
      }
      this.renderFile();
    }

    async renderFile() {
      const arrayBuffer = await this.readFile(this.data);//blob
      const blob = new Blob([arrayBuffer]);
      switch(this.viewer){
        case 'image':
          this.imageUrl = URL.createObjectURL(blob);
          break;
        case 'docx':
          this.htmlContent = await this.convertDocxToHtml(arrayBuffer);
          break;
        case 'text':
          let textBlob = new Blob([arrayBuffer],{ type: 'text/plain' });
          this.convertBlobToHtml(textBlob);
          break;
      }
    }
  
    readFile(file: File): Promise<ArrayBuffer> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    }
  
    async convertDocxToHtml(arrayBuffer: any): Promise<string> {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      return result.value;
    }

    convertBlobToHtml(blob: Blob): void {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        this.htmlContent = text.replaceAll(/\n/g, '<br>');
      };
      reader.readAsText(blob);
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  }


