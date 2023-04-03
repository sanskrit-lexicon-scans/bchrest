// (setq js-indent-level 1)  # for Emacs
function bchrest_info_html() {

let bchrest_section_data = [
 {"title":"I. ṛgveda", "ipage":"1", "rem":"341"},
 {"title":"II. aitareyabrāhmaṇa", "ipage":"20", "rem":"349"},
 {"title":"III. śatapathabrāhmaṇa ", "ipage":"27", "rem":"353"},
 {"title":"IV. āśvalāyana's gṛhya—sūtra", "ipage":"37", "rem":"358"},
 {"title":"V. mahābhārata", "ipage":"38", "rem":"358"},
 {"title":"VI. rāmāyaṇa", "ipage":"85", "rem":"360"},
 {"title":"VII. raghuvaṃśa", "ipage":"95", "rem":"360"},
 {"title":"VIII. viṣṇupurāṇa ", "ipage":"100", "rem":"360"},
 {"title":"IX. bhaṭṭikāvya", "ipage":"108", "rem":"362"},
 {"title":"X. kathāsaritsāgara, vetālapañcaviṃśatikā", "ipage":"109", "rem":"362"},
 {"title":"XI. hitopadeśa", "ipage":"139", "rem":"363"},
 {"title":"XII. Sprüche", "ipage":"161", "rem":"363"},
 {"title":"XIII. gītagovinda", "ipage":"187", "rem":"364"},
 {"title":"XIV. mānavadharmaśāstra", "ipage":"188", "rem":"364"},
 {"title":"XV. vijñāneśvara mitākṣarā", "ipage":"209", "rem":"365"},
 {"title":"XVI. súśruta", "ipage":"216", "rem":"365"},
 {"title":"XVII. varāhamihira bṛhatsaṃhitā", "ipage":"218", "rem":"365"},
 {"title":"XVIII. Grammatisches", "ipage":"221", "rem":"366"},
 {"title":"XIX. amarakoṣa", "ipage":"244", "rem":"367"},
 {"title":"XX. kāvyadarśa ", "ipage":"248", "rem":"367"},
 {"title":"XXI. sadānanda vedānta-sāra", "ipage":"253", "rem":"367"},
 {"title":"XXII. ratnāvalī", "ipage":"290", "rem":"368"},
 {"title":"Alphabetisches Verzeichnis", "ipage":"330", "rem":"372"},
 {"title":"Nachträgliche Verbesserungen", "ipage":"372","rem":""},
];
 const f = function(x) {
  let link = `<a href="index.html?${x.ipage}">${x.ipage}</a>`;
  let rem = x.rem;
  let remark='';
  if (rem != '') {
   remark = `<a href="index.html?${rem}" title="Remarks">(${rem})</a>`;
  }
  let y = `<tr><td>${link}</td> <td>${x.title}</td> <td>${remark}</td> </tr>`;
  return y;
 };
 let htmlarr = bchrest_section_data.map(f);
 let tabmain = htmlarr.join('\n');
 //let tabhead = `<tr><th>P</th><th>R</th><th>S</th></tr>`;
 let tabhead = `<caption><b>Brief table of contents</b></caption>`;
 let html = `<table>\n${tabhead}\n${tabmain}\n</table>\n`;
 return html;
}; // function
function bchrest_info() {
 //let tabtitle = "<b>Brief table of contents</b><br/>";
 //let data = "<b>Brief table of contents</b><br/>";
 //let section = '';
 let html = bchrest_info_html();
 //let html = tabtitle + table;
 let elt=document.getElementById('infotoc');
 elt.innerHTML = html;
}
document.getElementsByTagName("BODY")[0].onload = bchrest_info;

