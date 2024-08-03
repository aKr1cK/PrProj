import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestorDialog } from './dialog/requestor-dialog';
import * as mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as htmlDocx from 'html-docx-js';
import * as JSZip from 'jszip';
import { readFileSync } from 'fs';
import { FileViewerComponent } from './file-viewer/file-viewer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items = ['SATYA','TORD']
  title = 'prproject';
  myFile: any;
  htmlContent: any;

  getName(name: any){
    alert(name)
  }

  requisitionTypes = [{id:'Computer Operation Manager 1'},{id:'Computer Operation Manager 2'}];
  titleTypes = [{id:'Computer Operation Manager 1'},{id:'Computer Operation Manager 2'}];
  caiContractManagerList = [{id:'Susan Lewis'},{id:'Susan Lewis 2'}];
  positionTypeList = [{id:'Standard'},{id:'On Contract'}];
  workflowProcessDesignationList= [{id:'CWP'},{id:'CWP 2'}];
  workArrangementsList = [{id:'Work Arrangement Option 1'},{id:'Work Arrangement Option 2'}];
  rateOptionsList = [{id:'Per Hour'},{id:'Per Day'}];

  loginForm: FormGroup;
  inputSkill: any;
  inputReq: any;
  inputYoe: any;
  showAdd: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    
    this.loginForm = this.formBuilder.group({
      requisitionCategory:['', Validators.required],
      title:['', Validators.required],
      numberOfOpenings:['', Validators.required],
      cStartDate:[new Date(), Validators.required],
      cEndDate:[new Date(), Validators.required],
      worksiteAddress:['', Validators.required],
      caiContractManager:['', Validators.required],
      agencyInterviewType:['', Validators.required],
      expensesAllowed:['', Validators.required],
      tempToHire:['', Validators.required],
      positionType:['', Validators.required],
      workflowProcessDesignation:['', Validators.required],
      estimatedProjectCompletionDate:[new Date(), Validators.required],
      workArrangements:['', Validators.required],
      hoursPerDay:['', Validators.required],
      daysPerWeek:['', Validators.required],
      maxPayRate:['', Validators.required],
      rate:['Per Hour', Validators.required],
      shortJobDescription:['', Validators.required],
      completeJobDescription:['', Validators.required],
      clientContact:['', Validators.required],
      reqOwner:['', Validators.required],
      reportsTo:['', Validators.required],
      workLocation:['', Validators.required],
      costCenter:['', Validators.required],
      skills: new FormArray([
        new FormControl({skill:'SQL',req:"Database",yoe:"3"}),
        new FormControl({skill:'EXCEL',req:"Calculate",yoe:"5"}),
      ]),
      projectName:['', Validators.required],
      justificationComments:['', Validators.required],
    });
  }

  ngOnInit() {
    
  }

  get skills(): FormArray {
    return this.loginForm.get('albums') as FormArray;
  }

  removeSkill(index: any){
    this.loginForm.get('skills')?.value.splice(index,1);
  }

  addSkill(){
    if(this.inputSkill === "" || this.inputReq === "" || this.inputYoe === ""){
      return;
    }
    this.loginForm.get('skills')?.value.push({skill:this.inputSkill,req:this.inputReq,yoe:this.inputYoe})
    this.inputSkill = "";
    this.inputReq = "";
    this.inputYoe = "";
    this.showAdd = false;
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestorDialog, {
      height:'455px',
      width:'808px',
      data: {name: 'SATYA', animal: "human"},
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // handleFileInput(files: any){
    
  //   let file = files.currentTarget.files[0];
  //   const reader = new FileReader();
  //   reader.onload = function(e: any) {
  //     debugger;
  //       const blob = new Blob([new Uint8Array(e?.target?.result)], {type: file.type });
  //       console.log(blob);
  //       mammoth.convertToHtml({blob} as any).then((result)=>{
  //         debugger;
  //       },(error)=>{
  //         debugger;
  //       })
  //   };
  //   reader.readAsArrayBuffer(file);
  //   /**/
  // }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    // if (file) {
    //   const arrayBuffer = await this.readFile(file);
    //   this.htmlContent = await this.convertDocxToHtml(arrayBuffer);
    //   this.openFile(this.htmlContent);
    // }
    this.openFile(file);
  }

  readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  async convertDocxToHtml(arrayBuffer: ArrayBuffer): Promise<string> {
    const result = await mammoth.convertToHtml({ arrayBuffer });
    return result.value;
  }

  openFile(file: any): void {
    const dialogRef = this.dialog.open(FileViewerComponent, {
      data: file,
      width:'80vw',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
