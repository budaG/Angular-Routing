import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      [
        {path:'welcome', component: WelcomeComponent},
        {path: 'products',
          loadChildren: () => import('./products/product.module')
          .then(m=>m.ProductModule),
        canActivate:[AuthGuard],
      data:{preload:false}},
        {path: '', redirectTo: 'welcome', pathMatch: 'full'},
        {path: '**', component:PageNotFoundComponent}
      ],
      {
        enableTracing: true,
        preloadingStrategy: SelectiveStrategy
      }
    )
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
