import {NgModule} from '@angular/core';
import {MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule.setLocale('au'),
    ],

    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule
    ]

})

export class MaterialModule {}
