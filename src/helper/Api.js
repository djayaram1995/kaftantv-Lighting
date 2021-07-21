export default class Api{
    getAppData(){
        const promises = [
            this._getMovies(),
            this._getMenu(),
            this._getTvShows(),
            this._getLiveShows(),
            // this._getHomeContents()
        ];
        return Promise.all(promises);
    }

    _getMenu() {
        return fetch("http://34.254.176.38:8080/api/category/all").then((response) => {
            return response.json();
        }).then((data) => {
            return { ref: "Menu", data };
        });
    }


    _getMovies(){
        // console.log('get movies');
        // return fetch("http://34.254.176.38:8080/api/category/home/all").then((response)=>{
        return fetch("http://34.254.176.38:8080/api/category/STB/all").then((response)=>{
            return response.json();
        }).then((data)=>{
            // console.log(data);
            return {ref:"Movies", data};
        });
    }

    // _getMovies() {
    //     return fetch("./static/movies.json").then((response) => {
    //         return response.json();
    //     }).then((data) => {
    //         return { ref: "Movies", data };
    //     });
    // }

    // async _getHomeContents() {
    //     var data = [];
    //     // var items = this._getMenu();
    //     // console.log(items);
    //     return fetch("http://34.254.176.38:8080/api/category/all").then((response) => {
    //         return response.json();
    //     }).then((titles) => {
    //         //return { ref: "Menu", data };
    //         titles.forEach(movie => {
    //             //  console.log(movie);
    //             if (movie.category_type == 4 && movie.showInHome == true) {
    //                 fetch("http://34.254.176.38:8080/api/assigned_content/"+movie.id).then((response) => {
    //                     return response.json();
    //                 }).then((res) => {
    //                     if(res != ""){
    //                         var content = {};
    //                         content["id"]= movie.id;
    //                         content["label"] = movie.name;
    //                         content["data"] = res;
    //                         data.push(content);
    //                     }
    //                 });
    //             }
    //         });
    //         // console.log(titles);
    //         return {ref:"Movies", data};
    //     });

        
    //     // return fetch("./static/movies.json").then((response) => {
    //     //     return response.json();
    //     // }).then((data) => {
    //     //     return { ref: "Movies", data };
    //     // });
    // }

    // async _getMenuAsync() {
    //     const stream = await fetch("http://34.254.176.38:8080/api/category/all");
    //     const data = await stream.json();
    //     // console.log(data);
    //     return { ref: "TvShows", data };
    // }

     _getTvShows(){

        var data = [];
        var text = '{"title" : "TV Shows", "id" : "100", "contentInfo" :[]}';
        var obj = JSON.parse(text)

        
        return fetch("http://34.254.176.38:8080/api/category/all").then((response)=>{
            return response.json();
        }).then((titles)=>{
            titles.forEach(movie => {
                if (movie.category_type == 6) {
                    obj.contentInfo.push(movie);
                }
            });
            // text = JSON.stringify(obj)
            // console.log(data);
            data.push(obj);
            return {ref:"TvShows", data};
        });
        // return fetch("http://34.254.176.38:8080/api/category/home/all").then((response)=>{
        //     return response.json();
        // }).then((data)=>{
        //     return {ref:"TvShows", data};
        // });

    }

    _getLiveShows(){

        var data = [];
        var text = '{"title" : "Live", "id" : "100", "contentInfo" :[]}';
        var obj = JSON.parse(text)

        
        return fetch("http://34.254.176.38:8080/api/category/all").then((response)=>{
            return response.json();
        }).then((titles)=>{
            titles.forEach(movie => {
                if (movie.category_type == 7) {
                    obj.contentInfo.push(movie);
                }
            });
            // text = JSON.stringify(obj)
            // console.log(data);
            data.push(obj);
            return {ref:"AudioShows", data};
        });
        // return fetch("http://34.254.176.38:8080/api/category/home/all").then((response)=>{
        //     return response.json();
        // }).then((data)=>{
        //     return {ref:"TvShows", data};
        // });

    }
    
        

        // const stream = await fetch("http://34.254.176.38:8080/api/category/all");
        // const titles = await stream.json();
        // await titles.forEach(movie => {
        //     if (movie.category_type == 4 && movie.showInHome == true) {
        //         // fetch("http://34.254.176.38:8080/api/assigned_content/" + movie.id).then((response) => {
        //         //     return response.json();
        //         // }).then((res) => {
        //         //     if (res != "") {
        //                 var content = {};
        //                 content["id"] = movie.id;
        //                 content["label"] = movie.name;
        //                 content["data"] = [];
        //                 data.push(content);
        //         //     }
        //         // });
        //     }
        // });
        // return {ref:"Movies", data};
}