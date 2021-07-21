import { Utils } from "wpe-lightning-sdk";

export default class MainSliderItem extends lng.Component{
    static _template(){
        return {
            rect: true, color: 0xffffffff, w: 370, h: 222, scale:1,
            transitions:{scale:{duration:0.3, delay:0.05}}
        }
    }

    _init(){
        
    }

   

    set item(v){
        this._item = v;
        //  console.log(v._links.awsThumbnailUrl);
         if(v._links.awsThumbnailUrl != undefined){
            this.patch({
                src: v._links.awsThumbnailUrl.href
            });
        }else{
            this.patch({
                src: Utils.asset('images/logo.png')
            });
        }
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1.15);
    }

    _unfocus(){
        this.setSmooth("scale",1);
    }

    static _states(){
        return [

        ]
    }

    static get width(){
        return 500;
    }

    static get height(){
        return 300;
    }
}