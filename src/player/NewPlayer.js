import { Utils, Lightning, MediaPlayer } from 'wpe-lightning-sdk'

export default class NewPlayer extends Lightning.Component {

  static _template() {
    return {
    //   Controls: {
    //     x: 99,
    //     y: 890,
    //     type: PlayerControls, // some custom class for Player Controls
    //   },
    //   Progress: {
    //     x: 99,
    //     y: 970,
    //     type: PlayerProgress, // some custom class for Player Progress bar
    //   },
      MediaPlayer: {
        type: MediaPlayer,
      },
      Play: {
        MyImage: {
            x: (window.innerWidth/2)  - 100,
            y: (window.innerHeight/2) - 100,
            w: 100,
            h: 100,
            src: Utils.asset("./images/icons/play.png")
        }
    },
    Stop: {
        MyImage: {
            x: (window.innerWidth/2)  - 100,
            y: (window.innerHeight/2) - 100,
            w: 1,
            h: 1,
            src: Utils.asset("./images/icons/pause.png")
        }
    }
    }
  }

  set asset(v) {
    this._asset = v;
    this._items = v;
    // console.log(v);
    // console.log('before play: ', this);
    if(this._items.videoPlayWrappers != undefined){
        this.tag('MediaPlayer').open(this._items.videoPlayWrappers.videoPlayInfoList[0].sdVideoUrl);
    }else{
        // this.tag('MediaPlayer').open(this._items.liveUrl.live480Url);
         this.tag('MediaPlayer').open('https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8');
    }
}

_init(){
    this.tag('MediaPlayer').updateSettings({consumer: this});

}
//

set item(v){
    this._items = v;
    // console.log(v);
    // this.tag('MediaPlayer').open(this._items.videoPlayWrappers.videoPlayInfoList[0].sdVideoUrl)
}

get item(){
    return this._item;
}

   // this will be invoked on timeupdate
   $mediaplayerProgress({ currentTime, duration }) {
    // console.log(currentTime, duration);
}

// $mediaplayerLoadeddata(){
//     this.showControls();
//     setInterval(this.HideControls(), 5000);
// }

// this will be invoked when the video ends
$mediaplayerEnded() {
    console.log('mediaplayerEnded');
}

// this will be invoked when the video starts playing
$mediaplayerPlay() {
    // console.log('mediaplayerPlay');
    this.tag('Stop').patch({
        visible: false
    }, false);
    this.tag('Play').patch({
        visible: false 
    }, false);
  
}

// this will be invoked when the video pauses
$mediaplayerPause() {
    console.log('mediaplayerPause');
    this.showControls();
    // setTimeout(alert('Test'), 5000);
}

//setInterval(myTimer, 1000);

showControls(){
    console.log('Show Controls');
        this.tag('Stop').patch({
            visible: false
        }, false);
        this.tag('Play').patch({
            visible: true
        }, false);

    }


HideControls(){
console.log('Hide Controls');
    this.tag('Stop').patch({
        visible: false
    }, false);
    this.tag('Play').patch({
        visible: false
    }, false);
}

// this will be invoked when the video stops
$mediaplayerStop() {
    console.log('mediaplayerStop');
}

// this will be invoked when the video raises an error
$mediaplayerError() {
    console.log('stomediaplayerErrorp');
}
    _handleEnter() {
        this.tag('MediaPlayer').playPause()
    }

    // _handleBack(){
    //     console.log(this);
    //     this.tag('MediaPlayer').close();
    //     this._setState("Movies");
    // }

}