import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  moviesDB: any[]=[];
  movieTitle:string="";
  year:number=0;
  movieId:string="";
  aYear:number=0;

  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear};
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Get all Movie
  onGetMovie() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.movieTitle, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovie();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovie();
    });
  }

  //delete using year
  deleteBeforeYear(aYear){
    this.dbService.deleteBefore(aYear).subscribe(result => {
      this.onGetMovie();
    });
  }

//movie to add actor
onClickActors(item){
  this.actorId=item._id;
}

  //Add actor to movie
  addActorToMovie(item){
    let obj = { 'id':this.actorId };
    this.movieId=item._id;
    this.dbService.updateAddActor(this.movieId,obj).subscribe(result=>{
      this.onGetMovie();
    })
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovie();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
}