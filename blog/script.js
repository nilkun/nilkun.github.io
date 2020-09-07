
const xhr = new XMLHttpRequest();
let contents = "";
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		contents = xhr.responseText;	
		console.log(contents);
	}
}

xhr.open("get", "test");
xhr.send();
// fetch("test2")
	// .then(reply => console.log(reply.json())).catch(() => console.log("ERROR"))
	
