const xmlTextarea = <HTMLTextAreaElement>document.getElementById("xml-textarea");
const xmlOut = document.getElementById("xml-out");

function update() {
    xmlOut.innerHTML = "";
    const parsedXml = XML.parse(xmlTextarea.value);
    let level = 0;
    for (const token of parsedXml) {
        if (token.type == 1) {
            level--;
        }
        const type = document.createElement("div");
        type.style.width = "110px";
        type.style.marginLeft = ((level > 0) ? level * 20 : 0) + "px";
        type.className = "token";
        const types = [
            "TAG", "CLOSE TAG", "ATTRIBUTE NAME", "ATTRIBUTE_VALUE", "TEXT", "COMMENT"
        ]
        if (token.type == 0 && token.value[0] != '?' && token.value[0] != '!') {
            level++;
        }

        type.innerText = types[token.type];
        xmlOut.appendChild(type);
        const value = document.createElement("div");
        value.style.width = "200px";
        value.className = "token";
        value.innerText = token.value.trim() == "" ? "empty_string" : token.value.trim().replace(/\n/g, "\\n");
        xmlOut.appendChild(value);
        xmlOut.appendChild(document.createElement("br"))
    }
}

xmlTextarea.addEventListener("input", update);
update();