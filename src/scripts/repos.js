export default class GithubRepos {
    constructor() {
        this.data = [];
        this.init();
    }

    load(_callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "https://api.github.com/users/nilkun/repos", true);
        xhr.onload = function() {
            if(this.status===200) {
                _callback(JSON.parse(this.responseText));
            }
        }
        xhr.send();
    }

    init() {
        this.load(this.test);
    }

    test(data) {
        let html = "<strong>Github Repos: </strong><ul>";
        for(let index = 0; index < data.length; index++) {
            html +="<li><a href='"
                + data[index].html_url
                + "'><strong>" 
                + data[index].name
                + "</strong></a><br>"
                + data[index].description
                + '</li><br>';
        }
        html +="</ul>";;
        document.querySelector(".repolist").innerHTML = html;
    }



}