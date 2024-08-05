import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  export class FileViewerComponent implements AfterViewInit {
    public viewer: string = '';
    htmlContent: any;
    imageUrl: string  = '';

    @ViewChild('webviewer', { static: true }) webviewer!: ElementRef;

    private instance: any;

    constructor(
      public dialogRef: MatDialogRef<FileViewerComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngAfterViewInit() {
      
      if(this.data.type.includes('image')){
        this.viewer = 'image';
        this.renderFile();
      }else if(this.data.type === 'application/msword' || this.data.type.includes('officedocument') || this.data.type === 'application/msword'){
        this.viewer = 'docx';
        this.loadWebViewer().then(() => {
          this.instance = (window as any).WebViewer({
            //path: 'assets/webviewer/public', // Adjust this path as needed   CORRECT
            path:'node_modules/@pdftron/webviewer/public',
            initialDoc: '', // This will be set after the file is selected
          }, this.webviewer.nativeElement).then((instance: any) => {
            this.instance = instance;
            this.renderFile();
          });
        });
      }else if(this.data.type  == 'text/plain'){
        this.viewer = 'text';
        this.renderFile();
      }else{
        this.viewer = 'notSupported';
        this.renderFile();
      }
    }

    private loadWebViewer(): Promise<void> {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/assets/webviewer/webviewer.min.js'; // Adjust this path as needed CORRECT
        //script.src = './node_modules/@pdftron/webviewer/webviewer.min.js'; // Adjust this path as neede
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load WebViewer script'));
        document.head.appendChild(script);
      });
    }
    

    async renderFile() {
      const arrayBuffer = await this.readFile(this.data);//blob
      const blob = new Blob([arrayBuffer]);
      switch(this.viewer){
        case 'image':
          this.imageUrl = URL.createObjectURL(blob);
          break;
        case 'docx':
          //this.htmlContent = await this.convertDocxToHtml(arrayBuffer);
          if (this.instance) {
            this.instance.Core.documentViewer.loadDocument(arrayBuffer, {
              filename: 'document.docx',
            });
          }
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

    convertToExcel(){
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.data = <any[][]>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      };
      reader.readAsBinaryString(this.data);
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  }


