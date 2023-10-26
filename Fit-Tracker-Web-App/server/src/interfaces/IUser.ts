
/**
 * General User Interface
 * 
 */
export interface IUser{
    email: string;
    username: string;
    password: string;

    firstname: string;
    lastname: string;
  }

/**
 * Form Input with requried properties to create a new User
 * 
 */
  export interface IUserInputDTO {
    username: string;
    email: string;
    password: string;
  }