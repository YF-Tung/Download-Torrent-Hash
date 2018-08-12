
var debug_text = [];
function log(txt) {
    debug_text.push(txt.toString());
}
function logj(obj) {
    log(JSON.stringify(obj));
}
function print_debug_text() {
    var txt_to_print = '';
    for (var i = 0; i < debug_text.length; i++) {
        var txt = debug_text[i];
        txt_to_print = txt_to_print + 'DEBUG: ' + txt + '<br>';
    }
    var body = document.getElementsByTagName('BODY')[0];
    body.innerHTML = txt_to_print + body.innerHTML;
}

function download_torrent_hash() {
    var body = document.getElementsByTagName("BODY")[0]; 
    var bodyText = body.innerHTML;

    var parser = new DOMParser();
    var serializer = new XMLSerializer();
    var xmlObject = parser.parseFromString('<html><head></head><body>' + body.innerHTML + '</body></html>', 'text/html');

    if (xmlObject.documentElement.nodeName == 'parsererror') {
        console.log('Error: cannot parse html body');
        return;
    }


    logj(xmlObject);

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
print_debug_text();

