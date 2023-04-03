// (setq js-indent-level 1)  # for Emacs
/*
 ipage: 1-372 internal page number  (as printed on a page)
 spage: 1-385 page number in the image file name
        spage = ipage+9
        spage = 6: Title page
 filename = 'Bayer_chr2 N.pdf'  Where N = 1,2,...,10,...,99,100,...,385
*/
function unused_ipage_error(ipage) {
 let elt=document.getElementById('ipage');
 let html = '<p>Could not find page ' + ipage + '</p>';
 elt.innerHTML = html;
}
function makelink(ipage,txt) {
 let href = window.location.href;
 //let url = new URL(href);
 //let search = url.search  // a string, possibly empty
 let base = href.replace(/[?].*$/,'');
 let newsearch = `?${ipage}`;
 let newhref = base + newsearch;
 let html = `<a class="nppage"href="${newhref}"><span class="nppage1">${txt}</span></a>`;
 return html;
}
function display_ipage_id(indexes) {
 //console.log('display_ipage_id: indexes=',indexes);
 [indexprev,indexcur,indexnext] = indexes;
 let prevlink = makelink(indexprev,'<');
 let nextlink = makelink(indexnext,'>');
 //let html = `<p>Page ${indexcur}  (${prevlink} ${nextlink})</p>`;
 let html = `<p>Page ${indexcur}  &nbsp; &nbsp; ${prevlink} &nbsp; ${nextlink}</p>`;
 let elt = document.getElementById('ipageid');
 elt.innerHTML = html;
}

function ipage_adjust(ipage) {
 // Assume ipage is an int.
 let maxipage = 372;
 if (ipage < 0) {ipage = 0;}
 if (ipage > maxipage) {ipage = maxipage;}
 return ipage
}
function get_ipage_from_url() {
 /* return internal page number derived from url search string.
  Return as int from 0 (title page) through 372 (last internal page number)
*/
 let href = window.location.href;
 let url = new URL(href);
 //console.log('url=',url);
 // url = http://xyz.com?X   search = ?X
 let search = url.search  // a string, possibly empty
 //console.log('get_ipage_from_url. search=',search);
 let page = '0'; // default value (title page)
 let x = search.match(/^[?]([0-9]+)/);
 if (x != null) {
  page = x[1];
 }
 let ipage = parseInt(page);
 ipage = ipage_adjust(ipage);
 //console.log(' ipage=',ipage);
 return ipage;
}

function get_indexes_from_ipage(ipage) {
 // Assume ipage is an int from 0 to maxipage
 // return array [prev,cur,next] array of 3 ints.
 let cur = ipage_adjust(ipage);
 let prev = ipage_adjust(cur-1);
 let next = ipage_adjust(cur+1);
 return [prev,cur,next];
}

function get_pdfpage_from_index(index) {
/* index assumed int
 return name of file with the given volume and page
 'Bayer_chr2 N.pdf'  
*/
 let N = index + 9;  // The image file name N
 let pdf = `Bayer_chr2 ${N}.pdf`
 return pdf
}

function get_ipage_html(indexcur) {
 let html = null;
 if (indexcur == null) {return html;}
 let pdfcur = get_pdfpage_from_index(indexcur);
 let urlcur = `pdfpages/${pdfcur}`;
 let android = ` <a href='${urlcur}' style='position:relative; left:100px;'>Click to load pdf</a>`;
 let imageElt = `<object id='servepdf' type='application/pdf' data='${urlcur}' 
              style='width: 98%; height:98%'> ${android} </object>`;
 //console.log('get_ipage_html. imageElt=',imageElt);
 return imageElt;
}

function display_ipage_html(indexes) {
 display_ipage_id(indexes);
 let html = get_ipage_html(indexes[1]);
 let elt=document.getElementById('ipage');
 elt.innerHTML = html;
}
function display_ipage_url() {
 let ipage = get_ipage_from_url();
 // [prev,cur,next]   cur == ipage. Array of ints
 let indexes = get_indexes_from_ipage(ipage); 
 let indexcur = indexes[1];
 /* not needed
 if (indexcur == null) {
  ipage_error(ipage);
  return;
 }
*/
 display_ipage_html(indexes);
}

document.getElementsByTagName("BODY")[0].onload = display_ipage_url;

