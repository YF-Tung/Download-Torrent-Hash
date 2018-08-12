function download_torrent_hash() {
    var body = document.getElementsByTagName("BODY")[0]; 
    var bodyText = body.innerHTML;

    var parser = new DOMParser();
    var serializer = new XMLSerializer();
    var xmlObject = parser.parseFromString('<body>' + body.innerHTML + '</body>', 'text/html');

    if (xmlObject.documentElement.nodeName == 'parsererror') {
        console.log('Error: cannot parse html body');
        return;
    }

    var bodyText = serializer.serializeToString(xmlObject);
    bodyText = bodyText.replace(
            /[a-fA-F0-9]{40}/g,
            function(match, offset, string) {
            return '<a href="magnet:?xt=urn:btih:' + match + '">'
            + match + '</a>';
    });

    body.innerHTML = bodyText;

    // Check that script has run correctly
    document.body.style.border = "25px solid red";
}
download_torrent_hash();

