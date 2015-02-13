'use strict'
window.onload = function () {
	var menuId;
	function $id(id){return document.getElementById(id)};
	function $cln(id){return document.getElementsByClassName(id)};	
	function hasClass(element, cls) {return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;};
	
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

			if(elMenu[i].items.length !=0){ //TIENE submenus
				subMenuItem.items = elMenu[i].items
				subMenuItem.label = elMenu[i].label;
				subMenuItem.url = elMenu[i].url;

				var itemHtml =  '<li> <a id="menuBtn'+i+'" onclick="clickedMenu('+i+')" href="'+subMenuItem.url+'"> '+subMenuItem.label+' <span class="arrowSpan"> </span></a> <ul class="submenu" id="submenu'+[i]+'"></ul></li>'
				menuContainer.innerHTML += itemHtml;
				
				for (j = 0; j < subMenuItem.items.length; j++){
					var submenu = $id('submenu'+[i]);
					submenu.innerHTML += '<li><a onclick="clickedMenuItem('+i+j+')" href="'+subMenuItem.items[j].url+'">'+subMenuItem.items[j].label+'</a></li>';
				}		
			}else{ // NO tiene submenus
				menuContainer.innerHTML += '<li> <a id="menuBtn'+i+'" onclick="clickedMenu('+i+')" href="'+elMenu[i].url+'">'+elMenu[i].label+'</a></li>';
			}
		}

		// mobile render
		$id('iconSpan').onclick = function(){
			if(hasClass(this, 'saved')){
				$id('container').setAttribute("class", "showed");
				this.setAttribute("class", "showed");
				$id('courtain').setAttribute("class", "show");

			}else if(hasClass(this, 'showed')){
				$id('container').setAttribute("class", "saved");
				$id('courtain').setAttribute("class", "hide");
				
				this.setAttribute("class", "saved");
			}
		};
	};
	
	function activateMenu(menuId){
		var menuBtn = $id('menuBtn'+[menuId]);
		var subMenuUl = $id('submenu'+[menuId]);
		//Clicked button add class 
		menuBtn.setAttribute("class", "activeBtn");
		// if exist show submenu
		subMenuUl ? subMenuUl.setAttribute("class", "submenu show") : menuBtn.setAttribute("class", "activeBtn");	
	};

	function clearMenus(menuId){

		var btnsActivos = $cln("activeBtn");
		var subActivos = $cln("submenu show");

		if (btnsActivos){
			for(var a = 0; a < btnsActivos.length; a++){
				btnsActivos[a].setAttribute("class", "");
			}
		}
		if (subActivos){
			for(var a = 0; a < subActivos.length; a++){
				subActivos[a].setAttribute("class", "submenu");
			}
		}

	};

	// global functions printed with inner-html, not best practice
	window.clickedMenu = function(e){
		menuId = e;
		clearMenus();	
		activateMenu(menuId);
		$id('courtain').setAttribute("class", "show");	
	};
	
	window.clickedMenuItem = function(){
		$id('courtain').setAttribute("class", "hide");
		$id('container').setAttribute("class", "saved");
		$id('iconSpan').setAttribute("class", "saved");
		clearMenus();
	};

	//Request menu
	reqMenu(); 
}
