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
            // "ztoken": "ZFTKXYS2KBNV3O54",
            // "uid": "jap@miramar",
            // "lname": "Miramar",
            // "fname": "Dev",
            // "authlvl": 100,
            // "subscriber": "Econo Lodge - TN.Kingsport",
            // "recordid": "5A9FRBQRJ7S1S0T2",
            // "subscriberid": "1CL3J9J0732CSDAF"
        });
    }

    addUser(userData:any){
        this.userSource.next(userData)
   //     console.log(this.getUser())
    }
    getUser(){
        return this.userSource.value
    }
}
