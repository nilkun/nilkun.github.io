const About = () => {
    changeTitle("my story");
    document.getElementById("js-menu").style.display = "none";
    return `
    <div class="flex-container">
        <p>
        <img class="itsaball image" src="./img/nilkun.png" alt="picture of nilkun" width="250px">
        <br>
        <strong>Hello there and welcome to my home.</strong>
        <br>
        <br>
        I'm an avid Arch Linux user and Awesome WM fan, who speaks broken JavaScript and C++, 
        and get things done with a bit of trial and syntax error. I am passionate about computers, 
        and program daily in order to improve my skills and land my dream job as a developer. If you want to see some of
        my current projects, then visit <a href="https://github.com/nilkun"> my GitHub page</a>.
        <br>
        <br>
        The first computer I ever owned was a Zenith Z-181 with two 3.5" floppy-disk drives. I spent a lot of time on it playing Space Quest and typing in BASIC games that never worked. 
        <br>
        <br>
        Besides computers, I also happen to love making stuff in the real world, be it food or hacking IKEA furniture.
        <br>
        <br>
        Thank you for dropping by!
        </p>
    </div>
    `;
}
