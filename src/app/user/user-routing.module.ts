import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { UserUiComponent } from './user-signup/user-ui.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
      path: 'login', 
      component: LoginComponent
        
    },
    {
        path: 'signup',
        component: UserUiComponent
    },
    {
        path: 'user',
        component: UserAccountComponent,
        canActivate: [AuthGuard]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}