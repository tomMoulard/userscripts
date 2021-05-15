// ==UserScript==
// @name         Add button to change to daily issues
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://github.com/traefik/traefik/issues?q=is%3Aissue+sort%3Aupdated-desc+-label%3Astatus%2F5-frozen-due-to-age+updated%3A%3E%3D%E2%80%9D+(new%20Date(Date.now()%20-%20864e5)).toISOString().slice(0,10)+%E2%80%9CT16%3A00%3A00
// @grant        none
// ==/UserScript==

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

(function() {
    'use strict';
    document.getElementById(create_button("Daily issues", "#repo-content-pjax-container > div > div.d-flex.flex-justify-between.mb-md-3.flex-column-reverse.flex-md-row.flex-items-end > div.ml-3.d-flex.flex-justify-between.width-full.width-md-auto")).addEventListener("click", (e) => {
        var now = new Date;
        var num_of_days = (now.getUTCDay() === 1) ? 3 : 1;
        javascript:location.href="?q=is%3Aissue+sort%3Aupdated-desc+-label%3Astatus%2F5-frozen-due-to-age+updated%3A>%3D"+(new Date(Date.now() - 864e5 * num_of_days)).toISOString().slice(0,10) + "T16%3A00%3A00";
    });
})();
