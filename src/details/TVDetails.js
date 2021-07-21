export default class Details extends lng.Component{

    static _template(){
        return {
            rect: true, w: 1920, h: 1080, color: 0xff000000,
            Blur: {
                type: lng.components.FastBlurComponent, amount: 0, w: 1920, h:1080,
                transitions:{
                    amount:{duration:2.1, delay:0.4},
                    alpha:{duration:1, delay:2.5}
                },
                content:{
                    Background:{
                        w: 1920, h: 1080
                    }
                }
            },
            Details:{
                x: 250, y: 300, flex:{direction:"row"}, w: 1000, alpha: 0,
                Poster:{
                    w: 600, h: 360,
                    flexItem:{
                        marginRight: 150
                    }
                },
                Metadata:{
                    flex: {
                        direction: "column"
                    },
                    Title:{
                        w: 900, text:{fontFace:"Roboto-Regular", fontSize:51, lineHeight:50},
                    },
                    Year:{
                        w: 900,  text:{fontFace:"Roboto-Regular", fontSize:28, lineHeight:50}
                    },
                    Info:{
                        w: 700, text:{fontFace:"-Regular", fontSize:39, lineHeight:60}
                    }
                }
            }

        }
    }

    _init(){
        this._blur  = this.tag("Blur").content;

        this._events = {
            showDetails: ()=>{
                const amount = this.tag("Blur").amount;
                if(amount === 3){
                    this.tag("Details").patch({
                        smooth:{
                            alpha: 1, y: 150
                        }
                    });
                }
            }
        };

        this._register();
    }

    _register(){
        this._blur.tag("Background").on("txLoaded", (e)=>{
            this.signal("detailsLoaded");
        });

        this._blur.tag("Background").on("txError", (e)=>{
            this._blur.tag("Background").texture = null;
            this.signal("detailsLoaded");
        });

        this.tag("Blur").transition("amount").on("finish",this._events.showDetails);
    }

    set asset(v){
        this._asset = v;
        this._items = v;
        // console.log(v);
        this._updateDetails(v);
        this._blur.tag("Background").src = v._links.awsBannerUrl.href

    }

    _updateDetails({ _links, cast, title, year, description}){
        this.patch({
            Details:{
                Poster:{
                    src: _links.awsThumbnailUrl.href
                },
                Metadata:{
                    Title:{text:{text:title}},
                    Year:{text:{text: year}},
                    Info: { text: { text: description}}
                    
                }
            }
        });
    }

    _focus() {
        this.tag("Blur").patch({
            smooth:{
                amount:3,
                alpha: 0.4
            }
        });
    }

    _unfocus(){
        this.patch({
            Blur:{
                smooth:{
                    amount:0,
                    alpha: 1
                }
            },
            Details:{
                smooth:{
                    alpha: 0,
                    y: 300
                }
            }

        });
    }

    get items() {
        return this._items;
    }

    get active() {
        console.log(this._items);
        return this._items;
    }

    // _handleLeft() {
    //     if (this._index > 0) {
    //         this.setIndex(this._index - 1)
    //     }
    // }

    // _handleRight() {
    //     if (this._index < this.items.length - 1) {
    //         this.setIndex(this._index + 1)
    //     }
    // }

    // setIndex(index) {
    //     this._index = index;
    // }

    // _getFocused() {
    //     return this._items;
    // }


    _handleEnter() {
        // console.log(this._items);
        this.fireAncestors("$onDetailsSelect", { item: this._items });
    }
}