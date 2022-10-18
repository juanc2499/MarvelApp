import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageVariant } from 'src/app/models/image';
import { Category, MarvelRequestOptions } from 'src/app/models/request';
import { MarvelService } from 'src/app/services/marvel.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[] = [];
  page: number = 1;
  @Input() key: string = 'name';
  @Input() ComicsFavorite:any[] =[];
  @Input() imageVariant: ImageVariant = ImageVariant.standard_fantastic;
  @Output() CharacterInfo = new EventEmitter();
  @Output() ComicFav = new EventEmitter();
  @Output() ChangePagination = new EventEmitter();
  @Output() RemoveFav = new EventEmitter();

  options!: MarvelRequestOptions;
  categoryCharacter: Category = 'comics';
  characters: any = [];
  SelectFavComic:boolean=true;
  itemtitle:string | undefined

  constructor(private marvelService: MarvelService, private router:Router) { }
  ngOnInit(): void {
    this.options = {
      limit: 20,
      offset: 0
    };

  }

  getImage(item: any) {
    return item.thumbnail && this.marvelService.getImage(item.thumbnail);
  }

  selectCharacter(item:any){
    this.CharacterInfo.emit(item)
  }

  selectComic(comic:any){
    let urlcomic;
    urlcomic=comic.resourceURI;
    this.marvelService.getcomic(urlcomic,this.categoryCharacter,this.options)
    .subscribe(data => this.handleResponse(data));
  }

  handleResponse(data: any, reset: boolean =false){
    this.characters=[];
    this.characters = reset ? data.results : [...this.characters, ...data.results];

  }

  addFavorites(comicItem:any){
   this.ComicFav.emit(comicItem)
   this.SelectFavComic=false;
  }

  RemoveFavorites(comicItem:any){
    this.RemoveFav.emit(comicItem);
    for(let i=0; i<this.ComicsFavorite.length; i++){
      this.SelectFavComic=true;
      let item = this.ComicsFavorite[i];
       this.itemtitle = item.title ;
      if(comicItem.title == this.itemtitle){
        this.SelectFavComic=true;
        break
      }
    }
  }



  ChangePage(item:any){
    this.router.navigate(['/comic', item.id])

  }
  pageChanged($event: any){
    this.ChangePagination.emit($event);
  }

  ItemFav(comics:any){
    this.SelectFavComic=true;
    for(let i=0; i<this.ComicsFavorite.length; i++){
      let item = this.ComicsFavorite[i];
       this.itemtitle = item.title ;
      if(comics.name == this.itemtitle){
        this.SelectFavComic=false;
        break
      }
    }
  }
}

