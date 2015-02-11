'use strict'
window.onload = function () {

	function renderMenu(menuObj){
		var i, j, elMenu = menuObj.items;
		var menuContainer = document.getElementById("menuContainer");
		var subMenuItem = {};
		 
		for (i = 0; i < elMenu.length; i++){
		
			// menuContainer.innerHTML += '<li><a href="'+elMenu[i].url+'">'+elMenu[i].label+'</a></li>';
			// console.log(elMenu[i]);

			if(elMenu[i].items.length !=0){ //TIENE submenu

				subMenuItem.items = elMenu[i].items
				subMenuItem.label = elMenu[i].label;
				subMenuItem.url = elMenu[i].url;
				var itemHtml =  '<li id="submenu'+[i]+'"><a href="'+subMenuItem.url+'">'+subMenuItem.label+'</a></li>'
				// console.log ( subMenuItem.label);
				menuContainer.innerHTML += itemHtml;

				for (j = 0; j < subMenuItem.items.length; j++){
					var submenu = document.getElementById('submenu'+[i]);
					submenu.innerHTML += ' : <a>'+elMenu[i].items[j].label+'</a>';
					// console.log ( elMenu[i].items[j]);
					// console.log(itemHtml);

					// '<a id="'+ [i][j] +'">' + elMenu[i].items[j].label + '</a>'
				}
					// console.log(document.getElementById('subMenu'+[i]));

					// document.getElementById('subMenu'+[i]).innerHTML += '<p id="subItem'+[i]+'"><a href="#">'+elMenu[i].items[j].label+'</p>';
					// document.getElementById('subMenu'+[i]).innerHTML += "hola";
					// console.log(document.getElementById('sub'+[i]).);
					// document.getElementById('sub'+[i]).innerHTML += "submenu";
				// 		// return '<li><a class="subItem" href="#">'+elMenu[i].items[j].label+'</a></li>';
				// 		console.log(this);
				// 	}


				// var cometa = function(){

				// 				
				
								

			}else{ // NO tiene submenu

				menuContainer.innerHTML += '<li><a href="'+elMenu[i].url+'">'+elMenu[i].label+'</a></li>';
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