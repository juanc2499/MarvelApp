import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { offset } from '@popperjs/core';
import { concatMap, debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { Category, MarvelRequestOptions } from 'src/app/models/request';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  categoryCharacter: Category = 'characters';
  ComicsFavorites: any[] =[];
  characters: any[] = [];
  total = 0;
  options!: MarvelRequestOptions;
  searchtext$ = new Subject<string>();
  order :string="";
  offset=0;
  limit=10;

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.options = {
      limit: 10,
      offset: 0
    };
    this.getCharacter();
    this.search();
  }
  OnFilterASC(filter:string){
    this.order=filter;

    this.marvelService.getDataOrder(this.categoryCharacter, this.options, this.order)
      .subscribe(m => this.handleResponseFilter(m));
  }

  getCharacter(){

    this.options.offset=this.offset;
       this.marvelService.getData(this.categoryCharacter, this.options)
      .subscribe(data => this.handleResponse(data));
  }

  search() {
    this.searchtext$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(() => this.marvelService.getData(this.categoryCharacter, this.options))).subscribe(data => this.handleResponse(data, true));
  }

  handleResponse(data: any, reset: boolean =false){
    this.characters=[];
    this.total = data.total;
    this.characters = reset ? data.results : [...this.characters, ...data.results];
  }

  handleResponseFilter(m: any, reset: boolean =false){
    this.characters=[];
    this.characters = reset ? m.results : [...this.characters, ...m.results];
  }

  OnSearch(searchtext:string){
    if(searchtext !== this.options.nameStartsWith){
      if(searchtext){
        this.options = {
          limit: 10,
          offset: 0,
          nameStartsWith: searchtext
        };
      }else{
        this.options = {
          limit: 10,
          offset: 0
        };
      }
      this.characters = [];
      this.total = 0;

      this.searchtext$.next(searchtext);
    }
  }
  FavList(ListFav:any){
      this.ComicsFavorites.push(ListFav);
     this.ComicsFavorites =this.ComicsFavorites.filter((item: any,index: any)=>{
    return this.ComicsFavorites.indexOf(item) === index;})
  }

  getImage(item: any) {
    return item.thumbnail && this.marvelService.getImage(item.thumbnail);
  }

  removeFav(item:any){
    console.log(item)
    this.ComicsFavorites = this.ComicsFavorites.filter((x: any) => x.title !== item.title)
  }

  OffsetPag($event:any){
    if($event!=0){
      this.offset = $event*this.options.limit - 10;
      this.getCharacter();
      }
    }
  }



