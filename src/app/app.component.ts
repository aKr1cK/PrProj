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
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    MatRadioModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prproject';

  requisitionTypes = [{id:'Computer Operation Manager 1'},{id:'Computer Operation Manager 2'}];
  titleTypes = [{id:'Computer Operation Manager 1'},{id:'Computer Operation Manager 2'}];
  caiContractManagerList = [{id:'Susan Lewis'},{id:'Susan Lewis 2'}];
  positionTypeList = [{id:'Standard'},{id:'On Contract'}];
  workflowProcessDesignationList= [{id:'CWP'},{id:'CWP 2'}];
  workArrangementsList = [{id:'Work Arrangement Option 1'},{id:'Work Arrangement Option 2'}];
  rateOptionsList = [{id:'Per Hour'},{id:'Per Day'}];

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
    });
  }

  ngOnInit() {
    
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

}
