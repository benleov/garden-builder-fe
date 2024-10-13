import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GardenComponent} from "@app/components/garden/garden.component";
import {PlantsComponent} from "@app/components/plants/plants.component";
import {HomeComponent} from "@app/components/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'gardens', component: GardenComponent},
  {path: 'plants', component: PlantsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
