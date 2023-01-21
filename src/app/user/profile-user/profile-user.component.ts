import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  providers: [UserService]
})
export class ProfileUserComponent implements OnInit{
  protected identity:any;
  private token:any;
  protected user:User;
  protected css:string;
  protected message:string;

  public constructor(private _userService:UserService){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(this.identity.sub, '', '', '','','','','','','');
    this.css = 'alert-info';
    this.message = 'Actualizar datos del usuario';
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getUser();
  }

  private getUser(){
    this._userService.getUser(this.token).subscribe(
      response => this.user = response.user, 
      error => console.log(error)
    );
  }

  protected onSubmit(form:any){
    this._userService.update(this.user, this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.loadAlert(response, 'alert-danger')
        }else{
          this.loadAlert(response, 'alert-success');
          this.identity.name = this.user.name;
          this.identity.lastname = this.user.lastname;
          sessionStorage.setItem('identity', JSON.stringify(this.identity));
        }
      }, error => console.log(error)
    );
  }

  private loadAlert(response:any, css:string){
    this.css = css;
    this.message = response.message;
    setTimeout(() => {
      this.css = 'alert-info';
      this.message = 'Actualizar datos del usuario'
    }, 3000);
  }

}
