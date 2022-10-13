import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/request';
import { MarvelService } from 'src/app/services/marvel.service';


@Component({
  selector: 'app-info-character',
  templateUrl: './info-character.component.html',
  styleUrls: ['./info-character.component.scss']
})
export class InfoCharacterComponent implements OnInit {
  categoryCharacter: Category = 'characters';
  idCharacter: any;
  characterx:any[]=[]
  constructor(private _route: ActivatedRoute, private marvelService: MarvelService,private router:Router) { }

  ngOnInit(): void {
    this.idCharacter=this._route.snapshot.paramMap.get('id');
    this.getCharacter();
  }

  getCharacter(){
    this.marvelService.getInfo(this.categoryCharacter, this.idCharacter)
      .subscribe((data: any) => this.handleResponse(data));
  }

  handleResponse(data: any, reset: boolean =false){
    this.characterx=[];
    this.characterx = reset ? data.results : [...this.characterx, ...data.results];
  }

  getImage(item: any) {
    return item.thumbnail && this.marvelService.getImage(item.thumbnail);
  }

  OnClick(){
    this.characterx=[];
    this.router.navigate(['characters'])
  }

}


