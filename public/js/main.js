'use strict'
window.onload = function () {
	
	function $id(id){
		return document.getElementById(id)
	}	
	
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
		var menuContainer = $id("menuContainer");
		var subMenuItem = {};
		
		for (i = 0; i < elMenu.length; i++){
			if(elMenu[i].items.length !=0){ //TIENE submenu
				subMenuItem.items = elMenu[i].items
				subMenuItem.label = elMenu[i].label;
				subMenuItem.url = elMenu[i].url;

				var itemHtml =  '<li> <a onclick="clickedMenu('+i+')" href="'+subMenuItem.url+'">'+subMenuItem.label+'</a> <ul class="submenu" id="submenu'+[i]+'"></ul></li>'
				menuContainer.innerHTML += itemHtml;
				


				for (j = 0; j < subMenuItem.items.length; j++){
					var submenu = $id('submenu'+[i]);
					submenu.innerHTML += '<li><a href="'+subMenuItem.items[j].url+'">'+subMenuItem.items[j].label+'</a></li>';
				}		
			}else{ // NO tiene submenu
				menuContainer.innerHTML += '<li> <a onclick="clickedMenu('+i+')" href="'+elMenu[i].url+'">'+elMenu[i].label+'</a></li>';
			}
		}
	};
	// test of global function printed with inner-html
	window.clickedMenu = function(e){
		var btnsActivos = document.getElementsByClassName("activeMenu");
		var subActivos = document.getElementsByClassName("submenu show");
		
		for(var a = 0; a < btnsActivos.length; a++){
			btnsActivos[a].setAttribute("class", "");
			subActivos[a].setAttribute("class", "submenu");
		}

		function activate(){
			var subMenuUl = $id('submenu'+[e]);
			var parentMenuBtn = subMenuUl.previousElementSibling;
			parentMenuBtn.setAttribute("class", "activeMenu")
			
			if(subMenuUl.className == "submenu"){
				subMenuUl.setAttribute("class", "submenu show");
			}else{
				subMenuUl.setAttribute("class", "submenu");
				parentMenuBtn.setAttribute("class", "")
			}
		}

		activate();		
	}
	//Request menu
	reqMenu(); 

}
