const loadScript = (filename) => {
    const js = document.createElement('script');
    js.setAttribute("type","text/javascript")
    js.setAttribute("src", filename)

    if (typeof fileref!="undefined") document.getElementsByTagName("head")[0].appendChild(fileref);   
}

const unloadScript = (filename) => {
    const target = "script";
    const attr = "src";
    const allScripts = document.getElementsByTagName(target);
    for(let i = allScripts.length; i>=0; i--) {
        if (allScripts[i] 
            && allScripts[i].getAttribute(attr)!=null 
            && allScripts[i].getAttribute(attr).indexOf(filename)!=-1)
                allScripts[i].parentNode.removeChild(allsScripts[i]) 
    }
}