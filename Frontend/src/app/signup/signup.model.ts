export class SignupModel{
    constructor(

      public  name:String,
      public  email:String,
      public password:String,
      public repsw:String,
      public contacts:Array<{name:string,isMuted: boolean, isBlocked: boolean}>       
 

    )
    
        {}
}