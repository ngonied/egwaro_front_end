import React, {Component} from "react";
import axiosInstance from "./services/axiosapis";








class NewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { userData: {}
                     
          
        };
        this.getData = this.getData.bind(this);

      };

     async getData(){
          try{
                const response = await axiosInstance.get("users/profile/").then
          }catch(error){
              throw error;
          };  
      }
}