/**
Shows and hides div sections
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
Loads images from folder into thumbnails and displays the clicked image enlarged 
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
Handles menu click for mobile device
**/
function menuOnClick() {	
	document.getElementById("mob-menu-bar").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}
