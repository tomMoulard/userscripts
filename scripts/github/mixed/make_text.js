// ==UserScript==
// @name         Generate text for issues/PR
// @namespace    http://tom.moulard.org/
// @version      0.1
// @description  try to take over the world!
// @author       Tom Moulard
// @match        https://github.com/*/*/*/*
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
    button.innerHTML = buttons.children[0].outerHTML;
    let bc = button.content.firstElementChild;
    bc.text = text;
    bc.dataset = {};
    bc.href = "#";
    let uuid = "my-github-button-" + Math.random().toString(36).substring(7);
    bc.id = uuid;
    console.log(button, uuid);
    buttons.appendChild(button.content.firstElementChild);
    return uuid;
}

(function() {
    'use strict';


    var text = `    - ${document.location.href} ${document.getElementsByClassName('js-issue-title')[0].innerText.trim()} - `;
    console.log(text);
    document.getElementById(create_button("Copy text", "#partial-discussion-header > div.gh-header-show > div > div")).addEventListener("click", to_clipboard(text));
})();
