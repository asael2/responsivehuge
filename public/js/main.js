'use strict'
window.onload = function () {
	
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

	function renderMenu(menuObj){
		var i, j, elMenu = menuObj.items;
		var menuContainer = document.getElementById("menuContainer");
		var subMenuItem = {};
		for (i = 0; i < elMenu.length; i++){
			if(elMenu[i].items.length !=0){ //TIENE submenu
				subMenuItem.items = elMenu[i].items
				subMenuItem.label = elMenu[i].label;
				subMenuItem.url = elMenu[i].url;
				var itemHtml =  '<li> <a href="'+subMenuItem.url+'">'+subMenuItem.label+'</a> <ul class="submenu" id="submenu'+[i]+'"></ul></li>'
				menuContainer.innerHTML += itemHtml;
				for (j = 0; j < subMenuItem.items.length; j++){
					var submenu = document.getElementById('submenu'+[i]);
					submenu.innerHTML += '<li><a href="'+subMenuItem.items[j].url+'">'+subMenuItem.items[j].label+'</a></li>';
				}		
			}else{ // NO tiene submenu
				menuContainer.innerHTML += '<li><a href="'+elMenu[i].url+'">'+elMenu[i].label+'</a></li>';
			}
		}
	};
	//Request menu
	reqMenu(); 

}
