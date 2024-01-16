/**
Show and hide div sections
**/
function navigateTo(device, page) {
    const pages = ["home","member","sponsor","contact","directory"];
    //console.log(page);
    for (let i = 0; i < pages.length; i++) {
        if (page == pages[i]) {
            document.getElementById(page).style.display = "block"; 
        } else {
            document.getElementById(pages[i]).style.display = "none";
        }
    }
	if (device == "mobile") {
		menuOnClick();		
	}		
}
/**
Load images from folder into thumbnails and display the clicked image enlarged 
**/
function loadGallery() {    
    var totalImages = 7;
    var fileFormat = ".jpeg";
    var imageThumbs = document.getElementById("image-thumbs");    
    var currentImage = document.getElementById("current-image");
    for (var i = 1; i <= totalImages; i++) {
        var thumb = document.createElement("img");
        thumb.src = "gallery/" + i + fileFormat;        
        thumb.alt = "Image " + i;        
        thumb.classList.add("thumb");
        imageThumbs.appendChild(thumb);
        thumb.addEventListener(
            "click", function() {
                currentImage.src = this.src;
            }
        );
    }
}
/**
Handle menu click for mobile device
**/
function menuOnClick() {	
	document.getElementById("mob-menu-bar").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}

/**
Handle lights on/off
**/
var dark=false;
function lights() {	
	dark=!dark;
	//console.log("dark: "+dark);
	if (dark) {
		document.body.style.backgroundColor = '#000000';
		document.body.style.color = '#ffffff';		
		const anchorEls = document.getElementsByTagName("a");
		for (let i = 0; i < anchorEls.length; i++) {			
			anchorEls[i].style.color = '#C3D9FF';//gmail blue			
		}
		const announceEls = document.getElementsByClassName("announcement");
		for (let i = 0; i < announceEls.length; i++) {
		  announceEls[i].style.backgroundColor = "#A9A9A9";
		}
		const footerEls = document.getElementsByClassName("footer");
		for (let i = 0; i < footerEls.length; i++) {
		  footerEls[i].style.backgroundColor = "#A9A9A9";
		}
		const tableEls = document.getElementsByTagName("table");		
		for (let i = 0; i < tableEls.length; i++) {			
			tableEls[i].children[0].children[0].children[0].style.backgroundColor = "#A9A9A9";
			tableEls[i].children[0].children[0].children[1].style.backgroundColor = "#A9A9A9";
		}		
	} else {
		document.body.style.backgroundColor = '#ffffff';
		document.body.style.color = '#000000';
		const anchorEls = document.getElementsByTagName("a");
		for (let i = 0; i < anchorEls.length; i++) {
			//console.log("working on anchor: "+i);
			anchorEls[i].style.color = '#0000EE';//blue
		}
		const announceEls = document.getElementsByClassName("announcement");
		for (let i = 0; i < announceEls.length; i++) {
		  announceEls[i].style.backgroundColor = "#EEEEEE";
		}
		const footerEls = document.getElementsByClassName("footer");
		for (let i = 0; i < footerEls.length; i++) {
		  footerEls[i].style.backgroundColor = "#EEEEEE";
		}
		const tableEls = document.getElementsByTagName("table");		
		for (let i = 0; i < tableEls.length; i++) {			
			tableEls[i].children[0].children[0].children[0].style.backgroundColor = "#EEEEEE";
			tableEls[i].children[0].children[0].children[1].style.backgroundColor = "#EEEEEE";
		}		
	}
}

/**
.header 
	background-image:url('');		
	background-color:#000000;	
.title-ta
	background-color:#000000;	
.title-en
	background-color:#000000;	

**/

