function iFrame()
{
    <iframe src="/" id="iframe"></iframe>
     
    iframe.onload = function(){
        iframe.contentDocument.body.insertAdjacentHTML("afterbegin", "<h1>HELLO FROM IFRAME</h1>");
    }
}

document.addEventListener('DOMcontentloaded',() =>{
document.body.insertAdjacentHTML(
    "beforeend",
    '<button onclick="iFrame()">Open iFrame</button>'
);
});