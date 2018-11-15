running = new class {
    constructor() {
        this.data = [];
        this.show3();
    }

    load(_callback) {
        const xhr = new XMLHttpRequest();
        // false = sync
        xhr.open('GET', "https://api.github.com/users/nilkun/repos", true);
        xhr.onload = function() {
            if(this.status===200) {
                _callback(JSON.parse(this.responseText));
            }
        }
        xhr.send();
    }

    show3() {
        this.load(this.test);
    }

    test(data) {
        let html = "<ul>";
        for(let index = 0; index < data.length; index++) {
            html +="<li><a href='"
                + data[index].html_url
                + "'><strong>" 
                + data[index].name
                + "</strong></a><br>"
                + data[index].description
                + '</li><br>';


            // console.log("TEST: ", description);
            // console.log("TEST: ", data[index].description);
            // console.log(
        }
        html +="</ul>";
        console.log(html);
        document.querySelector(".repolist").innerHTML = html;
    }



}

