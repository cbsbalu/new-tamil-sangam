/**
 * Load images from folder into thumbnails and display the clicked image enlarged  
 */
var totalImages = 17;
var fileFormat = ".jpg";

function loadGallery() {	    
	var currentImage = document.getElementById("current-image");
	var imageThumbs = document.getElementById("thumbs-row");
    for (var i = 1; i <= totalImages; i++) {
        var thumb = document.createElement("img");
        thumb.src = "gallery/" + i + fileFormat;        
        thumb.alt = "Image " + i;        
        thumb.classList.add("thumb");
        imageThumbs.appendChild(thumb);
        thumb.addEventListener(
            "click", function() {
                currentImage.src = this.src;
				stopSlide();
            }
        );
	}
	startSlide();
}
/**
 * Initialize
 * 1. Load experiences if set earlier (from storage)
 * 2. Load Photo Gallery
 */
function init(la) {
	localStorage.setItem("lang", la);
	refresh('init');	
	loadGallery();
}
/**
 * When the user scrolls down 20px from the top of the document, show the button
 * Scroll to top when user clicks
 */
window.onscroll = function () {scrollFunction()};
function scrollFunction() {
	let mybutton = document.getElementById("scrollBtn");
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = 'block';
	} else {
		mybutton.style.display = 'none';
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

let timeout;
var slide = 1;
var play = true;
function startSlide() {
	//console.log("slide started");
	document.getElementById("slideCtrl").src = "images/icons/pause.svg";
	var currentImage = document.getElementById("current-image");
	currentImage.src = "gallery/" + slide + fileFormat;
	slide = slide + 1;
	if (slide == totalImages +1) {
		slide = 1;
	}
	nextSlide();
}

function nextSlide() {	
	//console.log("next slide");
	timeout = setTimeout(startSlide, 3000);
}

function stopSlide() {
	//console.log("slide stopped");
	clearTimeout(timeout);
	document.getElementById("slideCtrl").src = "images/icons/play.svg";	
}

function slideCtrl() {
	if (play) {
		stopSlide();
	} else {
		startSlide();
	}	
	play = !play;
}

/**
 * Handle menu click for mobile device
 */
function mobMenuOnClick() {	
	document.getElementById("mob-menu-bar").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}

/**
 * Handle experiences/themes
 */
var dark = false;
var outdoor = false;
var device = "mobile";//desktop
var lang = "en";//ta

/**
 * For testing, clears the storage
 */
function clearStorage() {
	localStorage.clear();
	refresh();
}
/**
 * Called when user clicks the Night/Day link
 */
function switchNightDay(device, lang) {	
	dark = !dark;
	localStorage.setItem("dark", dark.toString());
	localStorage.setItem("device", device);
	localStorage.setItem("lang", lang);
	refresh('switch');
}
/**
 * Called when user clicks the Outdoor/Indoor link
 */
function switchOutdoorIndoor(device, lang) {
	outdoor = !outdoor;
	localStorage.setItem("outdoor", outdoor.toString());
	localStorage.setItem("device", device);
	localStorage.setItem("lang", lang);
	refresh('switch');
}
/**
 * Updates the screen with active experience
 * 1. night & indoor (dark && !outdoor)
 * 2. day & indoor (!dark && !outdoor)
 * 3. night & outdoor (dark && outdoor)
 * 4. day & outdoor (!dark && outdoor)
 */
function refresh(caller) {
	dark = booleanValue(localStorage.getItem("dark"));
	outdoor = booleanValue(localStorage.getItem("outdoor"));
	device = localStorage.getItem("device");
	lang = localStorage.getItem("lang");

	if (dark && !outdoor) {
		nightIndoor();
	}
	if (!dark && !outdoor) {
		dayIndoor();
	}
	if (dark && outdoor) {
		nightOutdoor();
	}
	if (!dark && outdoor) {
		dayOutdoor();
	}	
	if (device == "mobile") {
		restoreMobileMenuEls();
		if (caller == 'switch')
			mobMenuOnClick();
	} else {
		restoreExperienceEls();
	}	
}
function nightIndoor() {	
	if (device == "mobile") {
		if (lang == 'en') {
			document.getElementById("mob-night-switch").innerHTML = "Day";
		} else {
			document.getElementById("mob-night-switch").innerHTML = "பகல்";
		}		
		document.getElementById("mob-night-icon").src = "images/icons/day.svg";		
	} else {
		if (lang == 'en') {
			document.getElementById("night-switch").innerHTML = "Day";
			document.getElementById("outdoor-switch").innerHTML = "Outdoor";
		} else {
			document.getElementById("night-switch").innerHTML = "பகல்";
			document.getElementById("outdoor-switch").innerHTML = "புறம்";
		}
		document.getElementById("night-icon").src = "images/icons/day.svg";
		document.getElementById("outdoor-icon").src = "images/icons/outdoor.svg";
	}
	document.body.style.backgroundColor = "#121212";
	document.body.style.color = "#efefec";
	document.body.style.backgroundImage = "url('')";

	const wrapperEls = document.getElementsByClassName("wrapper");
	for (let i = 0; i < wrapperEls.length; i++) {
		wrapperEls[i].style.backgroundColor = "#121212";
		wrapperEls[i].style.color = '#efefec';
	}
		
	const headerEls = document.getElementsByClassName("header");
	for (let i = 0; i < headerEls.length; i++) {
		headerEls[i].style.backgroundImage = "url('')";
		headerEls[i].style.backgroundColor = "#121212";
		headerEls[i].style.color = "#AAFF00";
	}
	const titletaEls = document.getElementsByClassName("title-ta");
	for (let i = 0; i < titletaEls.length; i++) {
		titletaEls[i].style.backgroundColor = "#121212";
	}
	const titleenEls = document.getElementsByClassName("title-en");
	for (let i = 0; i < titleenEls.length; i++) {
		titleenEls[i].style.backgroundColor = "#121212";
	}

	document.getElementById("desktop-menu").style.backgroundColor = "#121212";
	document.getElementById("desktop-menu").style.opacity = "1";
	document.getElementById("desktop-menu").style.color = "#efefec";
	const menuFootEls = document.getElementsByClassName("menu-footer");
	for (let i = 0; i < menuFootEls.length; i++) {
		menuFootEls[i].style.color = "#efefec";
	}

	const contentEls = document.getElementsByClassName("content");
	for (let i = 0; i < contentEls.length; i++) {
		contentEls[i].style.backgroundColor = "#121212";
		contentEls[i].style.color = "#efefec";
	}
	const announceEls = document.getElementsByClassName("announcement");
	for (let i = 0; i < announceEls.length; i++) {
		announceEls[i].style.backgroundColor = "#A9A9A9";
		announceEls[i].style.color = "#efefec";
	}
	const sponsorEls = document.getElementsByClassName("sponsor-content");
	for (let i = 0; i < sponsorEls.length; i++) {
		sponsorEls[i].style.backgroundColor = "#121212";
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
	document.getElementById("slideCtrl").style.filter = "invert(95%) sepia(100%) saturate(0%) hue-rotate(8deg) brightness(118%) contrast(100%)";	
}
function dayIndoor() {	
	if (device == "mobile") {
		if (lang == 'en') {
			document.getElementById("mob-night-switch").innerHTML = "Night";
		} else {
			document.getElementById("mob-night-switch").innerHTML = "இரவு";
		}
		document.getElementById("mob-night-icon").src = "images/icons/night.svg";
	} else {
		if (lang == 'en') {
			document.getElementById("night-switch").innerHTML = "Night";
			document.getElementById("outdoor-switch").innerHTML = "Outdoor";
		} else {
			document.getElementById("night-switch").innerHTML = "இரவு";
			document.getElementById("outdoor-switch").innerHTML = "புறம்";
		}
		document.getElementById("night-icon").src = "images/icons/night.svg";
		document.getElementById("outdoor-icon").src = "images/icons/outdoor.svg";
	}

	document.body.style.backgroundColor = '#ffffff';
	document.body.style.color = '#000000';
	document.body.style.backgroundImage = "url('')";

	const wrapperEls = document.getElementsByClassName("wrapper");
	for (let i = 0; i < wrapperEls.length; i++) {
		wrapperEls[i].style.backgroundColor = "#ffffff";
		wrapperEls[i].style.color = "#121212";
	}

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

	document.getElementById("desktop-menu").style.backgroundColor = "#ffffff";
	document.getElementById("desktop-menu").style.opacity = "1";
	document.getElementById("desktop-menu").style.color = "#000000";
	const menuFootEls = document.getElementsByClassName("menu-footer");
	for (let i = 0; i < menuFootEls.length; i++) {
		menuFootEls[i].style.color = "#121212";
	}

	const contentEls = document.getElementsByClassName("content");
	for (let i = 0; i < contentEls.length; i++) {
		contentEls[i].style.backgroundColor = "#ffffff";
		contentEls[i].style.color = "#121212";
	}
	const announceEls = document.getElementsByClassName("announcement");
	for (let i = 0; i < announceEls.length; i++) {
		announceEls[i].style.backgroundColor = "#EEEEEE";
		announceEls[i].style.color = "#121212";
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
	document.getElementById("slideCtrl").style.filter = "";
}
function nightOutdoor() {
	if (lang == 'en') {
		document.getElementById("night-switch").innerHTML = "Day";
		document.getElementById("outdoor-switch").innerHTML = "Indoor";
	} else {
		document.getElementById("night-switch").innerHTML = "பகல்";
		document.getElementById("outdoor-switch").innerHTML = "அகம்";
	}
	if (device == "mobile") {
		document.getElementById("mob-night-icon").src = "images/icons/day.svg";
	} else {
		document.getElementById("night-icon").src = "images/icons/day.svg";
		document.getElementById("outdoor-icon").src = "images/icons/indoor.svg";
	}	

	var todaysBg = getBgImageUrl();	
	document.body.style.backgroundImage = "url('" + todaysBg + "')";
	document.body.style.backgroundRepeat = "repeat";
	document.body.style.backgroundAttachment = "fixed";
	document.body.style.backgroundSize = "cover";

	const wrapperEls = document.getElementsByClassName("wrapper");
	for (let i = 0; i < wrapperEls.length; i++) {
		wrapperEls[i].style.backgroundColor = '';
		wrapperEls[i].style.color = '';
	}

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

	document.getElementById("desktop-menu").style.backgroundColor = "#B6D0E2";
	document.getElementById("desktop-menu").style.opacity = "0.8";
	document.getElementById("desktop-menu").style.color = "#121212";
	const menuFootEls = document.getElementsByClassName("menu-footer");
	for (let i = 0; i < menuFootEls.length; i++) {
		menuFootEls[i].style.color = "#121212";
	}

	const contentEls = document.getElementsByClassName("content");
	for (let i = 0; i < contentEls.length; i++) {
		contentEls[i].style.backgroundColor = "#121212";
		contentEls[i].style.color = "#efefec";
	}
	const announceEls = document.getElementsByClassName("announcement");
	for (let i = 0; i < announceEls.length; i++) {
		announceEls[i].style.backgroundColor = "#A9A9A9";
		announceEls[i].style.color = "#efefec";
	}
	const sponsorEls = document.getElementsByClassName("sponsor-content");
	for (let i = 0; i < sponsorEls.length; i++) {
		sponsorEls[i].style.backgroundColor = "#121212";
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
	document.getElementById("slideCtrl").style.filter = "invert(95%) sepia(100%) saturate(0%) hue-rotate(8deg) brightness(118%) contrast(100%)";
}
function dayOutdoor() {
	if (lang == 'en') {
		document.getElementById("night-switch").innerHTML = "Night";
		document.getElementById("outdoor-switch").innerHTML = "Indoor";
	} else {
		document.getElementById("night-switch").innerHTML = "இரவு";
		document.getElementById("outdoor-switch").innerHTML = "அகம்";
	}
	if (device == "mobile") {
		document.getElementById("mob-night-icon").src = "images/icons/night.svg";
	} else {
		document.getElementById("night-icon").src = "images/icons/night.svg";
		document.getElementById("outdoor-icon").src = "images/icons/indoor.svg";
	}	

	var todaysBg = getBgImageUrl();	
	document.body.style.backgroundImage = "url('" + todaysBg + "')";
	document.body.style.backgroundRepeat = "repeat";
	document.body.style.backgroundAttachment = "fixed";
	document.body.style.backgroundSize = "cover";

	const wrapperEls = document.getElementsByClassName("wrapper");
	for (let i = 0; i < wrapperEls.length; i++) {
		wrapperEls[i].style.backgroundColor = "";
		wrapperEls[i].style.color = "";
	}

	const headerEls = document.getElementsByClassName("header");
	for (let i = 0; i < headerEls.length; i++) {
		headerEls[i].style.backgroundImage = "url('')";
		headerEls[i].style.backgroundRepeat = "repeat";
		headerEls[i].style.opacity = "0.8";
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

	document.getElementById("desktop-menu").style.backgroundColor = "#efefec";
	document.getElementById("desktop-menu").style.opacity = "0.8";
	document.getElementById("desktop-menu").style.color = "#121212";
	const menuFootEls = document.getElementsByClassName("menu-footer");
	for (let i = 0; i < menuFootEls.length; i++) {
		menuFootEls[i].style.color = "#121212";
	}
	const contentEls = document.getElementsByClassName("content");
	for (let i = 0; i < contentEls.length; i++) {
		contentEls[i].style.backgroundColor = "#efefec";
		contentEls[i].style.color = "#121212";
	}
	const announceEls = document.getElementsByClassName("announcement");
	for (let i = 0; i < announceEls.length; i++) {
		announceEls[i].style.backgroundColor = "#EEEEEE";
		announceEls[i].style.color = "#121212";
	}
	const sponsorEls = document.getElementsByClassName("sponsor-content");
	for (let i = 0; i < sponsorEls.length; i++) {
		sponsorEls[i].style.backgroundColor = "#efefec";
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
	document.getElementById("slideCtrl").style.filter = "";
}
/**
 * Restore Experience elements (should always look the same) 
 */
function restoreExperienceEls() {
	const expEls = document.getElementsByClassName("experiences");	
	for (let i = 0; i < expEls.length; i++) {
		expEls[i].style.backgroundColor = "#848884";//grey
		expEls[i].style.color = "#efefec";//white
		expEls[i].onmouseover = function () {
			expEls[i].style.backgroundColor = "#006E2E";//green
		};
		expEls[i].onmouseout = function () {
			expEls[i].style.backgroundColor = "#848884";//grey
		};
		const expAnchorEls = expEls[i].getElementsByTagName("a");
		for (let j = 0; j < expAnchorEls.length; j++) {
			expAnchorEls[j].style.color = '#efefec';
			expAnchorEls[j].onmouseover = function () {
				expAnchorEls[j].style.color = "#FFD700";//yellow
			};
			expAnchorEls[j].onmouseout = function () {
				expAnchorEls[j].style.color = "#efefec";//white
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
		navAnchorEls[i].style.color = '#efefec';
	}
	const mobMenuBarEls = document.getElementsByClassName("bar");
	for (let i = 0; i < mobMenuBarEls.length; i++) {			
		mobMenuBarEls[i].style.backgroundColor = "#006E2E";
	}
}
/**
 * Give a background image
 */
function getBgImageUrl() {
	
	var totalDayImages = 9;
	var totalNightImages = 9;
    var fileFormat = ".jpeg";
	var imageUrl = "";
	if (dark) {
		/** Night */
		imageUrl = "images/bg/night-1-min.jpeg";//default image
		let num = randomNumber(1, totalNightImages);
		if (outdoor) {			
			imageUrl = "images/bg/night-" + num +"-min"+ fileFormat;
		} else {			
			imageUrl = '';
		}
	} else {
		/** Day */
		imageUrl = "images/bg/day-1-min.jpeg";//default image
		let num = randomNumber(1, totalDayImages);
		if (outdoor) {			
			imageUrl = "images/bg/day-" + num +"-min"+ fileFormat;			
		} else {			
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

/**
* Helper function to convert string to boolean
* @param {*} string 
* @returns 
*/
function booleanValue(string) {
	if (string == "true")
		return true;
	else
		return false;
}