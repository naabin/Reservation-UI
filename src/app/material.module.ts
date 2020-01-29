import {NgModule} from '@angular/core';
import {MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule.setLocale('au'),
        MatProgressSpinnerModule,
    ],

    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule,
        MatProgressSpinnerModule,
    ]

})

export class MaterialModule {}
