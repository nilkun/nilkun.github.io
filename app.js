const loadHome = function() {
	const contents = `
		<div class="col-12 col-lg-2 text-center">
			<img class="img-responsive" src="https://gravatar.com/avatar/0351bee1b5ca6d4d6d14ec9e4b8c9255?s=200" width=100%><br>
			Latest stable release of me (me 2.0)
		</div>
		<div class="col-12 col-lg-10">
			<h5><strong>Hello there!</strong></h5><br>
			I am a self-taught programmer who also happens to be an avid Arch Linux user and Awesome WM fan. Tautalogically speaking, the Awesome Window Manager is a pretty awesome window manager.
			<br><br>I speak JavaScript and C++, but I find my way around in other languages as well, with a bit of trial and syntax error.<br><br>
			This website might be lacking a bit in content.	I am currently job hunting, so please be nice and hire me.
		</div>
		`;
	document.querySelector("#action-window").innerHTML = contents;
};

const loadProjects = function() {
	const contents = `<div class="col-12"> 
		<br><h5><strong>Here are some of my current projects:</strong></h5><br>
		<strong>A game engine using SDL / C++</strong><br>I want to have a simple game engine that helps me manage resources and display items on the screen, as well as handle user input. Currently the game engine has an atlas creator (for fonts), and some simple texture managers.<br><br>
		<strong>Games ( C++ )</strong><br>Games are fun to work with, but they are mostly for programming practice, and to play around with the game engine.<br><br>
		<strong>Youtube</strong><br>I am preparing some contents that might become videos once I get some more time. I might share some how-to videos in the near future. I might also share some cooking videos or whatever I feel like doing a video about.<br><br>
		<strong>JavaScript</strong><br>Apparently, everybody needs to know JavaScript these days. This website is powered by JavaScript.<br><br>
		<strong>Python</strong><br>Some machine learning is always fun to do. I know nothing so far, so I dont know why I added this section at all.<br><br>
		<strong>Me 2.0</strong><br>Still in beta. It has full surround sound capabilities and an automated alert system whenever something is amiss, such as hunger, boredom, or babyness.<br><br>
		</div>
	`;
	document.querySelector("#action-window").innerHTML = contents;
};

const loadDebug = function() {
	//debug
};
const loadCertificates = function() {
	fileNames = [ "The Complete Web Developer in 2018 - Zero to Mastery",
		"Modern JavaScript from the Beginning",
		"Learn Bootstrap 4 by Example",
		"Learn Advanced C++ Programming",
		"C++ Tutorial for Complete Beginners"
	];
	let images = "";
	fileNames.forEach(file => {
		images+=`<img class="img-responsive" src="assets/diplomas/${file}.jpg" width=30%>`;
	});
		const contents = `<div class="col-12">
		<br><h5><strong>Whenever I need a push in the right direction, I turn to Udemy. Here are some courses I have taken:</strong></h5><br>
		${images}
		</div>
	`;
	document.querySelector("#action-window").innerHTML = contents;


};

const loadRepos = function() {
	console.log("repos");
};
const loadContact = function() {
	console.log("contact");
};

// const init: function() {
	document.querySelector('.navbar-brand').addEventListener('click', loadHome);
	document.querySelector('#current-projects').addEventListener('click', loadProjects);
	// document.querySelector('#github-repos').addEventListener('click', loadRepos);
	// document.querySelector('#contact-me').addEventListener('click', loadContact);
	document.querySelector('#certificates').addEventListener('click', loadCertificates);
	document.querySelector('#debugging').addEventListener('click', loadDebug);

// };

// init();


