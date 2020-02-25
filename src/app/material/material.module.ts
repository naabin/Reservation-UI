import {NgModule} from '@angular/core';
import {MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NavbarModule, WavesModule, ButtonsModule, MDBBootstrapModule, IconsModule, DropdownModule } from 'angular-bootstrap-md'


@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule.setLocale('au'),
        MDBBootstrapModule.forRoot(),
        MatProgressSpinnerModule,
        NavbarModule,
        WavesModule,
        ButtonsModule,
        IconsModule,
        DropdownModule,
    ],

    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule,
        MatProgressSpinnerModule,
        NavbarModule,
        WavesModule,
        ButtonsModule,
        IconsModule,
        DropdownModule
    ]

})

export class MaterialModule {}
