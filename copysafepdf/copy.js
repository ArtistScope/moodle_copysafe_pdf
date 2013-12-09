var config=new Array();
var l = window.location;
var base_url = l.protocol + "//" + l.host + "/" + l.pathname.split('/')[1];
var base_urls = l.protocol + "//" + l.host + "/";
var wpcsw_plugin_url = base_url+"/mod/copysafepdf/" ;
var wpcsw_upload_url = "./mod/copysafepdf/copysafepdfimage/";
var m_szImageFolder = "./mod/copysafepdf/copysafepdfimage/";
$(document).ready( function() {
var ajaxdata = {
action		: 'wpcsw_ajaxprocess',
fucname	: 'get_config', 
filename	: ''
};
$.post(base_url+'/mod/copysafepdf/function.php', ajaxdata, function( param ) {
    
param=param.split('~');
var obj  = $.parseJSON( param[0] );
$.each(obj, function(key, value) {
//alert(key + ' ' + value);
config[key]=value;
});
wpcsw_plugin_url = param[1] ;
wpcsw_upload_url = param[2] ;
m_szImageFolder = param[2];
              
var urll=$("#url").val();
var res=new Array();
var ress=new Array();
//var $matchess=$("div.no-overflow").filter(function() {
var $matches=$("div.no-overflow em").filter(function() {
var str=$(this).text();
var bgwidth=str.substring(str.indexOf("bgwidth=")+9);
bgwidth=bgwidth.substring(0,bgwidth.indexOf("\'"));
var bgheight=str.substring(str.indexOf("bgheight=")+10);
bgheight=bgheight.substring(0,bgheight.indexOf("\'"));
var prints_allowed=str.substring(str.indexOf("prints_allowed=")+16);
prints_allowed=prints_allowed.substring(0,prints_allowed.indexOf("\'"));
var print_anywhere=str.substring(str.indexOf("print_anywhere=")+16);
print_anywhere=print_anywhere.substring(0,print_anywhere.indexOf("\'"));
var allow_capture=str.substring(str.indexOf("allow_capture=")+15);
allow_capture=allow_capture.substring(0,allow_capture.indexOf("\'"));
var allow_remote=str.substring(str.indexOf("allow_remote=")+14);
allow_remote=allow_remote.substring(0,allow_remote.indexOf("\'"));
var background=str.substring(str.indexOf("background=")+12);
background=background.substring(0,background.indexOf("\'"));
var language=str.substring(str.indexOf("language=")+10);
language=language.substring(0,language.indexOf("\'"));
var spanclass=$(this).attr('class');
var res1=str.substring(16);
var rest=res1.substring(0,res1.indexOf("\'"));
if(rest!='')
var value=insertcopysafepdf(rest,bgwidth,bgheight,prints_allowed,print_anywhere,allow_capture,allow_remote,background,language);
//$(".no-overflow").html(value);
$("em."+spanclass).html(value);
$(this).text().indexOf('[copysafe name=\''+rest) > -1;
});
//});


});  
});



<!-- hide JavaScript from non-JavaScript browsers

	//  WP Copysafe Pdf - Version 4.7.1.0
	//  Copyright (c) 1998-2012 ArtistScope. All Rights Reserved.
	//  www.artistscope.com
	//
	// The Copysafe Plugin is supported across all Windows since XP
	//
	// Special JS version for Wordpress

// Debugging outputs the generated html into a textbox instead of rendering
//	option has been moved to wp-copysafe-web.php

// REDIRECTS
 var wpcsw_plugin_url = wpcsw_plugin_url ;
 var wpcsw_upload_url = wpcsw_upload_url ;

// hide JavaScript from non-JavaScript browsers
		

		var m_bpDebugging = 1;
		var m_szMode = "licensed";
		var m_szImageFolder = m_szImageFolder;		//  path from root with / on both ends
		var m_bpPrintsAllowed = 0;
		var m_bpPrintAnywhere = 0;
		var m_bpAllowCapture = 0;
		var m_bpAllowRemote = 0;
                var m_bpLanguage = "" ;
                var m_bpBackground  = 'CCCCCC';
                var m_bpWidth = 600;				// width of PDF display in pixels
		var m_bpHeight = 600;
		var m_bpWindowsOnly = true;
		var m_bpProtectionLayer = false;		//this page does not use layer control

		var m_bpChrome = 0;	
		var m_bpFx = 0;			// all firefox browsers from version 5 and later
		var m_bpNav = 0;
		var m_bpOpera = 0;
		var m_bpSafari = 0;
		var m_bpMSIE = 0;




	
var m_szLocation = document.location.href.replace(/&/g,'%26');	
var m_szDownloadNo = wpcsw_plugin_url + "download_no.php";
var m_szDownload = wpcsw_plugin_url + "download.php?ref=" + m_szLocation;
var m_szDownloadIE = m_szDownloadFX = m_szDownload ;

function testCSS(prop) {
    return prop in document.documentElement.style;
}

//if (m_bpDebugging == true)
//	{
//	document.write("UserAgent= " + m_szAgent + "<br>");
//	document.write("Browser= " + m_szBrowserName + "<br>");
//	document.write("Platform= " + m_szPlatform + "<br>");
//	document.write("Referer= " + m_szLocation + "<br>");
//    }




function bool2String(bValue)
{
    if (bValue == true) {return "1";}
    else {return "0";}
}

function paramValue(szValue, szDefault)
{
    if (szValue.toString().length > 0) {return szValue;}
    else {return szDefault;}
}

function expandNumber(nValue, nLength)
{
    var szValue = nValue.toString();
    while(szValue.length < nLength)
        szValue = "0" + szValue;
    return szValue;
}


// The copysafe-insert functions

function insertcopysafepdf(rest,bgwidth,bgheight,prints_allowed,print_anywhere,allow_capture,allow_remote,background,language)
{

                m_bpDebugging = parseInt(config['CopysafePdf_mode']);
		m_szMode = "licensed";
		m_szImageFolder = m_szImageFolder;		//  path from root with / on both ends
		m_bpPrintsAllowed = prints_allowed;
		m_bpPrintAnywhere = print_anywhere;
		m_bpAllowCapture = allow_capture;
		m_bpAllowRemote = allow_remote;
                m_bpLanguage = config['CopysafePdf_language'];
                m_bpBackground  = background;
                m_bpWidth = bgwidth;				// width of PDF display in pixels
		m_bpHeight = bgheight;
		m_bpWindowsOnly = true;	
		m_bpProtectionLayer = false;		//this page does not use layer control


		m_bpChrome = parseInt(config['CopysafePdf_allowchrome']);	
		m_bpFx = parseInt(config['CopysafePdf_allowfirefox']);			// all firefox browsers from version 5 and later
		m_bpNav = parseInt(config['CopysafePdf_allownavigator']);
		m_bpOpera = parseInt(config['CopysafePdf_allowopera']);
		m_bpSafari = parseInt(config['CopysafePdf_allowsafari']);
		m_bpMSIE = parseInt(config['CopysafePdf_allowie']);

            	
           
                
//====================================================
//   Current version == 3.0.5.1
//====================================================

var m_nV1=3;
var m_nV2=0;
var m_nV3=5;
var m_nV4=1;

//===========================
//   DO NOT EDIT BELOW 
//===========================

var m_szAgent = navigator.userAgent.toLowerCase();
var m_szBrowserName = navigator.appName.toLowerCase();
var m_szPlatform = navigator.platform.toLowerCase();
var m_bNetscape = false;
var m_bMicrosoft = false;
var m_szPlugin = "";

var m_bWin64 = ((m_szPlatform == "win64") || (m_szPlatform.indexOf("win64")!=-1) || (m_szAgent.indexOf("win64")!=-1));
var m_bWin32 = ((m_szPlatform == "win32") || (m_szPlatform.indexOf("win32")!=-1));
var m_bWin2k = ((m_szAgent.indexOf("windows nt 5.0")!=-1) || (m_szAgent.indexOf("windows 2000")!=-1));
var m_bWinxp = ((m_szAgent.indexOf("windows nt 5.1")!=-1) || (m_szAgent.indexOf("windows xp")!=-1));
var m_bWin2k3 = (m_szAgent.indexOf("windows nt 5.2")!=-1);	
var m_bVista = (m_szAgent.indexOf("windows nt 6.0")!=-1);
var m_bWindows7 = (m_szAgent.indexOf("windows nt 6.1")!=-1);
var m_bWindows8 = ((m_szAgent.indexOf("windows nt 6.2")!=-1) || (m_szAgent.indexOf("windows nt 6.3")!=-1));
var m_bWindows = (((m_bWin2k) || (m_bWinxp) || (m_bWin2k3) || (m_bVista) || (m_bWindows7) || (m_bWindows8)) && ((m_bWin32) || (m_bWin64)));

var m_bOpera = ((m_szAgent.indexOf("opera")!=-1) && !!(window.opera && window.opera.version) && (m_bpOpera));
var m_bFx3 = ((m_szAgent.indexOf("firefox/3.")!=-1) && (m_szAgent.indexOf("flock")==-1) && (m_szAgent.indexOf("navigator")==-1));
var m_bFx4 = ((m_szAgent.indexOf("firefox/4.")!=-1) && (m_szAgent.indexOf("flock")==-1) && (m_szAgent.indexOf("navigator")==-1));
var m_bFirefox = ((m_szAgent.indexOf("firefox")!=-1) && testCSS("MozBoxSizing") && (!(m_bFx3)) && (!(m_bFx4)) && (m_bpFx));

var m_bSafari = ((m_szAgent.indexOf("safari")!=-1) && Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 && (m_bpSafari));
var m_bChrome = ((m_szAgent.indexOf("chrome")!=-1) && !!(window.chrome && chrome.webstore && chrome.webstore.install) && (m_bpChrome));
var m_bNav = ((m_szAgent.indexOf("navigator")!=-1) && (m_bpNav));

var m_bNetscape = ((m_bChrome) || (m_bFirefox) || (m_bNav) || (m_bOpera) || (m_bSafari));
var m_bMicrosoft = (((m_szAgent.indexOf("msie")!=-1) || (m_szAgent.indexOf("trident")!=-1)) && (m_bpMSIE)); 

function CopysafePDFVersionCheck()
	{
		var v = typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && typeof document.createElement != "undefined";
		var AC = [0,0,0];
		var x = "";

        if (typeof navigator.plugins != "undefined" && navigator.plugins.length > 0)
        {
	        // Navigator, firefox, mozilla

		navigator.plugins.refresh(false);

		var szDescription = "CopySafe PDF Reader";
		var szVersionMatch = "Reader v";

		if (typeof navigator.plugins[szDescription] == "object")
	        {
	            x = navigator.plugins[szDescription].description;
	            ix = x.indexOf(szVersionMatch);
	            if (ix > -1)
	            	x = x.slice(ix + szVersionMatch.length);
	            else
	            	x = "";
	        }
		}
		else if (typeof window.ActiveXObject != "undefined")
		{
			// Internet explorer

			var y = null;

			try
			{
				y = new ActiveXObject("ARTISTSCOPE.PDFReaderWebCtrl")
                x = y.GetVersion();
			}
			catch(t)
			{
			}
		}

		if (x.length > 0)
		{
           	ix1 = x.indexOf(".");
           	ix2 = x.indexOf(".", ix1 + 1);

           	if (ix1 != -1 && ix2 != -1)
           	{
            	AC[0] = parseInt(x.slice(0, ix1));
            	AC[1] = parseInt(x.slice(ix1 + 1, ix2));
            	AC[2] = parseInt(x.slice(ix2 + 1));
           	}
		}

        return AC;
	}

var arVersion = CopysafePDFVersionCheck();
var szNumeric = "" + arVersion[0] + "." + arVersion[1] + "." + arVersion[2];
	

if ((m_bWindows) && (m_bMicrosoft))
	{
	m_szPlugin = "OCX";
	if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3))
		{
		window.location=unescape(m_szDownloadIE);
		document.MM_returnValue=false;
		}
	}
else if ((m_bWindows) && (m_bNetscape))
	{
	m_szPlugin = "DLL";
//	if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3))
//		{
//		window.location=unescape(m_szDownloadFX);
//		document.MM_returnValue=false;
//		}
	}
else
	{
	window.location=unescape(m_szDownloadNo);
	document.MM_returnValue=false;
	}


    return insertCopysafePdfs(bgwidth, bgheight,rest,m_szPlugin);
   
}

function insertCopysafePdfs(bgwidth, bgheight,arFrames,m_szPlugin)
{

  var res='';
	if (m_bpDebugging == 2)
        { 
        res+="<textarea rows='27' cols='80'>"; 
        } 

    if ((m_szPlugin == "DLL") || (m_szPlugin == "OCX"))
    {
    var szObjectInsert = "";
    

    if (m_szPlugin == "DLL")
    {      
    	szObjectInsert = "type='application/x-artistscope-pdfreader5' codebase='" + wpcsw_plugin_url +"download.php' ";
       res+="<ob" + "ject " + szObjectInsert + " width='" + bgwidth + "' height='" + bgheight + "'>";
        if (m_bpProtectionLayer) {
        res+="<param name='ProtectionActivated' value='OnProtectionActivated()' />";
	 }
    }
    else if (m_szPlugin == "OCX")
    {
         szObjectInsert = "classid='CLSID:DEC3C469-DD45-4C0C-8328-4C48507D9B25'";
        res+="<ob" + "ject id='csviewer' " + szObjectInsert + " width='" + bgwidth + "' height='" + bgheight + "'>";
    }

    res+="<param name='Document' value='" + m_szImageFolder + arFrames +"' />";
    res+="<param name='PrintsAllowed' value='" + m_bpPrintsAllowed + "' />";
    res+="<param name='PrintAnywhere' value='" + m_bpPrintAnywhere + "' />";
    res+="<param name='AllowCapture' value='" + m_bpAllowCapture + "' />";
    res+="<param name='AllowRemote' value='" + m_bpAllowRemote + "' />";
    res+="<param name='Background' value='" + m_bpBackground + "' />";
    res+="<param name='Language' value='" + m_bpLanguage + "' />";


    if (m_bpDebugging == 0){
  res="<img src='" + m_szImageFolder +"image_placeholder.jpg' width='300px' height='300px' />";
    }


    res+="</ob" + "ject />"; 

    if (m_bpDebugging == 2)
        { res+="</textarea />"; }
    }
return res;


   
}
// -->






