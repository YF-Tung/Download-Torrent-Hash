function download_torrent_hash() {
    var body = document.getElementsByTagName("BODY")[0]; 
    var bodyText = body.innerHTML;

    body.innerHTML = bodyText.replace(
        /[a-fA-F0-9]{40}/g,
        function(match, offset, string) {
            return '<a href="magnet:?xt=urn:btih:' + match + '">'
                + match + '</a>';
        });
}
download_torrent_hash();

