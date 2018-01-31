import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Mada2h} from './../../mada2h';
import {DetailsPage} from '../details/details'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  mada2h;
  filteredData = [];
  search_text = '';
  searchActive= false;

  constructor(public navCtrl: NavController) {
    this.mada2h = Mada2h;
    this.filteredData = this.mada2h;
  }


  openDetailsPage(item) {
    this.navCtrl.push(DetailsPage, {
      madyeh: item
    })
  }

  onSearchInput(event) {
    var simplifyArabic = function (str) {
      return str.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618), "g"), "");
    };
    this.filteredData = [];
    for (var i = 0; i < this.mada2h.length; i++) {
      if (simplifyArabic(simplifyArabic(this.mada2h[i].name)).search(this.search_text) > -1) {
        this.filteredData.push(this.mada2h[i])
      }
    }
  }
  onSearchCancel(){
    this.filteredData = this.mada2h;
    this.search_text = '';
    this.searchActive = false;
  }
  activateSearch(){
    this.searchActive = true;
  };


}
