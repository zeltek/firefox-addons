/*
* Content Script for Save to Drive Addon
*/


self.port.on("addButton",function(url){
	document.head.innerHTML="<title>Save to Drive</title>";
	 var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
	//po.textContent="{parsetags: 'explicit'}";
        //var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	document.head.appendChild(po);
	

	//document.head.innerHTML="<script src=\"https://apis.google.com/js/plusone.js\"></script>";
	document.body.innerHTML="<div id=\"savetodrive\"><div class=\"g-savetodrive\" data-src=\""+url+"\" data-filename=\"SaveToDrive File\" data-sitename=\"Save to Drive\"></div></div>";
	document.body.innerHTML+="<button onclick=\"window.location.reload(true);\">Return to page</button>";
	self.port.emit("stop");
	//document.body.innerHTML+="<script>alert('HOLA');gapi.savetodrive.go('savetodrive');</script>";
	/*var po2 = document.createElement('script'); po2.type = 'text/javascript';
        po2.textContent="window.addEventListener('DOMContentLoaded',function (){alert('HELLO');gapi.savetodrive.go('savetodrive')});";
        var s2 = document.getElementsByTagName('script')[0]; s2.parentNode.insertBefore(po2, s2);*/

	
	/*var event =document.createEvent("MouseEvents");
	event.initEvent("click",true,true);
	var gdrive=document.getElementById("gdrive");
	gdrive.dispatchEvent(event);*/
	
	



});
