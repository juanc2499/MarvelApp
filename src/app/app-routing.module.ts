import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';
import { InfoCharacterComponent } from './infoCharacter/info-character/info-character.component';

const routes: Routes = [
  {path:'characters',component:CharactersComponent},
  {path:'',component:CharactersComponent},
  {path:'comic/:id', component:InfoCharacterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
