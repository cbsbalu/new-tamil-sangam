function navigateTo(page) {
    const pages = ["home","member","contact","directory"];
    //console.log(page);
    for (let i = 0; i < pages.length; i++) {
        if (page == pages[i]) {
            document.getElementById(page).style.display = "block"; 
        } else {
            document.getElementById(pages[i]).style.display = "none";
        }
    } 
}
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
