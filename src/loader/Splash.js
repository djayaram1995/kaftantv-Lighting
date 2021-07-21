// import App from "../App.js";
import { Lightning, Utils } from 'wpe-lightning-sdk'
import Loader from './Loader';
export default class Splash extends lng.Component{

    static _template(){
        return {
            // Background:{
            //     src:App.getPath("background.png")
            // },
            GrayBackdrop:{
                src:Utils.asset("images/gradient.png"), scale:1.1, w:window.innerWidth, h:window.innerHeight, y: 0, x:0, rotation: 0,
            },
            Logo:{
                src:Utils.asset("images/logo.png"), y: (window.innerHeight/2)-120, x: (window.innerWidth/2)-250, rotation: 0, w:500, h:119
            },
            // Loader: {
            //     type: Loader,
            //     w: 20,
            //     h: 20,
            //     flexItem: {
            //         marginTop: 30
            //       }
            //   },
        };
        
    }

    _init(){
        this._setState("Loading");
        this._createAnimations();
        this._register();
    }

    _createAnimations(){
        this._reveal = this.animation({
            duration:1.3, repeat: 0, delay:1, actions:[
                // {t:'Background', p:'y', v:{0.20:0,1:-0}},
                // {t:'GrayBackdrop', p:'rotation', v:{0:-0.3,1:0}},
                // {t:'GrayBackdrop', p:'scale', v:{0.6:1.1,1:1}},
                // {t:'GrayBackdrop', p:'y', v:{0:1000,1:0}},
                // {t:'GrayBackdrop', p:'x', v:{0:200,1:0}},
                { t: 'Logo', p: 'y', v: { 0: ((window.innerHeight / 2) - 120),1:-400}},
                {t:'Logo', p:'rotation', v:{0:0,1:-0}},
            ]
        });
    }

    _register(){
        this._reveal.on("finish",()=>{
            this.signal("animationFinished");
        });
    }

    startAnimation(){
        this._start();
    }

    static _states(){
        return [
            class Loading extends this{
                _start(){
                    this._reveal.start();
                }
            },
            class Error extends this{
                $enter(){
                    // signal error & retry
                }
                $exit(){
                    // signal that we exit Error state
                }
            }
        ];
    }
}