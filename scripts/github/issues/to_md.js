// ==UserScript==
// @name         Issue listing using markdown format
// @namespace    http://tom.moulard.org/
// @version      0.3
// @description  try to take over the world!
// @author       Tom Moulard
// @match        https://github.com/*/*/issues*
// @grant        none
// ==/UserScript==

function to_clipboard(txt) {
    return function (e) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(txt);
            return console.log("Copied (using navigator api) the text : " + txt);
        }

        // Creating false input
        var input = document.createElement("input");
        input.value = txt;
        input.style.display = "none";
        document.children[0].append(input)

        // Using false input to add stuff to clipboard
        input.select();
        input.setSelectionRange(0, 99999);
        document.execCommand("copy");
        return console.log("Copied the text: " + input.value);
    }
}

function create_button(text, parrent_selector) {
    const buttons = document.querySelector(parrent_selector);
    let button = document.createElement('template');
    button.innerHTML = buttons.children[1].outerHTML;
    let bc = button.content.firstElementChild;
    bc.text = text;
    bc.dataset = {};
    bc.className = "btn";
    bc.href = "#";
    bc.style = "margin-left: 16px;";
    const uuid = "my-github-button-" + Math.random().toString(36).substring(7);
    bc.id = uuid;
    buttons.appendChild(button.content.firstElementChild);
    return uuid;
}

function get_divs(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function disp(div) {
    var res = "|Issues|Desc|\n|------|----|\n";
    Array.from(div.children).reverse().forEach((e) => {res += "| " + e.id.split("_")[1] + " ||\n"});
    document.getElementsByClassName("protip")[0].innerHTML += "<br>" + res.replaceAll("\n", "<br>");
    console.log(res);
    return res;
}

(function() {
    'use strict';
    const path = "#repo-content-pjax-container > div > div.d-flex.flex-justify-between.mb-md-3.flex-column-reverse.flex-md-row.flex-items-end > div.ml-3.d-flex.flex-justify-between.width-full.width-md-auto"
    let d = get_divs(`//*[@id="repo-content-pjax-container"]/div/div[3]/div[2]/div`);
    if (d) {
        document.getElementById(create_button("Copy Format", path)).addEventListener("click", to_clipboard(disp(d)));
        return;
    }
    d = get_divs(`//*[@id="repo-content-pjax-container"]/div/div[4]/div[2]/div`);
    document.getElementById(create_button("Copy Format", path)).addEventListener("click", to_clipboard(disp(d)));
})();
