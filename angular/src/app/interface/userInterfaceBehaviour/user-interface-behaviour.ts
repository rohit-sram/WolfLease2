import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserInterface } from "../userInterface/user-interface";
@Injectable(
    {
        providedIn: 'root'

    }
)
export class UserInterfaceBehaviour {
    public userSource:any;
    constructor(){
        this.userSource = new BehaviorSubject<UserInterface>({
            token : '',
            username : '',
            email : '',
            first_name : '',
            last_name : '',
        });
    }

    addUser(userData:any){
        this.userSource.next(userData)
   //     console.log(this.getUser())
    }
    getUser(){
        return this.userSource.value
    }
    getToken(){
        return this.userSource.value.token
    }
}
