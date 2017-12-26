import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Mada2h } from  '../../../mada2h';
import {DetailsPage} from '../details/details'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    mada2h;
  constructor(public navCtrl: NavController) {
    this.mada2h = Mada2h
  }


  openDetailsPage(item){
    console.log(item)
    this.navCtrl.push(DetailsPage, {
      madyeh: item
    })
  }


}
