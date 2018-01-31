import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Toast} from '@ionic-native/toast';
import {SocialSharing} from '@ionic-native/social-sharing';
import domtoimage from 'dom-to-image';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [SocialSharing, Toast]
})
export class DetailsPage {
  madyeh;
  filteredData = [];
  share_list = [];
  items_to_share = [];
  share_class='hide';
  searchActive: Boolean = false;
  hideTitle: Boolean = false;
  search_text: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _sharer: SocialSharing,
              private _toast: Toast) {
    this.madyeh = this.navParams.data.madyeh;
    this.filteredData = this.madyeh.body;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  onSearchInput(event) {
    var simplifyArabic = function (str) {
      return str.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618), "g"), "");
    };
    this.filteredData = [];
    for (var i = 0; i < this.madyeh.body.length; i++) {
      if (simplifyArabic(simplifyArabic(this.madyeh.body[i])).search(this.search_text) > -1) {
        this.filteredData.push(this.madyeh.body[i])
      }
    }
  }

  toggleSelection(index) {

    if (this.share_list.indexOf(index) > -1) {
      this.share_list.splice(this.share_list.indexOf(index), 1)
    } else {
      this.share_list.push(index)

    }
  }

  onSearchCancel() {
    this.searchActive = false;
    this.hideTitle = false;
    this.filteredData = this.madyeh.body;
  }

  activateSearch() {
    this.searchActive = true
    this.hideTitle = true;
  };

  shareAction(share_list) {
    var that = this;
    this.items_to_share = [];
    for(var i = 0; i < this.share_list.length; i++){
      this.items_to_share.push(this.filteredData[this.share_list[i]])
    }
    console.log(this.items_to_share);
    // that.share_list = lines;
    // message = message + ' #البردة #مدح #سيدنا #النبي  @bordaelmadyh  '
    that.share_class = '';
    setTimeout(function () {
      // that._sharer.share(message,null, null, 'https://goo.gl/Q25Nq3');
      var node = document.getElementById('share_list');
      domtoimage.toPng(node)
        .then(function (dataUrl) {
          that._sharer.share(null, 'text', dataUrl)
          for(var i = 0; i <= that.share_list.length; i++){
            that.share_list.splice(0)
            that.items_to_share.splice(0)
          }
          that.share_class = 'hide';
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', JSON.stringify({message: error.message, stack: error.stack}));
        });
    }, 500)
    this._toast.show(`جاري إنشاء الصورة....`, '7000', 'bottom').subscribe(
      toast => {
        //  without subscribe method toast is not working on android
      }
    );
  }

}
