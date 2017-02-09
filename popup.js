function onSlideChange(e){
  //this.value
  //alert(this.value)
  //document.body.appendChild("<p>"++"</p>");
  document.getElementById("cnt").innerHTML = this.value ;

  var val = this.value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: val }, function(response) {
      console.log(response.farewell);
    });
  });

  chrome.tabs.executeScript({
      code: '(' + modifyDOM + '('+ val +'));' //argument here is a string but function.toString() returns function's code
  });

  window.localStorage.val = val;

}

window.localStorage.val = window.localStorage.val || 5;
document.getElementById("slider").value = window.localStorage.val;
document.getElementById("cnt").innerHTML = window.localStorage.val;

document.getElementById("slider").addEventListener("change", onSlideChange, false);





function modifyDOM(data) {
    //You can play with your DOM here or check URL against your regex
    if(!document.getElementById("night-owl-id")){
        
        var e = document.createElement("div")
        e.id = "night-owl-id"
        e.style.position = "fixed"
        e.style.width = "100%"
        e.style.height = "100%"
        e.style.top = "0"
        e.style.left = "0"
        e.style.zIndex = "999999999999"
        e.style.pointerEvents = "none"
        e.style.background = "#000"
        e.style.opacity = "0.5"

        document.body.appendChild(e)
    }else{
      document.getElementById("night-owl-id").style.opacity = (+data)*0.1*0.9;
    }


    function receiveMessage(ev){
      console.log(ev)
      e.innerHTML = JSON.stringify(ev);
      e.style.opacity = ev.data*0.1;

    }

    window.addEventListener("message", receiveMessage, false);
    window.addEventListener("onmessage", receiveMessage, false);
}

//We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
});

chrome.tabs.executeScript({
    code: '(' + modifyDOM + '('+ window.localStorage.val +'));' //argument here is a string but function.toString() returns function's code
});

//chrome.tabs.onCreated.addListener(function() {alert('hello new tab')});
