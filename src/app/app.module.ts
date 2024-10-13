import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule, DatePipe, UpperCasePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";

import {AppRoutingModule} from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {AppComponent} from './app.component';

/** backend mocking */

// import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
// import {TestDataService} from '@app//services/test-data.service';

/** material */
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";

import {EmojiPipe} from './emoji.pipe';

import {HomeComponent} from '@app/components/home/home.component';
import {PlantsComponent} from '@app/components/plants/plants.component';
import {GardenComponent} from '@app/components/garden/garden.component';
import {GardenBedComponent} from '@app/components/garden-bed/garden-bed.component';
import {MessagesComponent} from '@app/components/messages/messages.component';
import {PlantDialogComponent} from '@app/components/plant-dialog/plant-dialog.component';
import {SectionDialogComponent} from '@app/components/section-dialog/section-dialog.component';
import {LayoutDialogComponent} from '@app/components/layout-dialog/layout-dialog.component';
import {GardenDialogComponent} from '@app/components/garden-dialog/garden-dialog.component';
import {SectionGroupDialogComponent} from '@app/components/section-group-dialog/section-group-dialog.component';
import {
  SectionGroupSelectDialogComponent
} from '@app/components/section-group-select-dialog/section-group-select-dialog.component';
import {SectionHistoryDialogComponent} from '@app/components/section-history-dialog/section-history-dialog.component';

import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TaskListComponent} from '@app/components/task-list/task-list.component';
import {TaskListSheetComponent} from '@app//components/task-list-sheet/task-list-sheet.component';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({ declarations: [
        AppComponent,
        GardenComponent,
        EmojiPipe,
        PlantsComponent,
        MessagesComponent,
        PlantDialogComponent,
        SectionDialogComponent,
        LayoutDialogComponent,
        GardenDialogComponent,
        GardenBedComponent,
        HomeComponent,
        SectionGroupDialogComponent,
        SectionGroupSelectDialogComponent,
        SectionHistoryDialogComponent,
        TaskListComponent,
        TaskListSheetComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatGridListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatInputModule,
        FlexLayoutModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatMenuModule,
        // HttpClientInMemoryWebApiModule.forRoot(TestDataService),
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatTooltipModule], providers: [
        DatePipe,
        UpperCasePipe,
        { provide: MatBottomSheet },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
}
