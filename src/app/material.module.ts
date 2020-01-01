import {NgModule} from '@angular/core';
import {MatInputModule, MatButtonModule, MatIconModule} from '@angular/material';


@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],

    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ]

})

export class MaterialModule {}
