let blogIDs = [];
const taglist = {};
const bloglist = "blog/blogposts.json"
const getLocal = id => sessionStorage.getItem(id);
const container = document.getElementById("tinytinyblog");

const createPost = (contents, time) => {
	const blogpostElement = document.createElement("div");

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
	blogpostElement.appendChild(titleElement);
	blogpostElement.appendChild(dateElement);
	blogpostElement.appendChild(textElement);
	container.appendChild(blogpostElement);

	// Add tags and id to taglist
	for(t of tags) {
		const idx = t.toLowerCase();
		if(taglist[idx]) { if(!taglist[idx].list.find(item => item === time)) taglist[idx].list.push(time); }	
		else taglist[idx] = { list: [time] };
	};
}
const toggleTag = (box, tag) => {
	// Toggle highlight, and get a list of highlighted tags
	box.classList.toggle("highlight");
	const selected = document.getElementsByClassName("highlight");
	
	// Get tagged posts list and update
	let tagfilter = [...blogIDs];
	for(let i = 0; i < selected.length; i++) {
		tagfilter = taglist[selected[i].innerHTML].list.filter(id => tagfilter.find(value => value == id));
		if(tagfilter.length == 0) break;
	}
	createElements(tagfilter);
}
const createTagElement = () => {
	const tagElement = document.getElementById("tinytinytag_container")

	for(tag in taglist) {
		const box = document.createElement("div");
		box.innerHTML = tag;
		box.classList.add("tinytinytag");
		box.onclick = () => toggleTag(box, tag); 
		tagElement.appendChild(box);
	}
}
const onPageLoad = () => {
	fetch(bloglist)
		.then(blog => blog.json())
		.then(text => {
			text.forEach(item => blogIDs.push(item.id));
			// FILTER HERE
			// Currently loads all blog posts
			createElements(text)
				.then(()=>createTagElement());
		});
}
const getNext = id => {
	return fetch("blog/entries/" + id)
		.then(reply => reply.text())
		.then(text => {
			sessionStorage.setItem(id, text);
			createPost(text, id);
		})
		.catch((e) => console.log("ERROR:", e))
}
const createElements = async posts => {
	container.innerHTML ="";
	if(posts.length===0) {
		container.style.display = "none";
		return;
	}
	container.style.display = "";
	posts[0].id ? posts.sort((a, b)=> b.id - a.id) : posts.sort((a, b)=> b - a);
	for(let i = 0; i < posts.length; i++) {
		const id = posts[i].id ? posts[i].id : posts[i];
		const cachedVersion = getLocal(id);
		if(cachedVersion !== null) createPost(cachedVersion, id)
		else await getNext(id)
	}
}
onPageLoad();
