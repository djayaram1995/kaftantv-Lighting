import { Lightning, Utils } from "wpe-lightning-sdk";
import Loader from "./loader/Loader";
import Splash from "./loader/Splash";
import Menu from "./menu/Menu";
import Api from "./helper/Api";
import Browse from "./browse/Browse";
import TvBrowse from "./browse/TvBrowse";
import LiveBrowse from './browse/LiveBrowse';
import Details from "./details/Details";
import Player from "./player/NewPlayer";

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: "Roboto-Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") }
    ];
  }

  static _template() {
    return {
      Splash: {
        type: Splash,
        signals: { animationFinished: true },
        alpha: 0
      },
      Movies: {
        UsingShorthand: {
          x: -10,
          y: -110,
          w: 300,
          h: 75,
          src: Utils.asset("images/logo.png")
        },
        type: Browse,
        x: 100,
        y: 150,
        alpha: 0,
        h: window.innerHeight
      },
      TvShows: {
        // UsingShorthand: {
        //   x: -10,
        //   y: -110,
        //   w: 300,
        //   h: 75,
        //   src: Utils.asset("images/logo.png")
        // },

        type: TvBrowse,
        x: 100,
        y: 150,
        alpha: 0,
        h: window.innerHeight
      },
      AudioShows: {
        // UsingShorthand: {
        //   x: -10,
        //   y: -110,
        //   w: 300,
        //   h: 75,
        //   src: Utils.asset("images/logo.png")
        // },

        type: LiveBrowse,
        x: 100,
        y: 150,
        alpha: 0,
        h: window.innerHeight
      },
      Menu: {
        type: Menu,
        x: window.innerWidth,
        mountX: 1,
        y: -100,
        alpha: 0.5,
        signals: { select: true }
      },
      Details: {
        type: Details,
        signals: { detailsLoaded: "_loaded" },
        alpha: 0.001
      },

      Loader: {
        type: Loader,
        alpha: 0
      },
      Player: {
        type: Player,
        alpha: 0.001
      }
      // Background: {
      //   w: 1920,
      //   h: 1080,
      //   color: 0xfffbb03b,
      //   src: Utils.asset('images/background.png'),
      // },
      // Logo: {
      //   mountX: 0.5,
      //   mountY: 1,
      //   x: 960,
      //   y: 600,
      //   src: Utils.asset('images/logo.png'),
      // },
      // Text: {
      //   mount: 0.5,
      //   x: 960,
      //   y: 720,
      //   text: {
      //     text: "Let's start Building!",
      //     fontFace: 'Regular',
      //     fontSize: 64,
      //     textColor: 0xbbffffff,
      //   },
      // },
    };
  }

  _construct() {
    this._api = new Api();
  }

  _init() {
    this._setState("Splash");
    // this._type = 0;
    // this.tag('Background')
    //   .animation({
    //     duration: 15,
    //     repeat: -1,
    //     actions: [
    //       {
    //         t: '',
    //         p: 'color',
    //         v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
    //       },
    //     ],
    //   })
    //   .start()
  }

  $onItemSelect({ item }) {
    this._type = 0;
    console.log("Item selected", item);
    this._setState("Loading");
    this.tag("Details").asset = item;
  }

  $onDetailsSelect({ item }) {
    this._type = 1;
    console.log("details selected", this._appReturnState);
    var prevState = this._appReturnState;
    this._setState("Loading");
    this.tag("Player").asset = item;
    this._setState("Playing");
    this._appReturnState = prevState;
  }

  $api() {
    return this._api;
  }

  _populate(data) {
    data.forEach(props => {
      //  console.log(JSON.stringify(props.data));
      console.log(props);
      this.tag(props.ref).data = props.data;
    });
  }

  _handleUp() {
    this._setState("Menu");
  }

  _setFocusSettings(settings) {
    if (this.state === "Playing") {
      console.log(settings);
      // settings.mediaplayer.consumer = this.tag("Player");
    }
  }

  static _states() {
    return [
      class Splash extends this {
        $enter() {
          this.tag("Splash").setSmooth("alpha", 1);
          this._api.getAppData().then(data => {
            this.tag("Splash").startAnimation();
            console.log(data);
            this._populate(data);
          });
        }
        animationFinished() {
          this._setState("Movies");
          this.tag("Menu").setSmooth("y", 50);
        }
      },
      class Loading extends this {
        _captureKey() {
          // capture
        }
        $enter({ prevState }) {
          this._appReturnState = prevState;
          this.tag("Loader").setSmooth("alpha", 1);
        }
        $exit() {
          this.tag("Loader").setSmooth("alpha", 0);
        }
        _loaded() {
          // console.log(this.state);
          setTimeout(() => {
            console.log(this._type);
            if (this._type == 0) {
              this._setState("Details");
            } else if (this._type == 1) {
              this._setState("Playing");
            }
          }, 1000);
        }
      },
      class Menu extends this {
        $enter({ prevState }) {
          this._menuReturnState = prevState;
          this.tag("Menu").setSmooth("alpha", 1);
        }
        $exit() {
          this.tag("Menu").setSmooth("alpha", 0.5);
        }
        _getFocused() {
          return this.tag("Menu");
        }
        _handleDown() {
          this._setState(this._menuReturnState);
        }
        select({ item }) {
          const { ref, label } = item;
          console.log(label);

          if (label == "HOME") {
            this.tag(this._menuReturnState).setSmooth("alpha", 0);
            this._setState("Movies");
          }

          if (label == "TV") {
            console.log(this._menuReturnState);
            this.tag(this._menuReturnState).setSmooth("alpha", 0);
            //  this._setState(ref);
            this._setState("TvShows");
            // this._setState("Playing")
          }

          if (label == "LIVE") {
            console.log(this._menuReturnState);
            this.tag(this._menuReturnState).setSmooth("alpha", 0);
            this._setState("AudioShows");
          }

        }
      },
      class Movies extends this {
        $enter() {
          this.tag("Movies").setSmooth("alpha", 1);
        }
        $exit({ newState }) {
          this.tag("Movies").setSmooth("alpha", newState === "Menu" ? 1 : 0);
        }
        _getFocused() {
          return this.tag("Movies");
        }
      },
      class TvShows extends this {
        $enter() {
          this.tag("TvShows").setSmooth("alpha", 1);
        }
        $exit({ newState }) {
          this.tag("TvShows").setSmooth("alpha", newState === "Menu" ? 1 : 0);
        }
        _getFocused() {
          return this.tag("TvShows");
        }
      },
      class AudioShows extends this {
        $enter() {
          this.tag("AudioShows").setSmooth("alpha", 1);
        }
        $exit({ newState }) {
          this.tag("AudioShows").setSmooth("alpha", newState === "Menu" ? 1 : 0);
        }
        _getFocused() {
          return this.tag("AudioShows");
        }
      },
      class Details extends this {
        $enter() {
          this.tag("Details").setSmooth("alpha", 1);
        }
        $exit() {
          this.tag("Details").setSmooth("alpha", 0.001);
        }
        _handleBack() {
          this._setState(this._appReturnState);
        }
        _getFocused() {
          return this.tag("Details");
        }
      },
      class Playing extends this {
        // delegate focuspath to the player
        $enter(prevState) {
          this._appReturnState = prevState;
          this.tag("Player").setSmooth("alpha", 1);
          this.tag("Menu").setSmooth("alpha", 0);
          this.tag("Splash").setSmooth("alpha", 0);
        }
        $exit() {
          this.tag("Player").setSmooth("alpha", 0.001);
        }
        _handleBack() {
          this._setState(this._appReturnState);
          this.tag("Player").setSmooth("alpha", 0.001);
        }
        _getFocused() {
          return this.tag("Player");
        }
      }
    ];
  }
}
