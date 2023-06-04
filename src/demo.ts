const xmlTextarea = <HTMLTextAreaElement>document.getElementById("xml-textarea");
const xmlOut = document.getElementById("xml-out");

function update() {
    xmlOut.innerHTML = "";
    const parsedXml = XML.parse(xmlTextarea.value);
    for (const token of parsedXml) {
        const type = document.createElement("div");
        type.style.width = "110px";
        type.className = "token";
        const types = [
            "TAG", "CLOSE TAG", "ATTRIBUTE NAME", "ATTRIBUTE_VALUE", "TEXT"
        ]
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