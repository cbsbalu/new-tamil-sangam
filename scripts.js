/**
 * When the user scrolls down 20px from the top of the document, show the button
 * Scroll to top when user clicks
 */
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
	let mybutton = document.getElementById("scrollBtn");	
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}	
}
function scrollToTop() {
	window.scrollTo(0, 0);
}
/**
 * Show and hide div sections
 * @param {any} device
 * @param {any} section
 */
function navigateTo(device, section) {
	const sections = ["home","member","sponsor","contact","directory"];    
	for (let i = 0; i < sections.length; i++) {
		if (section == sections[i]) {
			document.getElementById(section).style.display = "block"; 
        } else {
			document.getElementById(sections[i]).style.display = "none";
        }
    }
	if (device == "mobile") {
		mobMenuOnClick();		
	}		
}
/**
 * Load images from folder into thumbnails and display the clicked image enlarged  
 */
function loadGallery() {    
    var totalImages = 8;
    var fileFormat = ".jpeg";
	var imageThumbs = document.getElementById("thumbs-row");    
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
 * Handle menu click for mobile device
 */
function mobMenuOnClick() {	
	document.getElementById("mob-menu-bar").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}

var dark = false;
/**
 * Handle Night/Day
 * @param {any} element
 * @param {any} device
 * @param {any} lang
 */
function lights(element, device, lang) {		
	dark = !dark;	
	if (dark) {
		/** Night Experience */
		if (device == "mobile") {
			document.getElementById("mob-light").src = "images/icons/day.svg";
		} else {
			document.getElementById("light").src = "images/icons/day.svg";
		}
		
		if (lang == 'en') {
			element.innerHTML = "Day";
		} else {
			element.innerHTML = "பகல்";
		}
		if (outDoor) {
			/*console.log("outdoor & night");*/			
			var todaysBg = getBgImageUrl(dark,outDoor);
			document.body.style.backgroundImage = "url('" + todaysBg + "')";
			document.body.style.backgroundRepeat = "repeat";
			document.body.style.backgroundAttachment = "fixed";
			document.body.style.backgroundSize = "cover"; 
		} else {
			/*console.log("indoor & night");*/
			document.body.style.backgroundColor = '#000000';
			document.body.style.color = '#ffffff';
			document.body.style.backgroundImage = "url('')";
		}				
		/** Handle header */
		const headerEls = document.getElementsByClassName("header");
		for (let i = 0; i < headerEls.length; i++) {
			headerEls[i].style.backgroundImage = "url('')";
			headerEls[i].style.backgroundColor = "#000000";			
			headerEls[i].style.color = "#AAFF00";
		}
		const titletaEls = document.getElementsByClassName("title-ta");
		for (let i = 0; i < titletaEls.length; i++) {			
			titletaEls[i].style.backgroundColor = "#000000";			
		}
		const titleenEls = document.getElementsByClassName("title-en");
		for (let i = 0; i < titleenEls.length; i++) {
			titleenEls[i].style.backgroundColor = "#000000";
		}
		/** Handle Desktop Menu elements */
		document.getElementById("desktop-menu").style.backgroundColor = "#000000";
		document.getElementById("desktop-menu").style.opacity = "1";
		document.getElementById("desktop-menu").style.color = "#ffffff";
		const menuFootEls = document.getElementsByClassName("menu-footer");
		for (let i = 0; i < menuFootEls.length; i++) {			
			menuFootEls[i].style.color = "#ffffff";
		}
		const contentEls = document.getElementsByClassName("content");
		for (let i = 0; i < contentEls.length; i++) {
			contentEls[i].style.backgroundColor = "#000000";
			contentEls[i].style.color = "#ffffff";
		}
		const announceEls = document.getElementsByClassName("announcement");
		for (let i = 0; i < announceEls.length; i++) {
		  	announceEls[i].style.backgroundColor = "#A9A9A9";
		  	announceEls[i].style.color = "#ffffff";
		}
		const sponsorEls = document.getElementsByClassName("sponsor-content");
		for (let i = 0; i < sponsorEls.length; i++) {
			sponsorEls[i].style.backgroundColor = "#000000";
			sponsorEls[i].style.color = "#eeeeee";
		}
		const anchorEls = document.getElementsByTagName("a");
		for (let i = 0; i < anchorEls.length; i++) {			
			anchorEls[i].style.color = '#4169E1';//C3D9FF:gmail blue
			
		}
		const tableEls = document.getElementsByTagName("table");		
		for (let i = 0; i < tableEls.length; i++) {			
			tableEls[i].children[0].children[0].children[0].style.backgroundColor = "#A9A9A9";
			tableEls[i].children[0].children[0].children[1].style.backgroundColor = "#A9A9A9";
		}
	} else {

		if (device == "mobile") {
			document.getElementById("mob-light").src = "images/icons/night.svg";
		} else {
			document.getElementById("light").src = "images/icons/night.svg";
		}

		/** Day Experience **/
		if (lang == 'en') {
			element.innerHTML = "Night";
		} else {
			element.innerHTML = "இரவு";
		}	
		if (outDoor) {
			/*console.log("outdoor & day");*/
			var todaysBg = getBgImageUrl(dark,outDoor);
			document.body.style.backgroundImage = "url('" + todaysBg + "')";
			document.body.style.backgroundRepeat = "repeat";
			document.body.style.backgroundAttachment = "fixed";
			document.body.style.backgroundSize = "cover"; 
		} else {
			/*console.log("indoor & day");*/
			document.body.style.backgroundColor = '#ffffff';
			document.body.style.color = '#000000';
			document.body.style.backgroundImage = "url('')";
		}
		/**Handle header*/		
		const headerEls = document.getElementsByClassName("header");		
		for (let i = 0; i < headerEls.length; i++) {
			headerEls[i].style.backgroundImage = "url('images/wh-pattern.png')";
			headerEls[i].style.backgroundRepeat = "repeat";
			headerEls[i].style.backgroundColor = "#f1f1f1";
			headerEls[i].style.color = "#006E2E";
		}						
		const titletaEls = document.getElementsByClassName("title-ta");
		for (let i = 0; i < titletaEls.length; i++) {
			titletaEls[i].style.backgroundColor = "#f1f1f1";
		}
		const titleenEls = document.getElementsByClassName("title-en");
		for (let i = 0; i < titleenEls.length; i++) {
			titleenEls[i].style.backgroundColor = "#f1f1f1";
		}
		/**Handle Desktop Menu elements*/
		document.getElementById("desktop-menu").style.backgroundColor = "#ffffff";
		document.getElementById("desktop-menu").style.opacity = "1";
		document.getElementById("desktop-menu").style.color = "#000000";
		const menuFootEls = document.getElementsByClassName("menu-footer");
		for (let i = 0; i < menuFootEls.length; i++) {			
			menuFootEls[i].style.color = "#000000";
		}	
		const contentEls = document.getElementsByClassName("content");
		for (let i = 0; i < contentEls.length; i++) {
			contentEls[i].style.backgroundColor = "#ffffff";
			contentEls[i].style.color = "#000000";
		}
		const announceEls = document.getElementsByClassName("announcement");
		for (let i = 0; i < announceEls.length; i++) {
		  	announceEls[i].style.backgroundColor = "#EEEEEE";
		  	announceEls[i].style.color = "#000000";		  
		}
		const sponsorEls = document.getElementsByClassName("sponsor-content");
		for (let i = 0; i < sponsorEls.length; i++) {
			sponsorEls[i].style.backgroundColor = "#ffffff";
			sponsorEls[i].style.color = "#465945";
		}
		const anchorEls = document.getElementsByTagName("a");
		for (let i = 0; i < anchorEls.length; i++) {
			anchorEls[i].style.color = '#0000EE';//blue
		}
		const tableEls = document.getElementsByTagName("table");		
		for (let i = 0; i < tableEls.length; i++) {			
			tableEls[i].children[0].children[0].children[0].style.backgroundColor = "#EEEEEE";
			tableEls[i].children[0].children[0].children[1].style.backgroundColor = "#EEEEEE";
		}		
	}
	if (device == "mobile") {
		restoreMobileMenuEls();
		mobMenuOnClick();
	} else {
		restoreExperienceEls();
	}
}
var outDoor = false;
/**
 * Handle Outdoor/Indoor
 * @param {any} element
 * @param {any} device
 * @param {any} lang
 */
function outDoors(element, device, lang) {
	outDoor = !outDoor;	
	if (outDoor) {
		/** Outdoor Experience */		
		document.getElementById("door").src="images/icons/indoor.svg";
		if (lang == 'en') {
			element.innerHTML = "Indoor";
		} else {
			element.innerHTML = "அகம்";
		}

		var todaysBg = getBgImageUrl(dark,outDoor);
		document.body.style.backgroundImage = "url('" + todaysBg +"')";	
		document.body.style.backgroundRepeat = "repeat";
		document.body.style.backgroundAttachment = "fixed";
		document.body.style.backgroundSize = "cover"; 

		/**Handle header*/
		const headerEls = document.getElementsByClassName("header");		
		for (let i = 0; i < headerEls.length; i++) {
			headerEls[i].style.backgroundImage = "url('')";
			headerEls[i].style.opacity = "0.8";
			headerEls[i].style.backgroundColor = "#B6D0E2";
			headerEls[i].style.color = "#006E2E";
		}
		const titletaEls = document.getElementsByClassName("title-ta");
		for (let i = 0; i < titletaEls.length; i++) {
			titletaEls[i].style.backgroundColor = "#B6D0E2";
		}
		const titleenEls = document.getElementsByClassName("title-en");
		for (let i = 0; i < titleenEls.length; i++) {
			titleenEls[i].style.backgroundColor = "#B6D0E2";
		}
		/**Handle Desktop Menu elements*/
		document.getElementById("desktop-menu").style.backgroundColor = "#B6D0E2";
		document.getElementById("desktop-menu").style.opacity = "0.8";
		document.getElementById("desktop-menu").style.color = "#000000";
		const menuFootEls = document.getElementsByClassName("menu-footer");
		for (let i = 0; i < menuFootEls.length; i++) {			
			menuFootEls[i].style.color = "#000000";
		}
		const contentEls = document.getElementsByClassName("content");
		for (let i = 0; i < contentEls.length; i++) {
			contentEls[i].style.backgroundColor = "#ffffff";
			contentEls[i].style.color = "#000000";
		}		
		const announceEls = document.getElementsByClassName("announcement");
		for (let i = 0; i < announceEls.length; i++) {
			announceEls[i].style.backgroundColor = "#EEEEEE";
			announceEls[i].style.color = "#000000";
		}
		const sponsorEls = document.getElementsByClassName("sponsor-content");
		for (let i = 0; i < sponsorEls.length; i++) {
			sponsorEls[i].style.backgroundColor = "#ffffff";
			sponsorEls[i].style.color = "#465945";
		}
		const anchorEls = document.getElementsByTagName("a");
		for (let i = 0; i < anchorEls.length; i++) {
			anchorEls[i].style.color = '#0000EE';//blue
		}
		const tableEls = document.getElementsByTagName("table");
		for (let i = 0; i < tableEls.length; i++) {
			tableEls[i].children[0].children[0].children[0].style.backgroundColor = "#EEEEEE";
			tableEls[i].children[0].children[0].children[1].style.backgroundColor = "#EEEEEE";
		}
	} else {
		/** Indoor Experience */
		document.getElementById("door").src="images/icons/outdoor.svg";
		if (lang == 'en') {
			element.innerHTML = "Outdoor";
		} else {
			element.innerHTML = "புறம்";
		}								
		if (dark) {
			/*console.log("night & indoor");*/
			document.body.style.backgroundColor = '#000000';
			document.body.style.color = '#ffffff';
			document.body.style.backgroundImage = "url('')";
		} else {
			/*console.log("day & indoor");*/
			document.body.style.backgroundColor = '#ffffff';
			document.body.style.color = '#000000';
			document.body.style.backgroundImage = "url('')";	
		}
		document.body.style.backgroundImage = "url('')";
		/**Handle header*/
		const headerEls = document.getElementsByClassName("header");
		for (let i = 0; i < headerEls.length; i++) {
			headerEls[i].style.backgroundImage = "url('images/wh-pattern.png')";
			headerEls[i].style.backgroundRepeat = "repeat";
			headerEls[i].style.backgroundColor = "#f1f1f1";
			headerEls[i].style.color = "#006E2E";
		}
		const titletaEls = document.getElementsByClassName("title-ta");
		for (let i = 0; i < titletaEls.length; i++) {
			titletaEls[i].style.backgroundColor = "#f1f1f1";
		}
		const titleenEls = document.getElementsByClassName("title-en");
		for (let i = 0; i < titleenEls.length; i++) {
			titleenEls[i].style.backgroundColor = "#f1f1f1";
		}
		/**Handle Desktop Menu elements*/
		document.getElementById("desktop-menu").style.backgroundColor = "#ffffff";
		document.getElementById("desktop-menu").style.opacity = "1";
		document.getElementById("desktop-menu").style.color = "#000000";
		const menuFootEls = document.getElementsByClassName("menu-footer");
		for (let i = 0; i < menuFootEls.length; i++) {			
			menuFootEls[i].style.color = "#000000";
		}
		const contentEls = document.getElementsByClassName("content");
		for (let i = 0; i < contentEls.length; i++) {
			contentEls[i].style.backgroundColor = "#ffffff";
			contentEls[i].style.color = "#000000";
		}
		const announceEls = document.getElementsByClassName("announcement");
		for (let i = 0; i < announceEls.length; i++) {
			announceEls[i].style.backgroundColor = "#EEEEEE";
			announceEls[i].style.color = "#000000";
		}
		const sponsorEls = document.getElementsByClassName("sponsor-content");
		for (let i = 0; i < sponsorEls.length; i++) {
			sponsorEls[i].style.backgroundColor = "#ffffff";
			sponsorEls[i].style.color = "#465945";
		}
		
		const anchorEls = document.getElementsByTagName("a");
		for (let i = 0; i < anchorEls.length; i++) {
			anchorEls[i].style.color = '#0000EE';//blue
		}
		const tableEls = document.getElementsByTagName("table");
		for (let i = 0; i < tableEls.length; i++) {
			tableEls[i].children[0].children[0].children[0].style.backgroundColor = "#EEEEEE";
			tableEls[i].children[0].children[0].children[1].style.backgroundColor = "#EEEEEE";
		}
	}
	if (device == "mobile") {
		restoreMobileMenuEls();
		mobMenuOnClick();
	} else {
		restoreExperienceEls();
	}	
}
/**
 * Restore Experience elements (should always look the same) 
 */
function restoreExperienceEls() {
	const expEls = document.getElementsByClassName("experiences");	
	for (let i = 0; i < expEls.length; i++) {
		expEls[i].style.backgroundColor = "#848884";//grey
		expEls[i].style.color = "#ffffff";//white
		expEls[i].onmouseover = function () {
			expEls[i].style.backgroundColor = "#006E2E";//green
		};
		expEls[i].onmouseout = function () {
			expEls[i].style.backgroundColor = "#848884";//grey
		};
		const expAnchorEls = expEls[i].getElementsByTagName("a");
		for (let j = 0; j < expAnchorEls.length; j++) {
			expAnchorEls[j].style.color = '#ffffff';
			expAnchorEls[j].onmouseover = function () {
				expAnchorEls[j].style.color = "#FFD700";//yellow
			};
			expAnchorEls[j].onmouseout = function () {
				expAnchorEls[j].style.color = "#ffffff";//white
			};
		}
	}	
}
/**
 * Restore Mobile Menu elements (should always look the same)
*/
function restoreMobileMenuEls() {	
	const navEls = document.getElementById("nav");
	const navAnchorEls = navEls.getElementsByTagName("a");
	for (let i = 0; i < navAnchorEls.length; i++) {
		navAnchorEls[i].style.color = '#ffffff';
	}
	const mobMenuBarEls = document.getElementsByClassName("bar");
	for (let i = 0; i < mobMenuBarEls.length; i++) {			
		mobMenuBarEls[i].style.backgroundColor = "#006E2E";
	}
}
/**
 * Give a background image
 */
function getBgImageUrl(dark, outDoor) {
	var totalDayImages = 9;
	var totalNightImages = 7;
    var fileFormat = ".jpeg";
	var imageUrl = "";
	if (dark) {
		/** Night */
		imageUrl = "images/bg/night-1-min.jpeg";//default image
		let num = randomNumber(1, totalNightImages);
		if (outDoor) {
			/*console.log("outdoor & night");*/
			imageUrl = "images/bg/night-" + num +"-min"+ fileFormat;
		} else {
			/*console.log("indoor & night");*/
			imageUrl = '';
		}
	} else {
		/** Day */
		imageUrl = "images/bg/day-1.jpeg";//default image
		let num = randomNumber(1, totalDayImages);
		if (outDoor) {
			/*console.log("outdoor & day");*/
			imageUrl = "images/bg/day-" + num +"-min"+ fileFormat;			
		} else {
			/*console.log("indoor & day");*/
			imageUrl = '';
		}
	}
	return imageUrl;
}
/**
 * Function to generate random number within a range
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}