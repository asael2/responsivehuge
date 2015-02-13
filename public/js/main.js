'use strict'
window.onload = function () {
	var menuId;
	function $id(id){
		return document.getElementById(id)
	};
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}



	function $cln(id){
		return document.getElementsByClassName(id)
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
					submenu.innerHTML += '<li><a href="'+subMenuItem.items[j].url+'">'+subMenuItem.items[j].label+'</a></li>';
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
			}else if(hasClass(this, 'showed')){
				$id('container').setAttribute("class", "saved");
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
		
		// console.log(btnsActivos);
		// console.log(subActivos);
	};


	// global function printed with inner-html, not a good practice..?
	window.clickedMenu = function(e){
		menuId = e;
		clearMenus();	
		activateMenu(menuId);

		// $id("courtain").setAttribute("class", "show");;		
	};

	//Request menu
	reqMenu(); 
}
