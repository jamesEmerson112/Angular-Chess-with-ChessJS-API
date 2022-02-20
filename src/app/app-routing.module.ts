import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chess } from 'chess.js';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'chess', component: ChessboardComponent},
  // {path: '', redirectTo: '/chessboard-component', pathMatch: 'full'},
  {path: '', component: ChessboardComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
