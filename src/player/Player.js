import { Utils } from "wpe-lightning-sdk";

export default class Player extends lng.Component {

    static _template() {
        return {
            ProgressBar: {
                // player control
            },
            Play: {
                MyImage: {
                    x: 10,
                    y: (window.innerHeight) - 100,
                    w: 100,
                    h: 100,
                    src: Utils.asset("./images/icons/play.png")
                }
            },
            Stop: {
                MyImage: {
                    x: 10,
                    y: (window.innerHeight) - 100,
                    w: 100,
                    h: 100,
                    src: Utils.asset("./images/icons/pause.png")
                }
            }
        }
    }

    // getMediaplayerSettings can return an object
    // the mediaplayer expects an object with a stream property
    // this method will be invoked on every focus path change or you can force it
    // via: this.application.updateFocusSettings()

    set asset(v) {
        this._asset = v;
        this._items = v;
        console.log(v);
        console.log('before play: ', this);
    }

    toggle(player) {
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    }

    getMediaplayerSettings() {
        var player = this;
        return {
            stream: { src: player._items.videoPlayWrappers.videoPlayInfoList[0].sdVideoUrl }
        }
    }

    // this will be invoked on timeupdate
    $mediaplayerProgress({ currentTime, duration }) {
        // console.log(currentTime, duration);
    }

    // this will be invoked when the video ends
    $mediaplayerEnded() {
        console.log('mediaplayerEnded');
    }

    // this will be invoked when the video starts playing
    $mediaplayerPlay() {
        console.log('mediaplayerPlay');
        this.tag('Stop').patch({
            visible: false
        }, false);
        this.tag('Play').patch({
            visible: true
        }, false);
        
    }
    
    // this will be invoked when the video pauses
    $mediaplayerPause() {
        console.log('mediaplayerPause');
        this.tag('Stop').patch({
            visible: true
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
        this.toggle(document.getElementsByTagName('video')[0]);
    }

}