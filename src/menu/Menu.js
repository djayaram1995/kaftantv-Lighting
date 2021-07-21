export default class Menu extends lng.Component{

    static _template(){
        return {
            flex:{
                direction: "row"
            }
        }
    }

    _init(){
        this._index = 0;
        this.patch({
            Movies:{
                type: MenuItem, item: { label: "HOME", ref:"Movies"}
            }
        });
    }

    set data(v) {
       var data = v;
        data.forEach(movie => {
            if (movie.category_type == 1 && movie.show_in_menu == true && movie.showRadio === false && movie.showInMusic === false && movie.showChannels == true) {
               // titles.push(movie);
                this.patch({
                    Movies:{
                        type: MenuItem, item: { label: "HOME", ref:"Movies"}
                    }
                });
                const shows = this.stage.c({
                    type: MenuItem, item: { label: movie.name, ref: movie.id }
                });
             
                this.childList.add(shows);
            }
        });
    }

    get items(){
        return this.children;
    }

    get active(){
        return this.items[this._index];
    }

    _handleLeft(){
        if(this._index > 0){
            this.setIndex(this._index - 1)
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this.setIndex(this._index + 1)
        }
    }

    setIndex(index){
        this._index = index;
    }

    _getFocused(){
        return this.active;
    }

    _handleEnter(){
        // console.log(this.active.item);
        this.signal("select",{item:this.active.item});
    }
}

class MenuItem extends lng.Component{
    static _template(){
        return {
            text: { fontSize: 40, fontFace: 'Roboto-Regular' }, flexItem: {
                marginRight:40
            }
        }
    }

    set item(v){
        this._item = v;
        this.text.text = v.label;
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1.3);
    }

    _unfocus(){
        this.setSmooth("scale",1);
    }
}