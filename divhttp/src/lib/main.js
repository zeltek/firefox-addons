const data=require("self").data;
const tabs=require("tabs");
const prefs=require("simple-prefs").prefs;
var srv;
exports.main=function(options)
{
	if(options.loadReason=="install"){
		tabs.open(data.url("welcome.html")); //Welcome HTML file
		tabs.open("http://sites.google.com/site/divelmedia");
		//Configurar con pagina XUL o HTML o Javascript
	
	}
	if(options.loadReason=="upgrade"){
		tabs.open(data.url("changelog.html")); //Changelog HTML file
	}
	require("simple-prefs").on("review",function (){
		tabs.open("http://addons.mozilla.org/en/firefox/addon/divhttp");
	});
	var panel=require("panel").Panel({
		height: 200,
		width: 500,
		contentURL: data.url("divhttp.html"),
		contentScriptFile: data.url("divhttp.js")
	});
	var widget=require("widget").Widget({
		id: "divhttp-widget",
		label: "DivHTTP",
		contentURL: data.url("divhttp64.png"),
		panel: panel,
		onClick: function(){
			panel.port.emit("startUI",prefs.defdir,prefs.defport);
		}

	});
	panel.port.on("startServer",function(dir,port){
		var { startServerAsync } = require("sdk/test/httpd");
		srv = startServerAsync(port, dir);
		if(prefs.notify)
		{
			require("notifications").notify({
				title: "DivHTTP",
				text: "Server started and listening",
				iconURL: data.url("divhttp64.png")

			});
		}
		panel.port.emit("stopUI");
		require("sdk/system/unload").when(function cleanup() {
		  srv.stop(function() { 
			//System power-off
		  });
		});

	});
	panel.port.on("stopServer",function(){
		srv.stop(function(){
			//User power-off
			if(prefs.notify)
			{
				require("notifications").notify({
					title: "DivHTTP",
					text: "Server stoped",
					iconURL: data.url("divhttp64.png")
				});
			}
			panel.port.emit("startUI",prefs.defdir,prefs.defport);
		});
	});




}
