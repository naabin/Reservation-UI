import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material/material.module';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { TabsComponent } from './tabs/tabs.component';
import { FeedComponent } from './feed/feed.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { MatDialogModule, MatTableModule, MatPaginatorModule, MatTabsModule, MatCheckboxModule, MatSortModule, MatMenuModule } from '@angular/material';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    NavigationComponent,
    InputComponent,
    ModalComponent,
    TableComponent,
    TabsComponent,
    FeedComponent,
    PlaceholderComponent,
    NotificationsComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSortModule,
    MatMenuModule
  ],
  exports: [
    NavigationComponent,
    InputComponent,
    ModalComponent,
    TableComponent,
    TabsComponent,
    FeedComponent,
    PlaceholderComponent,
    NotificationsComponent
  ]
})
export class SharedModule { }
