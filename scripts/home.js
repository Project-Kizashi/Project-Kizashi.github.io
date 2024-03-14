function setupClickHandlers() {
    function openlink(link) {
        if (link == "devices.html") {
            window.open(link, '_self').focus();
        } else {
            window.open(link, '_blank').focus();
        }
    }

    let clickable = document.querySelectorAll(".clickable");

    clickable.forEach(function (clickable) {
        clickable.addEventListener("click", function (eve) {
            openlink(eve.target.id);
        });
    });
}

document.addEventListener('DOMContentLoaded', setupClickHandlers);