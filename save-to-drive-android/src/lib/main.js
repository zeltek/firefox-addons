var firefox=false;
var fennec=false;
var seamonkey=false;
var thunderbird=false;
function SaveToDrive(urlfile)
{

	/*var htmlhead="<!DOCTYPE html><html><head><title>Save to Drive</title><script src=\"https://apis.google.com/js/plusone.js\"></script></head>";
		var htmlbody="<body><div class=\"g-savetodrive\" data-src=\""+url+"\" data-filename=\"SaveToDrive File\" data-sitename=\"Save to Drive\"></div></body></html>";
	let htmlfinal=htmlhead+htmlbody;*/
	var urlbase=require("tabs").activeTab.url;
	var data = require("sdk/self").data;
	var pageDrive=require("sdk/page-mod");
	var page=pageDrive.PageMod({
		include: urlbase,
  		contentScriptFile: data.url("savetodrive.js"),
		onAttach: function(worker){
			worker.port.emit("addButton",urlfile);
			worker.port.on("stop",function(){
				
				page.destroy();
			});
		}
	});
	require("tabs").activeTab.reload();
	



	//require("tabs").open("data:text/html,"+htmlfinal);


	/*var tab=require("tabs");
	console.log("Saving "+urlfile+" from "+tab.activeTab.url);

	
	var data = require("sdk/self").data;
	var pageDrive=require("sdk/page-worker");
	pageDrive.Page({
  		contentScriptFile: data.url("savetodrive.js"),
		contentURL: tab.activeTab.url
	});
		
	pageDrive.port.on("loaded", function() {
  		pageDrive.port.emit("addButton",urlfile);
	});*/
	

}
exports.main=function(options)
{
	if(options.loadReason=="install"){
		require("tabs").open("http://sites.google.com/site/divelmedia"); //Welcome page
	}
	//Checking system options
	var system=require("sdk/system/xul-app");
	if(system.name=="Fennec")
	{
		fennec=true;
	}else if(system.name=="Firefox")
	{
		firefox=true;
	}else if(system.name=="SeaMonkey")
	{
		seamonkey=true;
	}else if(system.name=="Thunderbird")
	{
		thunderbird=true;
	}
	//Creating UI
	if(firefox)
	{
		var mm = require("context-menu");
		var menuItem = mm.Item({
		  label: "Save to Drive",
		  context: mm.SelectorContext("a"),
		  contentScript: 'self.on("click", function (node) {' +
				 '  self.postMessage(node.href);' +
				 '});',
		  onMessage: function (urlfile) {
		    SaveToDrive(urlfile);
		  }
		});

	}
	if(fennec)
	{
		const utils = require('api-utils/window/utils');
		const recent = utils.getMostRecentBrowserWindow();
		let selector =  recent.NativeWindow.contextmenus.SelectorContext("a");
		recent.NativeWindow.contextmenus.add("Save to Drive",selector,function (target){
			SaveToDrive(target.href);
		});
	}
	if(seamonkey || thunderbird)
	{
		const utils = require('api-utils/window/utils');
		const recent = utils.getMostRecentBrowserWindow();
		recent.alert("Hola desde mi complemento");
	}

}
