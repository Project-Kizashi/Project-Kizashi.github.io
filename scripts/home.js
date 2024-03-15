function openlink(link) {
    if (link == "devices.html") {
        window.open(link, '_self').focus();
    } else {
        window.open(link, '_blank').focus();
    }
}