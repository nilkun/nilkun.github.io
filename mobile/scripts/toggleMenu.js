// Menu init
const toggleMenu = () => {
    const menu = document.getElementById("menu-items");
    const sheet = menu.previousElementSibling;

    if(menu.style.left === "") {   

        menu.style.left = '-100%';
        sheet.style.opacity = '0';
        sheet.style.transition= '';
        sheet.style.zIndex = '-1';
        document.body.style.overflow = "";
        menu.style.transition= '0.5s ease-in-out';
        sheet.style.transition = '0.5s ease-in-out';
    }
    else {
        menu.style.left = "";
        sheet.style.opacity = '0.8';
        sheet.style.transition= '';
        sheet.style.zIndex = '5';
        document.body.style.overflow = "hidden";
        menu.style.transition= '0.5s ease-in-out';
        sheet.style.transition = '0.5s ease-in-out';
    } 
} 