'use strict'
window.onload = function () {

	function renderMenu(menuObj){
		var i, elMenu = menuObj;
		var menuContainer = document.getElementById("menuContainer");
		for (i = 0; i < elMenu.items.length; i++){
			// console.log(elMenu.items[i].label);
			// console.log(elMenu.items[i].items.length);

			if(elMenu.items[i].items.length !=0){
				menuContainer.innerHTML += '<a href="#">'+elMenu.items[i].label+'</a>';

			}else{
				menuContainer.innerHTML += '<a href="#">'+elMenu.items[i].label+'</a>';
			}
		}
	};

	function reqMenu(){	
		var oReq = new XMLHttpRequest();
		function myResponse () {
			var menuObj = JSON.parse(this.responseText);
			renderMenu(menuObj)
		};
		oReq.open("get", "/api/nav.json", true);
		oReq.send();
		oReq.onload = myResponse;
	};

	//Request menu
	reqMenu(); 

}

// menuContainer.innerHTML += '<a href="#">'+elMenu.items[i].label+'</a>';