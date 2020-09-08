// Will show all posts
// filter and receive is better
//
const createPost = (contents, time) => {
	
	const newPostElement = document.createElement("div");
	// Initialize 
	const lines = contents.split("\n");
	const tags = lines[1].split(" ");

	// Create title
	const title = lines[0];						
	const titleElement = document.createElement("h1");
	titleElement.innerHTML = title;

	// Create date
	const date = new Date(time*1000).toLocaleString("default", { month: 'short', day: "numeric", year: "numeric" });
	const dateElement = document.createElement("h2");
	dateElement.innerHTML = date;

	// Create contents
	const textElement = document.createElement("p");
	const text = lines.slice(2).join("");
	textElement.innerHTML = text;

	// Finished, add to DOM
	newPostElement.appendChild(titleElement);
	newPostElement.appendChild(dateElement);
	newPostElement.appendChild(textElement);
	container.appendChild(newPostElement);
}

const container = document.getElementById("tinytinyblog");
const bloglist = "blog/blogposts.json"

fetch(bloglist)
	.then(blog => blog.json())
	.then(text => {
		// FILTER HERE
		getBlogpost(text)
		console.log(text)
	});

const getNext = id => {
	return fetch("blog/entries/" + id)
		.then(reply => reply.text())
		.then(text => createPost(text, id))
		.catch(() => console.log("ERROR"))

};
const getBlogpost = async posts => {
	posts.sort((a, b)=> b.id - a.id);
	for(let i = 0; i < posts.length; i++) await getNext(posts[i].id)
};


