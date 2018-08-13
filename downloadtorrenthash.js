
function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

var debug_text = [];
function log(txt) {
    debug_text.push(txt.toString());
}
function logj(obj) {
    if (obj == undefined)
        log("UNDEFINED");
    else
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

function dfs(node, depth) {
    if (depth == undefined) depth = 0;
    var str = '';
    for (var i = 0; i < depth; i++) str = str + ".";
    str = str + node.nodeName;

    var txt = node.textContent;
    txt = txt.replace(
            /[a-fA-F0-9]{40}/g,
            function(match, offset, string) {
            return '<a href="magnet:?xt=urn:btih:' + match + '">'
            + match + '</a>';
    });
    node.textContent = txt;

    //logj(str);
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
        dfs(children[i], depth+1);
    }
}

function download_torrent_hash() {
    var body = document.body;
    dfs(body, 0);
    return;

    




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

//logj( getMethods(document).join("<br>") );
download_torrent_hash();
print_debug_text();

