$(document).ready(function() {

	$('textarea').on('change paste keyup',function(){
	    updateCounter(this);
	});
	
			$(".navtoggle").click(function() {
				$(".mainnav").toggle("slow");
				$(".navtoggle").toggle("slow");
				$(".navtoggleclose").toggle("slow");
				$(".navbutton").toggle("slow");
			});

			$(".navtoggleclose").click(function() {
				$(".mainnav").toggle("slow");
				$(".navtoggle").toggle("slow");
				$(".navbutton").toggle("slow");
				$(".navtoggleclose").toggle("slow");
			});

			$(window).resize(
					function() {
						$(".ui-dialog-content").dialog("option", "position",
								[ 'center', 'center' ]);
					});

		
			function getCookie(cname) {
			    var name = cname + "=";
			    var ca = document.cookie.split(';');
			    for(var i=0; i<ca.length; i++) {
			        var c = ca[i];
			        while (c.charAt(0)==' ') c = c.substring(1);
			        if (c.indexOf(name) == 0) {
			        	name = c.substring(name.length, c.length);
			        	return name.replace(/\+/g,' ');
			        }
			    }
			    return "";
			}
			
		 var user=getCookie("loggedinuser");
		 console.log("user:->"+user);
		 
		 
	 if(user!="")	 
	 {
	    $("#usernamelable").text(user.substring(0, 5)+".."); 
		$("#notloggedin").hide(); 
		$("#loggedin").show();
		loadJs("dropdown");
	  }else{
			 check_login();
	  }
				
	  //changing css for base64 for supported for IE.
	 
		 if(msieversion() ||  navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || /Edge\/\d./i.test(navigator.userAgent)){
			 $('.cblogoimage').prepend('<img src="/img/codebeautify_logo.png" alt="Code Beautify" />');
		 }
		 
	});

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
        return true
    else                 // If another browser, return 0
        return false;

 return false;
}


var globalurl = "/";


function loadJs(jsName){
	 var script = document.createElement('script');
	 	script.type = 'text/javascript';
	 	script.src = globalurl+"js/"+jsName+".js";
	 	 script.onload = function () {
             console.log('Loaded script');
             console.log(this);
         };
	    document.head.appendChild(script);
}

function redirect(url) {
	window.location = "/" + url;
}

$(document).ajaxSend(function(event, jqxhr, settings) {

	if (settings.url != "/service/check_url") {
		if (settings.url != "/service/wordcount" && settings.url != "/service/saveKeywordHistory") {
			showProgress();
		} else {
			$("#counterLoader").show();
		}

	}
});

$(document).ajaxComplete(function(event, jqxhr, settings) {

	if (settings.url != "/service/wordcount") {
		hideProgress();
		$("#path").val("");
	} else {
		$("#counterLoader").hide();
	}
});
var spinnerVisible = false;

function showProgress() {

	$(".some_other_box").css({
		width : 0,
		'display' : 'block'
	});
	$(".some_other_box").animate({
		width : "90%",
		display : "block",

	}, 1000);
};
function hideProgress() {

	$(".some_other_box").animate({
		width : "100%",
		display : "none",
	}, 1000, function() {
		$(this).hide();
	});
};

function openFile(btnID, fileExt) {
	
	new AjaxUpload($('#' + btnID), {
		action : globalurl + "readfile/uploadFile",
		name : 'userfile',
		onSubmit : function(file, ext1) {
			if($('[name="userfile"]')[0].files[0] == undefined){
				openErrorDialog("Something went wrong Please refresh page");
				return false;
			}
			var size = $('[name="userfile"]')[0].files[0].size;
			if(size > 1000000){
				openErrorDialog("File size is not supported more 1MB");
				return false;
			}
			
			var ext = ext1[0];
			if (fileExt == "Excel") {
				if (ext.trim() == 'xls' || ext.trim() == 'xlsx') {
				} else {
					openErrorDialog("Selected file is not Excel File");
					return false;
				}
			} else if (fileExt != "any" && fileExt != ext && ext.trim() != "txt") {

				openErrorDialog("Selected file is not " + fileExt + " and txt file");
				return false;
			} else if (fileExt == "any") {

				if (ext == "jpeg" || ext == "png" || ext == "jpg"
						|| ext == "gif" || ext == "bmp" || ext == "pdf"
						|| ext == "pptx" || ext == "ppt") {
					openErrorDialog("Selected file is not supported");
					return false;
				}
			}

			showProgress();

		},
		onComplete : function(file, response) {

			if (response != 'error') {

				readFile(response, btnID);
			} else {
				openErrorDialog("Error in Loading File.");
			}

			hideProgress();

		}
	});

}
function readFile(fName, btnID) {

	var url = "readfile/readFile";

	if (btnID == "excelTohtml" || btnID == "excelToxml" || btnID == "excelTojson") {
		url = "readfile/convertHTML";
		$("#fName").text(fName);
	}

	$.ajax({
		type : "post",
		url : globalurl + url,
		data : {
			fileName : fName
		},
		success : function(response) {
			
			if (response != 'error') {
				
				if(btnID == "excelToxml"){
					excelTOXml(response);
					return false;
				}
				else if(btnID == "excelTojson"){
					excelToJson(response);
					return false;
				}
				else if(btnID == "excelTohtml"){
					htmlOutput(response);
					return false;
				}
				else if (btnID == "F2") {
					setFileName(2, fName);
					setToEditor2(response);
					return false;
				} else if (btnID == "F1") {
						setFileName(1, fName);
				}
				setToEditor(response);
		
			} else {
				openErrorDialog("Error in Loading File.");
				$("#fName").text("");
			}
		},
		error : function(e, s, a) {
			openErrorDialog("Failed to load data=" + s);
			$("#fName").text("");
		}
	});
}

function openFileImage(btnID, fileExt) {

	new AjaxUpload($('#' + btnID), {
		action : globalurl + "convter/convertToBase64",
		name : 'userfile',
		onSubmit : function(file, ext1) {
			var ext = ext1[0];

			if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "gif"
					|| ext == "bmp" || ext == "psd") {
				showProgress();
				return true;
			} else {
				openErrorDialog("Please Select Image File Only...!");
				return false;
			}

		},
		onComplete : function(file, response) {

			if (response != 'error' && response.search("Filename") == -1) {
				// console.log(response);
				$("#baseConvertImage").prop('src', response);
				$("#baseConvertImage").removeClass("baseurlopa").addClass(
						"baseurlopa1");

				$("#baseConvertImageTag").val("<img src='" + response + "'/>");
				$("#baseConvertImageCSS").val(
						"background-image: url(" + response + ")");
				
				$("#base64String").val(response.split('base64,')[1]);
				
				$("#allcontents").css("display", 'Block');
				$("#allcontents").css("margin", ' 53px 0px 0px');
				
			} else {
				openErrorDialog("Error in Loading File.");
			}

			hideProgress();

		}
	});

}

function getDataFromUrlId(urlid) {
	$.ajax({
		type : "post",
		url : globalurl + "service/getDataFromID",
		dataType : "text",
		data : {
			urlid : urlid
		},
		success : function(response) {
			setToEditor(response.trim());
			$(".sharelinkurl").attr("st_url", window.location);
			$(".sharelinkurl").attr("st_title", $("#save_link_title").val());
		},
		error : function(e, s, a) {
			openErrorDialog("Failed to load data=" + s);

		}
	});
}

function convertToCSV(typedata) {
	var content = editorAce.getValue();
	var validXML = true;
	if (content.trim().length > 0) {
		var data = "";
		if (typedata == 'xml') {
			data = editorAce.getValue();

		} else if (typedata == 'json') {
			var obj = editorAce.getValue();
			var xotree = new XML.ObjTree();
			data = xotree.writeXML(JSON.parse(obj));

		}

		if (validXML) {
			$.ajax({
				type : "post",
				url : globalurl + "convter",
				data : {
					type : 'xml2csv',
					data : data
				},
				success : function(response) {
					var blob = new Blob([ "" + response + "" ], {
						type : "text/plain;charset=utf-8"
					});
					if (typedata == 'xml') {
						saveAs(blob, "xml2csv.csv");
					} else if (typedata == 'json') {
						saveAs(blob, "json2csv.csv");
					}

				},
				error : function(e) {
					openErrorDialog("Failed to Convert into CSV");
				}
			});
		}
	}

}

function clearEditorInput() {

	// this is for jsvalidate to clear textarea
	$("#jsData").val('');

	// this is for cssvalidate to clear textarea
	$("#cssData").val("");

	// this is for wordcounter to clear textarea
	$("#tData").val('');

	if (typeof editorAce != 'undefined') {
		editorAce.setValue("");
	}

	if (typeof editorResult != 'undefined') {
		editorResult.setValue("");
	} else {
		$("#result1").html("");
		$("#result").text("");
	}

	$("#result1").html("");
	if (typeof editor != 'undefined') {
		if (typeof editor.set != 'undefined') {
			editor.set();
		}
	}

	var old;
	if (old != undefined) {
		var result1 = document.getElementById("result1");
		var d = result1.contentWindow.document;
		old = "";
		d.open();
		d.write("");
		d.close();
	}

	$("#outputMsg").html("Result");

}

function setOutputMsg(msg) {
	$("#outputMsg").html("Result : " + msg);
}

function openErrorDialog(msg) {
	$('<div></div>').appendTo('#openError').html('<div>' + msg + '</h5></div>')
			.dialog({
				modal : true,
				title : "Message",
				zIndex : 10000,
				autoOpen : true,
				width : '400',
				resizable : false,
				buttons : {
					Ok : function() {
						$(this).dialog('destroy');
					}
				}
			});
}


function detectHtmlTags(scripttext) {
	var htmlTagRegexp = new RegExp(
			'</?(?:article|aside|bdi|command|'
					+ 'details|dialog|summary|figure|figcaption|footer|header|hgroup|mark|'
					+ 'meter|nav|progress|ruby|rt|rp|section|time|wbr|audio|'
					+ 'video|source|embed|track|canvas|datalist|keygen|output|'
					+ '!--|!DOCTYPE|a|abbr|address|area|b|base|bdo|blockquote|body|'
					+ 'br|button|canvas|caption|cite|code|col|colgroup|dd|del|dfn|div|'
					+ 'dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|'
					+ 'h5|h6|head|hr|html|i|iframe|img|input|ins|kdb|keygen|label|legend|'
					+ 'li|link|map|menu|meta|noscript|object|ol|optgroup|option|p|param|'
					+ 'pre|q|s|samp|select|small|source|span|strong|style|sub|'
					+ 'sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|u|ul|var|'
					+ 'acronym|applet|basefont|big|center|dir|font|frame|'
					+ 'frameset|noframes|strike|tt)(?:(?: [^<>]*)>|>?)', 'i');

	console.log(scripttext.match(htmlTagRegexp));

	if (scripttext.match(htmlTagRegexp)) {
		return true;
	} else {
		return false;
	}
}

function getjs(scripttext) {
	var re = /<script.*?>([\s\S]*?)<\/script>/gmi;

	var match;
	var js = "";

	while (match = re.exec(scripttext)) {

		console.log(match[1]);
		js = js + match[1];
	}

	return js;
}
function randomFileName(len, charSet) {
	charSet = charSet
			|| 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var fileName = '';
	for ( var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		fileName += charSet.substring(randomPoz, randomPoz + 1);
	}
	return fileName;
}

var fsr = 0;
function fullScreenLeft() {

	$(".leftThum").hide();
	$(".rightThum").hide();

	if (fsr == 0) {

		fsr = 1;

		$("#fsimg").attr('src', '/img/fsout.png');
		$("#fsimg").attr('title', 'Small Screen');

		$("#mainRightDiv").hide();
		$("#mainLeftDiv").addClass('mainDivLeft');
		$("#editor").css({
			'width' : '100%'
		});
		$("#buttonDiv").css({
			'float' : 'right'
		});

		if (typeof editorResult != 'undefined') {
			editorResult.getSession().setUseWrapMode(false);
		}
		
		hideOtherArea(true);

	} else {
		fsr = 0;
		$("#fsimg").attr('src', '/img/fsin.png');
		$("#fsimg").attr('title', 'Full Screen');

		$("#mainRightDiv").show();
		$("#mainLeftDiv").removeClass('mainDivLeft');
		$("#editor").css({
			'width' : '100%'
		});
		$("#buttonDiv").css({
			'float' : 'left'
		});

		if (typeof editorResult != 'undefined') {
			editorResult.getSession().setUseWrapMode(true);
			var data = editorResult.getValue();
			editorResult.setValue(data);

		}
		hideOtherArea(false);
	}

	if (typeof editorResult != 'undefined') {
		editorResult.resize();
	}
	if (typeof editorAce != 'undefined') {
		editorAce.resize();
	}
}

function hideOtherArea(flag){
	if(flag == true){
		// $(".headerEditorContainer").hide();
		// $(".mainheader").hide();
		$(".infoSection").hide();
		$(".footerpart").hide();
		$(".footerSection").hide();
		$("#buttonDiv").hide();
		// $(".navbar-fixed-top").hide();
		$(".buttonSection").hide();
	}
	else{
		// $(".headerEditorContainer").show();
		// $(".mainheader").show();
		$(".infoSection").show();
		$(".footerpart").show();
		$(".footerSection").show();
		$("#buttonDiv").show();
		// $(".navbar-fixed-top").show();
		$(".buttonSection").show();
	}
}

var fsr1 = 0;
function fullScreenRight() {

	$(".leftThum").hide();
	$(".rightThum").hide();

	if (fsr1 == 0) {

		fsr1 = 1;
		$("#fs1img").attr('src', '/img/fsout.png');
		$("#fs1img1").attr('title', 'Small Screen');

		$("#mainLeftDiv").hide();
		$("#mainRightDiv").addClass('mainDivLeft');
		$("#result").css({
			'width' : '100%'
		});
		$("#mainRightDiv").css({
			'float' : 'right'
		});

		if (typeof editorResult != 'undefined') {
			editorResult.getSession().setUseWrapMode(false);
		}
		
		hideOtherArea(true);

	} else {
		fsr1 = 0;
		$("#fs1img").attr('src', '/img/fsin.png');
		$("#fs1img").attr('title', 'Full Screen');

		$("#mainLeftDiv").show();
		$("#mainRightDiv").removeClass('mainDivLeft');
		$("#result").css({
			'width' : '100%'
		});
		$("#mainRightDiv").css({
			'float' : 'right'
		});

		if (typeof editorResult != 'undefined') {
			editorResult.getSession().setUseWrapMode(true);
		}
		hideOtherArea(false);
	}

	if (typeof editorResult != 'undefined') {
		editorResult.resize();
	}
	if (typeof editorAce != 'undefined') {
		editorAce.resize();
	}
}

var aefsr = 0;
function fullScreen(){
	 
	if (aefsr == 0) {

		aefsr = 1;
		$("#aefsimg").attr('src', '/img/fsout.png');
		$("#aefsimg").attr('title', 'Small Screen');

		$("#editorAll").removeClass('span10');
		$("#editorAll").addClass('span12');

		if (typeof editorAce != 'undefined') {
			editorResult.getSession().setUseWrapMode(false);
		}
		
		hideOtherArea(true);

	} else {
		aefsr = 0;
		$("#aefsimg").attr('src', '/img/fsin.png');
		$("#aefsimg").attr('title', 'Full Screen');
 
		$("#editorAll").removeClass('span12');
		$("#editorAll").addClass('span10');
		 
		if (typeof editorAce != 'undefined') {
			editorResult.getSession().setUseWrapMode(true);
		}
		hideOtherArea(false);
	}

	if (typeof editorResult != 'undefined') {
		editorResult.resize();
	}
	if (typeof editorAce != 'undefined') {
		editorAce.resize();
	}
}

$(document).ready(function() {

	$('.close1').click(function() {
		$(".ui-dialog-content").dialog("destroy");
	});

	$(".btn,.span11").on('click', function() {

		// fsr1==1 means right side div on full screen mode
		if (fsr1 == 1) {
			fullScreenRight();
		}

		// fsr==1 means left side div on full screen mode
		else if (fsr == 1) {
			fullScreenLeft();
		}
	});
});

function changeLeftDiv() {

	$("#editor").css({
		'width' : '20%'
	});
	$("#mainLeftDiv").css({
		'width' : '20%'
	});
	$("#mainRightDiv").css({
		'width' : '60%'
	});

	$("#result").css({
		'width' : '58%'
	});

	if (typeof editorResult != 'undefined') {
		editorResult.getSession().setUseWrapMode(true);
		var data = editorResult.getValue();
		editorResult.setValue(data);
	}
}

function changeRightDiv() {

	$("#editor").css({
		'width' : '58%'
	});
	$("#mainLeftDiv").css({
		'width' : '60%'
	});
	$("#mainRightDiv").css({
		'width' : '20%'
	});

	$("#result").css({
		'width' : '20%'
	});

	if (typeof editorResult != 'undefined') {
		editorResult.getSession().setUseWrapMode(true);
		var data = editorResult.getValue();
		editorResult.setValue(data);
	}
}

function normalScreen() {

	$("#editor").css({
		'width' : '100%'
	});

	$("#result").css({
		'width' : '100%'
	});

	$("#mainLeftDiv").css({
		'width' : '100%'
	});
	$("#mainRightDiv").css({
		'width' : '100%'
	});

}

// Login

// login dialog
function login(msg) {

	if (msg == undefined) {
		$("#logFail").text("");

		$("#username_txt1").val("");
		$("#email_txt1").val("");
		$("#pass_txt1").val("");
		$("#pass_txt").val("");
		$("#email_txt").val("");

		$("#signinDiv").show();
		$("#signupDiv").hide();
	} else {
		$("#logFail").text(msg);
	} 

	$("#customLogin").dialog({
		modal : true,
		width : "auto",
		draggable : false,
		height : "auto",
		title : "LOGIN",
		autoOpen : true,
		resizable : false,
	});
	$(".ui-dialog-titlebar-close").hide();
	$(".ui-dialog .ui-dialog-titlebar").hide();

}

// custom login
function customLogin() {
	var email = $("#email_txt").val();
	var pass = $("#pass_txt").val();
	if (email.trim() == "" || pass.trim() == "") {
		openErrorDialog("Please Enter the Email and Password");
		return false;
	} else {
		$("#logFail").text("");
		$("#customLogin").dialog('destroy');
		$.ajax({
			url : "/service/login",
			dataType : "text",
			type : "post",
			data : {
				email : email,
				password : pass,
			},
			success : function(response) {

				if (response == "success") {
					location.reload();
				} else {
					var msg = "Invalid username and password";
					login(msg);
				}

			},
			error : function(e, s, a) {

				openErrorDialog("Failed to Login Pls Try Again");

			}
		});
	}
}

// sign up with codebeautify
function customSignup() {
	var email = $("#email_txt1").val();
	var password = $("#pass_txt1").val();
	var username = $("#username_txt1").val();
	if (email.trim() == "" || password.trim() == "" && username.trim() == "") {
		openErrorDialog("Please Enter the required information");
		return false;
	} else {
		$("#logFail").text("");
		$("#customLogin").dialog('destroy');
		$.ajax({
			url : "/service/signup",
			dataType : "text",
			type : "post",
			data : {
				username : username,
				email : email,
				password : password
			},
			success : function(response) {

				if (response == "success") {
					location.reload();
				} else if (response.trim() == "duplicateEmail") {
					var msg = "Email Id is already registered....";
					login(msg);
				} else {
					var msg = "Failed to Create an Account, Pls Try Again";
					login(msg);
				}

			},
			error : function(e, s, a) {

				openErrorDialog("Failed to Login, Pls Try Again");

			}
		});
	}
}


function signupView() {
	$("#signinDiv").hide();
	$("#signupDiv").show();
}

function checkEmail(id) {
	if ($("#" + id).val() != null && $("#" + id).val() != "") {
		var email = document.getElementById(id);
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!filter.test(email.value)) {
			$("#logFail").text('Please provide a valid email address');
			$("#" + id).focus();
		} else {
			$("#logFail").text('');
		}
		return false;
	}
}

function ylogin() {
	$("#yloginsection").dialog({
		modal : true,
		title : "Why you need to Login Or Register ?",
		zIndex : 10000,
		autoOpen : true,
		width : 'auto',
		resizable : false,

	});
}

function editLink() {
	$.ajax({
		url : "/service/updateSaveLink",
		dataType : "text",
		type : "post",
		data : {
			id : $("#edit_link_id").val(),
			title : $("#save_link_title").val(),
			desc : $("#save_link_description").val(),
			urlid : $("#fContent").val()
		},
		success : function(response) {

			if (response == "success") {
				openErrorDialog("Successfully Updated");
				location.reload();
			} else {
				openErrorDialog("Error in Update");
			}
		},
		error : function(e, s, a) {

			openErrorDialog("Error in Update");

		}
	});
}

function deleteSavelink(id) {

	$('<div></div>').appendTo('#openError').html(
			'<div>Do you want to Delete..?</h5></div>').dialog({
		modal : true,
		title : "Confirm Delete",
		zIndex : 10000,
		autoOpen : true,
		width : '30%',
		resizable : false,
		buttons : {
			Delete : function() {

				$.ajax({
					url : "/service/deleteSaveLink",
					dataType : "text",
					type : "post",
					data : {
						id : id,
						urlid : $("#fContent").val(),
						viewname : $("#viewName").val()
					},
					success : function(response) {

						if (response == "success") {
							// openErrorDialog("Successfully Deleted");
							location.reload();
						} else {
							openErrorDialog("Error in Delete");
						}
					},
					error : function(e, s, a) {

						openErrorDialog("Error in Delete");

					}
				});

				$(this).dialog('destroy');
			},
			Close : function(event, ui) {
				$("#openError").html('');
				$(this).dialog('destroy');
			}
		},
	});
}

// open any file from url
function loadAnyFileFromUrl(storeID) {
	$("#loadUrlPathDiv").dialog({
		modal : true,
		title : "Enter Url",
		zIndex : 10000,
		autoOpen : true,
		width : '400',
		resizable : false,
		buttons : {
			Load : function() {
				var path = $("#path").val();
				if (path.length > 5) {
					$.ajax({
						type : "post",
						url : "http://codebeautify.com/URLService",
						dataType : "text",
						data : {
							path : path
						},
						success : function(response) {
							$("#" + storeID).val(response);
							$("#" + storeID).focus();
						},
						error : function(e, s, a) {
							openErrorDialog("Failed to load data=" + s);
						}
					});
				}
				$(this).dialog('destroy');
			},
			Cancel : function(event, ui) {
				$("#openError").html('');
				$(this).dialog('destroy');
			}
		}
	});
}

function decodeSpecialCharacter(str) {
	return str.replace(/\&amp;/g, '&').replace(/\&gt;/g, '>').replace(/\&lt;/g,
			'<').replace(/\&quot;/g, '"');
}

function encryptDecrypt(perform) {
	var text = $("#text").val();

	if (text.trim().length > 0) {
		$.ajax({
			type : 'post',
			url : "encryptDecrypt/" + perform,
			data : {
				key : $("#key").val(),
				alg : $("#alg").val(),
				mode : $("#mode").val(),
				text : text
			},
			dataType : "text",
			success : function(response) {
				$("#result_ed").val('');
				$("#result_ed").val(response);
			},
			error : function(e, s, a) {
				openErrorDialog("Failed to Perform Operation" + s);

			}
		});
	}
}

function makeFileDiff() {

	var data_file1 = $("#file1").val();
	var data_file2 = $("#file2").val();

	if (data_file1 != null && data_file2 != null
			&& data_file1.trim().length > 0 && data_file2.trim().length > 0) {
		base = difflib.stringAsLines(data_file1);
		newtxt = difflib.stringAsLines(data_file2);
		sm = new difflib.SequenceMatcher(base, newtxt);

		opcodes = sm.get_opcodes();

		diffoutputdiv = document.getElementById("showDiff");

		diffoutputdiv.innerHTML = "";

		diffoutputdiv.appendChild(diffview.buildView({
			baseTextLines : base,
			newTextLines : newtxt,
			opcodes : opcodes,
			baseTextName : fileName1,
			newTextName : fileName2,
			contextSize : null,
			viewType : 0
		}));
		$(".diffinfo").show();
		// $("#showDiff").show();

		showOnlyDiff();
	}
}

function showOnlyDiff()// function for show only differnce for file-diff tool
{
	if ($("#showonlydiff").is(':checked')) {
		$(".diff tbody tr td.equal").parent().hide();
	} else {
		$(".diff tbody tr td.equal").parent().show();
	}

}

function postTofb() {
	var user = $("#fbUserName").text();
	if (user != null && user != 'Sign in') {
		showProgress();
		$
				.ajax({
					url : '/hauth/postTOFacebook',
					type : 'post',
					data : {
						link : $("#fblink").text(),
						viewname : $("#	").text()
					},
					success : function(res) {
						if (res == "fail") {
							openErrorDialog("Please Login to Facebook :<a href='/hauth/login/Facebook'>Login Facebook</a>");
						} else {
							openErrorDialog("Successfully post to facebook");
						}
						hideProgress();
					}
				});
	} else {
		openErrorDialog("Please Login to Facebook :<a href='/hauth/login/Facebook'>Login Facebook</a>");
	}
}

function openPostToFbDialog() {

	$("#shareDiv").html($("#shareLinksOption").html());

	$("#shareDiv span.stButton").css({
		"margin-right" : "1px",
		"margin-top" : "18px",
		"width" : "135px"
	});

	$("#fbpost").dialog({
		modal : true,
		title : "Share Post",
		zIndex : 10000,
		autoOpen : false,
		width : '50%',
		resizable : false,
		buttons : {
			Close : function() {
				$(this).dialog('destroy');
			}
		}
	});
}
function removeCommentsFromJs(str) {

	var uid = '_' + +new Date(), primatives = [], primIndex = 0;

	return (str
	/* Remove strings */
	.replace(/(['"])(\\\1|.)+?\1/g, function(match) {
		primatives[primIndex] = match;
		return (uid + '') + primIndex++;
	})

	/* Remove Regexes */
	.replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g,
			function(match, $1, $2) {
				primatives[primIndex] = $2;
				return $1 + (uid + '') + primIndex++;
			})

	/*
	 * - Remove single-line comments that contain would-be multi-line delimiters
	 * E.g. // Comment /* <-- - Remove multi-line comments that contain would be
	 * single-line delimiters E.g. /* // <--
	 */
	.replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')

	/*
	 * Remove single and multi-line comments, no consideration of inner-contents
	 */
	.replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')

	/*
	 * Remove multi-line comments that have a replaced ending (string/regex)
	 * Greedy, so no inner strings/regexes will stop it.
	 */
	.replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')

	/* Bring back strings & regexes */
	.replace(RegExp(uid + '(\\d+)', 'g'), function(match, n) {
		return primatives[n];
	}));

}

// test api functions
function deleteRow(tableID, row) {
	var i = row.parentNode.parentNode.rowIndex;
	document.getElementById(tableID).deleteRow(i);

	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;

	if (rowCount == 1) {
		document.getElementById(tableID).deleteRow(0);
		addRow(tableID);
	}
}
function addRow(tableID) {

	var placeHolderContent = "QueryString";
	var placeHolderValue = "Value";

	var fieldKeyName = "qsKey[]";
	var fieldValueName = "qsValue[]";
	if (tableID == 'headerTable') {
		placeHolderContent = "Content-Type";

		fieldKeyName = "hdrKey[]";
		fieldValueName = "hdrValue[]";
	}

	var table = document.getElementById(tableID);

	var rowCount = table.rows.length;

	if (rowCount > 0) {
		table.rows[rowCount - 1].cells[3].innerHTML = "<input  type='button' value='-' onclick=deleteRow('"
				+ tableID + "',this); class='btn_customsetting'>";
	}

	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
	cell1.className = "span3";
	cell1.innerHTML = cell1.innerHTML + "<input name=" + fieldKeyName
			+ " class='span12' type='text' placeholder=" + placeHolderContent
			+ ">";

	var cell2 = row.insertCell(1);
	cell2.innerHTML = cell2.innerHTML + "=";

	var cell3 = row.insertCell(2);
	cell3.className = "span9";
	cell3.innerHTML = cell3.innerHTML + "<input name=" + fieldValueName
			+ " class='span12' type='text' placeholder=" + placeHolderValue
			+ ">";

	var cell4 = row.insertCell(3);

	cell4.innerHTML = cell4.innerHTML
			+ "<input type='button' class='btn_customsetting' value='+' onclick=addRow('"
			+ tableID + "');>";

}

function getTableData(tableID) {

	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;
	var aarray = new Array();
	for ( var i = 0; i < rowCount; i++) {
		var t1 = table.rows[i].cells[0].firstElementChild.value;
		var t2 = table.rows[i].cells[2].firstElementChild.value;

		aarray[t1] = t2;
	}
	return aarray;
}

function shownewApi() {

	$("#queryStringTable").html('');
	addRow("queryStringTable");

	$("#headerTable").html('');
	addRow("headerTable");

	$("#apiData").show();
	$("#resultView").hide();

	$("#apiMethod").val('get');
	$("#cType").val('text');
	$("#apiUrl").val('');
	editorResult.setValue("");
	$("html, body").animate({
		scrollTop : 0
	}, 10);
}

function showResult() {
	$("#apiData").hide();
	editorResult.setValue(" ");
	$("#resultView").show();
}

function checkContentType() {
	var type = $("#cType").val();

	if (type == 'other') {
		$("#oCtype").show();
	} else {
		$("#oCtype").hide();
	}
}

function callApi() {

	var url = $("#apiUrl").val();

	if (url != null && url.trim().length > 8) {
		showResult();
		editorResult.setValue(" ");
		$
				.ajax({
					type : $("#apiMethod").val(),
					url : "/service/testAPI",
					data : $("#apiForm").serialize(),
					dataType : 'json',
					success : function(data) {

						setToEditor(data);
					},
					error : function(jqXHR, textStatus, errorThrown) {
						setErrorToEditor(
								"API Url content error or may not use cross domain request",
								"html");
					}
				});
	} else {
		openErrorDialog("Please Enter Url");
	}
}

function setLangauge() {
	var lang = $("#editorLanguage").val();
	editorAce.getSession().setMode("ace/mode/" + lang);
	editorAce.setOptions({
		enableBasicAutocompletion : true,
		enableSnippets : true,
		enableLiveAutocompletion : true
	});
}

/** ********start footerwitheditors js code ************ */

$(document).ready(function() {
	$("#more").click(function() {

		$('html, body').animate({
			scrollTop : $(".footer_container").offset().top
		}, 1000);
	});
	// hide #back-top first
	$("#back-top").hide();

	// fade in #back-top
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function() {
			$('body,html').animate({
				scrollTop : 0
			}, 800);
			return false;
		});
	});
});
// this for temporary to get file input on page

$(".btn").addClass("span11");

// this for temporary to get file input on page

/** ******** end footerwitheditors js code ************ */

/** ************start Footer.php js code **************** */

function downloadcode(viewname, ext) {
	// console.log("hello");
	$.ajax({
		type : "post",
		url : globalurl + "service/sampleData",
		dataType : "text",
		data : {
			viewname : viewname
		},
		success : function(response) {

			var blob = new Blob([ "" + response + "" ], {
				type : "text/plain;charset=utf-8"
			});

			var fileName = "sampleData." + ext;

			saveAs(blob, fileName);
		},
		error : function(e, s, a) {
			openErrorDialog("Failed to Download data=" + s);

		}
	});
}

$(".stButton").css({
	'display' : 'none!important'
});

/** ********** End Footer.php js code **************** */

/** **********start Load Url Js function ******************** */
function loadFromURL(view) {

	$("#loadUrlPathDiv").removeClass("hide");
	$("#loadUrlPathDiv").dialog({
		modal : true,
		title : "Enter Url",
		zIndex : 10000,
		autoOpen : true,
		width : '400',
		resizable : false,
		buttons : {
			Load : function() {
				var path = $("#path").val();
				if (path.trim().length > 5) {
					loadUrl(path);
				}
				$(this).dialog('destroy');
				$("#loadUrlPathDiv").addClass("hide");
			},
			Cancel : function(event, ui) {
				$("#openError").html('');
				$(this).dialog('destroy');
				$("#loadUrlPathDiv").addClass("hide");
			}
		}
	});

}


function loadUrl(url,view){
	$.ajax({
		type : "post",
		url : "http://codebeautify.com/URLService",
		dataType : "text",
		data : {
			path : url
		},
		success : function(response) {
			try {
				if (view == 'RSS') {

					$("#result1").rssfeed(path);

				}

				setToEditor(response);

			} catch (e) {
				console.log(e);
				openErrorDialog("Invalid " + view + " Data");

			}
		},
		error : function(e, s, a) {
			openErrorDialog("Failed to load data=" + s);

		}
	});
}
/** ********** End Load Url Js function ******************** */

/** ********************** header page javascript ****************************** */
function save(data,isShare) {
	
	
	//added this for 301 redirect to change view name
	var viewNameForLink = $("#viewName").val().trim();
	
	if(viewNameForLink=="jsonvalidate"){
		viewNameForLink = "jsonvalidator";
	}else if(viewNameForLink=="xmlvalidate"){
		viewNameForLink = "xmlvalidator";
	}
	
	
	$.ajax({
		url : "/service/save",
		dataType : "text",
		type : "post",
		data : {
			content : data,
			viewname : viewNameForLink,
			title : $("#save_link_title").val(),
			desc : $("#save_link_description").val(),
			tags : $("#save_link_tags").val().trim()
		},
		success : function(response) {
			
			

			var link = "http://" + location.host + "/"
					+ viewNameForLink + "/" + response;
			
			link = link.replace(" ", "");
			
			$("#subTitle").find('h4').remove();
			$("#permalink").find('a').remove();
			$("#subTitle").append(
					"<h4 style='padding-left:10px'>"
							+ $("#save_link_title").val() + "</h4>");
			$("#permalink").append(
					"<a href=" + link + " style='float:left;width:100%;'>"
							+ link + "</a>");
			$(".sharelinkurl").attr("st_url", link);
			$(".sharelinkurl").attr("st_title", $("#save_link_title").val());
			$("#permalink").parent().show();
			// openPostToFbDialog();
			// openErrorDialog("Pls save this link for sharing.<a
			// href="+link+">("+link+")</a>");
			
			saveToGoogle(response);
			
			if(isShare){
				//shareLink(link);
			}
		},
		error : function(e, s, a) {

			openErrorDialog("Error in data saving");

		}
	});
}

function update(data,isShare) {

	$.ajax({
		url : "/service/update",
		dataType : "text",
		type : "post",
		data : {
			id : $("#edit_link_id").val(),
			content : data,
			viewname : $("#viewName").val().trim(),
			title : $("#save_link_title").val(),
			desc : $("#save_link_description").val(),
			tags : $("#save_link_tags").val().trim(),
			urlid : $("#fContent").val()
		},
		success : function(response) {
			$("#subTitle").find('h4').remove();
			$("#permalink").find('a').remove();
			$("#subTitle").append(
					"<h4 style='padding-left:10px'>"
							+ $("#save_link_title").val() + "</h4>");
			$("#permalink").append(
					"<a href=" + location.href + ">" + location.href + "</a>");
			$(".sharelinkurl").attr("st_url", location.href);
			$(".sharelinkurl").attr("st_title", $("#save_link_title").val());
			$("#permalink").parent().show();
			// openPostToFbDialog();
			
			saveToGoogle(response);
			
			if(isShare){
				shareLink(location.href);
			}
		},
		error : function(e, s, a) {
			openErrorDialog("Error in data updating");
		}
	});
}

var gdPath = "";
function saveToGoogle(path){
	return false;
	gdPath = path;
    gapi.savetodrive.render('savetodrive-div', {
      src: "/codebeautify/"+path+".txt",
      filename: "codebeautify_"+$("#viewName").val()+".txt",
      sitename: 'Codebeautify.org'
    });
    openGDriveSaveDialog();
}

//gdriveDialog
function openGDriveSaveDialog(){
	$("#gdriveDialog").dialog({
				modal : true,
				title : "Save to Google Drive",
				zIndex : 10000,
				autoOpen : true,
				width : '30%',
				resizable : false,
				buttons : {
					Close : function() {
						$(this).dialog('destroy');
						deleteAfterUploadToGD();
					}
				}
			});
}

function deleteAfterUploadToGD(){
	if(gdPath.trim().length != 0){
		$.ajax({
			url : globalurl + "service/deleteGdriveFile",
			dataType : "text",
			type : "post",
			data : {
				filename : gdPath
			},
			success : function(response) {
				gdPath = "";
				console.log("deleted -> " + path);
			}
		});
	}
}

function shareLink(link){
	if(getProvider() == "google"){
		window.location.href = "https://plus.google.com/share?url="+link;
	}
	else{
		window.location.href = "https://www.facebook.com/sharer/sharer.php?u="+link
	}
}

function openSavedialog(isShare) {
	
	var isLogin = $("#isLogin").val();

	var data = "";
	if ($("#viewName").val().trim() == 'cssvalidate') {
		data = $("#cssData").val();
	} else if ($("#viewName").val().trim() == 'jsvalidate') {

		data = $("#jsData").val();
	} else if ($("#viewName").val().trim() == 'wordcounter') {

		data = $("#tData").val();
	} else if ($("#viewName").val().trim() == 'alleditor') {
		if (editorAce.getValue() == null
				&& editorAce.getValue().trim().length == 0) {
			flag = false;
			return false;
		}
		data = editorAce.getValue() + "|" + $("#editorLanguage").val();

	} else {
		if (typeof editorAce != 'undefined') {
			data = editorAce.getValue();
		} else {
			data = $("#input").val();
		}
	}

	if (data != null && data != "" && data.trim().length > 0) {
		$("#savedialog").removeClass("hide");
		$("#savedialog")
				.dialog(
						{
							modal : true,
							title : "Save",
							zIndex : 10000,
							autoOpen : false,
							width : '30%',
							resizable : false,
							buttons : {
								Save : function() {
									var title = $("#save_link_title").val();

									if (title != null
											&& title.trim().length != 0) {
										$('#savedialog').dialog('close');
										$("#openError").html('');
										if ($("#edit_link_id").val() == ""
												|| $("#edit_link_id").val() == "0") {
											save(data,isShare);
											$(this).dialog('destroy');

										} else {
											if (isLogin == "1") {
												$("#savedialog").dialog(
														"option", "disabled",
														true);
												$('<div></div>')
														.appendTo('#openError')
														.html(
																'<div>Do you want to save as new file..?</h5></div>')
														.dialog(
																{
																	modal : true,
																	title : "Confirm",
																	zIndex : 10000,
																	autoOpen : true,
																	width : '30%',
																	resizable : false,
																	buttons : {
																		Yes : function() {
																			$(
																					"#openError")
																					.html(
																							'');
																			save(data,isShare);
																			$(
																					this)
																					.dialog(
																							'destroy');
																			$(
																					"#savedialog")
																					.dialog(
																							'destroy');
																		},
																		No : function(
																				event,
																				ui) {
																			$(
																					"#openError")
																					.html(
																							'');
																			update(data,isShare);
																			$(
																					this)
																					.dialog(
																							'destroy');
																			$(
																					"#savedialog")
																					.dialog(
																							'destroy');
																			$("#savedialog").removeClass("hide");
																		},
																		Close : function(
																				event,
																				ui) {
																			$(
																					"#openError")
																					.html(
																							'');
																			$(
																					this)
																					.dialog(
																							'destroy');
																			$(
																					'#savedialog')
																					.dialog(
																							'open');
																		}
																	},
																});
											} else {
												$("#openError").html('');
												save(data,isShare);
												$(this).dialog('destroy');
												
											}
										}

									} else {
										openErrorDialog("Please Enter Title");
									}
								},
								Cancel : function(event, ui) {
									$("#openError").html('');
									$(this).dialog('destroy');
									$("#savedialog").addClass("hide");
								}
							},
						});
	} else {
		openErrorDialog("No Data in Input view");
	}

	$('#savedialog').dialog('open');
}
/** *****************Private Note/Snap JS***************** */
function saveSnap() {

	var minute = $("#m").val().trim();

	if (minute.length != 0) {

		if (isNaN(minute) == true) {
			openErrorDialog("Minute Must be number.");
			return false;
		}
		if (parseInt(minute) > 6) {
			openErrorDialog("Minute is not valid,Please Enter minutes between 1 to 5.");
			return false;
		}
	}

	var note = $("#note").val().trim(), email = $("#email").val(), note_ref = $(
			"#note_ref").val(), photoId = $("#photoId").text();

	if (note.trim().length == 0) {
		$("#note").focus();
		return false;
	}

	$.ajax({
		url : globalurl + "service/savePrivateNote",
		dataType : "text",
		type : "post",
		data : {
			note : note,
			email : email,
			note_ref : note_ref,
			timer : minute,
			photoId : photoId
		},
		success : function(response) {

			$('.MainMessageContainerDiv').addClass('hideImportant');
			$('.messageAlertDiv').show();
			
			var link = "http://" + location.host + "/"
			+ $("#viewName").val().trim() + "/" + response;
	
			link = link.replace(" ", "");
			
			$('.createMessageLink').html(link);
		},
		error : function(e, s, a) {

			openErrorDialog("Error in save");

		}
	});

}

function deletePhoto() {

	var photoId = $("#photoId").text();

	$.ajax({
		url : globalurl + "service/deletePrivateNotePhoto",
		dataType : "text",
		type : "post",
		data : {
			photoId : photoId
		},
		success : function(response) {
			if (response == "success") {
				$("#photoId").text("");
				$("#uploadPhotobtn").show();
				$("#photoSpan").hide();
			} else {
				openErrorDialog("Error in Deleting photo Please Try Agains");
			}
		},
		error : function(e, s, a) {

			openErrorDialog("Error in Delete");

		}
	});
}

function uploadPrivateNotePhoto() {

	// globalurl = "/index.php/"
	new AjaxUpload($('#uploadPhotobtn'), {
		action : globalurl + "readfile/uploadPrivateNotePhoto",
		name : 'userfile',
		onSubmit : function(file, ext1) {
			var ext = ext1[0];

			if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "gif"
					|| ext == "bmp" || ext == "psd") {
				showProgress();
				return true;
			} else {
				openErrorDialog("Please Select Image File Only...!");
				return false;
			}

		},
		onComplete : function(file, response) {

			if (response != 'error' && response.search("Filename") == -1) {
				$("#photoId").text(response);
				$("#uploadPhotobtn").hide();
				$("#photoSpan").show();
			} else {
				openErrorDialog("Error in Loading File.");
			}

			hideProgress();

		}
	});

}

/** ***********Ace Ajax Editor********************* */
var crlf = /(\r?\n|\r)/g,
whitespace = /(\r?\n|\r|\s+)/g;

function updateCounter($this){
	var data = $($this).val();
	var regex = /\s+/gi;
	var wordCount = data.trim().replace(regex, ' ').split(' ').length;
	$("#editor1TC").text(data.length);
	$("#editor1TW").text(wordCount);
	var lines = data.split(/\r\n|\r|\n/).length;
	$("#editor1TL").text(lines);
	var count = countBytes(data);
	$("#editor1Size").text(formateByteCount(count));
	$(".editorCounterSection").show();
}

function createEditor(mode1, mode2) {
	if (mode1 != undefined && mode1 != null) {
		editorAce = ace.edit("editor");
		editorAce.getSession().setMode("ace/mode/" + mode1);
		editorAce.getSession().setUseWrapMode(true);
		editorAce.on('change', function() {
			var data = editorAce.getValue();
			var regex = /\s+/gi;
			var wordCount = data.trim().replace(regex, ' ').split(' ').length;
			$("#editor1TC").text(data.length);
			$("#editor1TW").text(wordCount);
			var lines = data.split(/\r\n|\r|\n/).length;
			$("#editor1TL").text(lines);
			var count = countBytes(data);
			$("#editor1Size").text(formateByteCount(count));
			
			if(viewname == "tableizer"){
				hideTableizer();
			}

		});
		$(".editorCounterSection").show();
	}
	 

	if (mode2 != undefined && mode2 != null) {
		editorResult = ace.edit("result");
		editorResult.getSession().setMode("ace/mode/" + mode2);
		editorResult.getSession().setUseWrapMode(true);
		editorResult.on('change', function() {
			var data = editorResult.getValue();
			var regex = /\s+/gi;
			var wordCount = data.trim().replace(regex, ' ').split(' ').length;
			$("#editor2TC").text(data.length);
			$("#editor2TW").text(wordCount);
			var lines = data.split(/\r\n|\r|\n/).length;
			$("#editor2TL").text(lines);
			var count = countBytes(data);
			$("#editor2Size").text(formateByteCount(count));
		});
		$(".editorCounterSection").show();
	}
	 
	
}
	
	function countBytes(text, options) {
		// Set option defaults
		options = options || {};
		options.lineBreaks = options.lineBreaks || 1;
		options.ignoreWhitespace = options.ignoreWhitespace || false;
		
		var length = text.length,
			nonAscii = length - text.replace(/[\u0100-\uFFFF]/g, '').length,
		    lineBreaks = length - text.replace(crlf, '').length; 
		
		if (options.ignoreWhitespace) {
			// Strip whitespace
			text = text.replace(whitespace, '');
			
			return text.length + nonAscii;
		}
		else {
			return length + nonAscii + Math.max(0, options.lineBreaks * (lineBreaks - 1));
		}
	}
	
	function formateByteCount(count) {
		var level = 0;
		
		while (count > 1024) {
			count /= 1024;
			level++;
		}
	
		// Round to 2 decimals
		count = Math.round(count*100)/100;
	
		level = ['', 'K', 'M', 'G', 'T'][level];
	
		return count + ' ' + level + 'B';
	}


/** ********************Brocken link checker******************************* */
function getLinks() {
	var path = $("#url").val();

	if (path.length > 5) {

		$("#linksUL").html("");

		$.ajax({
			type : "post",
			url : globalurl + "service/getAllLinks",
			dataType : "json",
			data : {
				path : path
			},
			success : function(response) {

				if (response != null && response.length != 0) {
					var arr = path.split("/");

					var url = arr[0] + "//" + arr[2];

					var newLinks = [];

					$.each(response, function(i, link) {

						if (isUrl(link)) {
							newLinks.push(link);
						} else {
							if (link.indexOf("/") != 0) {
								link = "/" + link;
							}
							newLinks.push(url + link);
						}

					});
					$("#editor").show();
					$('.LinkStatusDiv').show();
					checkLink(newLinks);
				} else {
					openErrorDialog("No Links Found Or Not Accessible");
				}
			},
			error : function(e, s, a) {
				openErrorDialog("Failed to load data=" + s);
			}
		});
	}
}
function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(s);
}

$("#url").keydown(function(e) {

	var keycode = e.keyCode || e.which;

	if (keycode == 13) {
		getLinks();
	}

});

function checkLink(links) {
	var brokenLinkCnt = 0;
	var activeLinkCnt = 0;
	$.each(links, function(i, link) {

		$.ajax({
			type : "post",
			url : globalurl + "service/check_url",
			dataType : "text",
			data : {
				path : link
			},
			success : function(response) {
				var status = "green";

				if (response == '308' || response == '404') {
					status = "red";
					brokenLinkCnt += 1;
				}
				activeLinkCnt += 1;
				$('.activeLink span').html(activeLinkCnt);
				$('.brokenLink span').html(brokenLinkCnt);
				$('#linksUL').append(
						'<li class=' + status + '><a href="' + link + '">'
								+ link + '</a></li>');
			},
			error : function(e, s, a) {
				$('#linksUL').append(
						'<li class="red"><a href=' + link + '>' + link
								+ '</a></li>');
			}
		});
	});
}


/** ********csv parser ************ */
/*
 * Papa Parse v3.0.1 https://github.com/mholt/PapaParse
 */
;
(function(e) {
	"use strict";
	function u(e, r) {
		var i = t ? r : g(r);
		var s = i.worker && Papa.WORKERS_SUPPORTED && n;
		if (s) {
			var o = d();
			o.userStep = i.step;
			o.userChunk = i.chunk;
			o.userComplete = i.complete;
			o.userError = i.error;
			i.step = b(i.step);
			i.chunk = b(i.chunk);
			i.complete = b(i.complete);
			i.error = b(i.error);
			delete i.worker;
			o.postMessage({
				input : e,
				config : i,
				workerId : o.id
			})
		} else {
			if (typeof e === "string") {
				if (i.download) {
					var u = new f(i);
					u.stream(e)
				} else {
					var a = new c(i);
					var h = a.parse(e);
					if (b(i.complete))
						i.complete(h);
					return h
				}
			} else if (e instanceof File) {
				if (i.step || i.chunk) {
					var u = new l(i);
					u.stream(e)
				} else {
					var a = new c(i);
					if (t) {
						var p = new FileReaderSync;
						var v = p.readAsText(e, i.encoding);
						return a.parse(v)
					} else {
						p = new FileReader;
						p.onload = function(e) {
							var t = new c(i);
							var n = t.parse(e.target.result);
							if (b(i.complete))
								i.complete(n)
						};
						p.readAsText(e, i.encoding)
					}
				}
			}
		}
	}
	function a(t, n) {
		function a() {
			if (typeof n !== "object")
				return;
			if (typeof n.delimiter === "string" && n.delimiter.length == 1
					&& e.Papa.BAD_DELIMITERS.indexOf(n.delimiter) == -1) {
				o = n.delimiter
			}
			if (typeof n.quotes === "boolean" || n.quotes instanceof Array)
				s = n.quotes;
			if (typeof n.newline === "string")
				u = n.newline
		}
		function f(e) {
			if (typeof e !== "object")
				return [];
			var t = [];
			for ( var n in e)
				t.push(n);
			return t
		}
		function l(e, t) {
			var n = "";
			if (typeof e === "string")
				e = JSON.parse(e);
			if (typeof t === "string")
				t = JSON.parse(t);
			var r = e instanceof Array && e.length > 0;
			var i = !(t[0] instanceof Array);
			if (r) {
				for ( var s = 0; s < e.length; s++) {
					if (s > 0)
						n += o;
					n += c(e[s], s)
				}
				if (t.length > 0)
					n += u
			}
			for ( var a = 0; a < t.length; a++) {
				var f = r ? e.length : t[a].length;
				for ( var l = 0; l < f; l++) {
					if (l > 0)
						n += o;
					var h = r && i ? e[l] : l;
					n += c(t[a][h], l)
				}
				if (a < t.length - 1)
					n += u
			}
			return n
		}
		function c(t, n) {
			if (typeof t === "undefined")
				return "";
			t = t.toString().replace(/"/g, '""');
			var r = typeof s === "boolean" && s || s instanceof Array && s[n]
					|| h(t, e.Papa.BAD_DELIMITERS) || t.indexOf(o) > -1
					|| t.charAt(0) == " " || t.charAt(t.length - 1) == " ";
			return r ? '"' + t + '"' : t
		}
		function h(e, t) {
			for ( var n = 0; n < t.length; n++)
				if (e.indexOf(t[n]) > -1)
					return true;
			return false
		}
		var r = "";
		var i = [];
		var s = false;
		var o = ",";
		var u = "\r\n";
		a();
		if (typeof t === "string")
			t = JSON.parse(t);
		if (t instanceof Array) {
			if (!t.length || t[0] instanceof Array)
				return l(null, t);
			else if (typeof t[0] === "object")
				return l(f(t[0]), t)
		} else if (typeof t === "object") {
			if (typeof t.data === "string")
				t.data = JSON.parse(t.data);
			if (t.data instanceof Array) {
				if (!t.fields)
					t.fields = t.data[0] instanceof Array ? t.fields
							: f(t.data[0]);
				if (!(t.data[0] instanceof Array)
						&& typeof t.data[0] !== "object")
					t.data = [ t.data ]
			}
			return l(t.fields || [], t.data || [])
		}
		throw "exception: Unable to serialize unrecognized input"
	}
	function f(n) {
		n = n || {};
		if (!n.chunkSize)
			n.chunkSize = Papa.RemoteChunkSize;
		var r = 0, i = 0;
		var s = "";
		var o = "";
		var u, a;
		var f = new c(y(n));
		this.stream = function(l) {
			function c() {
				u = new XMLHttpRequest;
				if (!t) {
					u.onload = h;
					u.onerror = p
				}
				u.open("GET", l, !t);
				if (n.step) {
					var e = r + n.chunkSize - 1;
					if (i && e > i)
						e = i;
					u.setRequestHeader("Range", "bytes=" + r + "-" + e)
				}
				u.send();
				if (t && u.status == 0)
					p();
				else
					r += n.chunkSize
			}
			function h() {
				if (u.readyState != 4)
					return;
				if (u.status < 200 || u.status >= 400) {
					p();
					return
				}
				s += o + u.responseText;
				o = "";
				var i = !n.step || r > d(u);
				if (!i) {
					var l = s.lastIndexOf("\n");
					if (l < 0)
						l = s.lastIndexOf("\r");
					if (l > -1) {
						o = s.substring(l + 1);
						s = s.substring(0, l)
					} else {
						a();
						return
					}
				}
				var c = f.parse(s);
				s = "";
				if (t) {
					e.postMessage({
						results : c,
						workerId : Papa.WORKER_ID,
						finished : i
					})
				} else if (b(n.chunk)) {
					n.chunk(c);
					c = undefined
				}
				if (i && b(n.complete))
					n.complete(c);
				else if (c && c.meta.aborted && b(n.complete))
					n.complete(c);
				else if (!i)
					a()
			}
			function p() {
				if (b(n.error))
					n.error(u.statusText);
				else if (t && n.error) {
					e.postMessage({
						workerId : Papa.WORKER_ID,
						error : u.statusText,
						finished : false
					})
				}
			}
			function d(e) {
				var t = e.getResponseHeader("Content-Range");
				return parseInt(t.substr(t.lastIndexOf("/") + 1))
			}
			if (t) {
				a = function() {
					c();
					h()
				}
			} else {
				a = function() {
					c()
				}
			}
			a()
		}
	}
	function l(n) {
		n = n || {};
		if (!n.chunkSize)
			n.chunkSize = Papa.LocalChunkSize;
		var r = 0;
		var i = "";
		var s = "";
		var o, u, a;
		var f = new c(y(n));
		var l = typeof FileReader === "function";
		this.stream = function(u) {
			function c() {
				if (r < u.size)
					h()
			}
			function h() {
				var e = Math.min(r + n.chunkSize, u.size);
				var t = o.readAsText(a.call(u, r, e), n.encoding);
				if (!l)
					p({
						target : {
							result : t
						}
					})
			}
			function p(o) {
				r += n.chunkSize;
				i += s + o.target.result;
				s = "";
				var a = r >= u.size;
				if (!a) {
					var l = i.lastIndexOf("\n");
					if (l < 0)
						l = i.lastIndexOf("\r");
					if (l > -1) {
						s = i.substring(l + 1);
						i = i.substring(0, l)
					} else {
						c();
						return
					}
				}
				var h = f.parse(i);
				i = "";
				if (t) {
					e.postMessage({
						results : h,
						workerId : Papa.WORKER_ID,
						finished : a
					})
				} else if (b(n.chunk)) {
					n.chunk(h, u);
					h = undefined
				}
				if (a && b(n.complete))
					n.complete(undefined, u);
				else if (h && h.meta.aborted && b(n.complete))
					n.complete(h, u);
				else if (!a)
					c()
			}
			function d() {
				if (b(n.error))
					n.error(o.error, u);
				else if (t && n.error) {
					e.postMessage({
						workerId : Papa.WORKER_ID,
						error : o.error,
						file : u,
						finished : false
					})
				}
			}
			var a = u.slice || u.webkitSlice || u.mozSlice;
			if (l) {
				o = new FileReader;
				o.onload = p;
				o.onerror = d
			} else
				o = new FileReaderSync;
			c()
		}
	}
	function c(e) {
		function s() {
			if (i && n) {
				c("Delimiter", "UndetectableDelimiter",
						"Unable to auto-detect delimiting character; defaulted to comma");
				n = false
			}
			if (o())
				u();
			return a()
		}
		function o() {
			return e.header && r.length == 0
		}
		function u() {
			if (!i)
				return;
			for ( var e = 0; o() && e < i.data.length; e++)
				for ( var t = 0; t < i.data[e].length; t++)
					r.push(i.data[e][t]);
			i.data.splice(0, 1)
		}
		function a() {
			if (!i || !e.header && !e.dynamicTyping)
				return i;
			for ( var t = 0; t < i.data.length; t++) {
				var n = {};
				for ( var s = 0; s < i.data[t].length; s++) {
					if (e.dynamicTyping) {
						var o = i.data[t][s];
						if (o == "true")
							i.data[t][s] = true;
						else if (o == "false")
							i.data[t][s] = false;
						else
							i.data[t][s] = l(o)
					}
					if (e.header) {
						if (s >= r.length) {
							if (!n["__parsed_extra"])
								n["__parsed_extra"] = [];
							n["__parsed_extra"].push(i.data[t][s])
						}
						n[r[s]] = i.data[t][s]
					}
				}
				if (e.header) {
					i.data[t] = n;
					if (s > r.length)
						c("FieldMismatch", "TooManyFields",
								"Too many fields: expected " + r.length
										+ " fields but parsed " + s, t);
					else if (s < r.length)
						c("FieldMismatch", "TooFewFields",
								"Too few fields: expected " + r.length
										+ " fields but parsed " + s, t)
				}
			}
			if (e.header && i.meta)
				;
			i.meta.fields = r;
			return i
		}
		function f(t) {
			var n = [ ",", " ", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP ];
			var r, i, s;
			for ( var o = 0; o < n.length; o++) {
				var u = n[o];
				var a = 0, f = 0;
				s = undefined;
				var l = (new h({
					delimiter : u,
					preview : 10
				})).parse(t);
				for ( var c = 0; c < l.data.length; c++) {
					var p = l.data[c].length;
					f += p;
					if (typeof s === "undefined") {
						s = p;
						continue
					} else if (p > 1) {
						a += Math.abs(p - s);
						s = p
					}
				}
				f /= l.data.length;
				if ((typeof i === "undefined" || a < i) && f > 1.99) {
					i = a;
					r = u
				}
			}
			e.delimiter = r;
			return {
				successful : !!r,
				bestDelimiter : r
			}
		}
		function l(e) {
			var n = t.test(e);
			return n ? parseFloat(e) : e
		}
		function c(e, t, n, r) {
			i.errors.push({
				type : e,
				code : t,
				message : n,
				row : r
			})
		}
		var t = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
		var n;
		var r = [];
		var i = {
			data : [],
			errors : [],
			meta : {}
		};
		e = y(e);
		this.parse = function(t) {
			n = false;
			if (!e.delimiter) {
				var r = f(t);
				if (r.successful)
					e.delimiter = r.bestDelimiter;
				else {
					n = true;
					e.delimiter = ","
				}
				i.meta.delimiter = e.delimiter
			}
			if (b(e.step)) {
				var u = e.step;
				e.step = function(e, t) {
					i = e;
					if (o())
						s();
					else
						u(s(), t)
				}
			}
			i = (new h(e)).parse(t);
			return s()
		}
	}
	function h(e) {
		function E() {
			while (l < r.length) {
				if (y)
					break;
				if (a > 0 && g >= a)
					break;
				if (w)
					return x();
				if (f == '"')
					T();
				else if (c)
					N();
				else
					C();
				S()
			}
			return x()
		}
		function S() {
			l++;
			f = r[l]
		}
		function x() {
			if (y)
				I("Abort", "ParseAbort",
						"Parsing was aborted by the user's step function");
			if (c)
				I("Quotes", "MissingQuotes", "Unescaped or mismatched quotes");
			_();
			if (!b(o))
				return U()
		}
		function T() {
			if (j() && !B())
				c = !c;
			else {
				A();
				if (c && B())
					l++;
				else
					I("Quotes", "UnexpectedQuotes", "Unexpected quotes")
			}
		}
		function N() {
			if (P(l) || H(l))
				h++;
			A()
		}
		function C() {
			if (f == i)
				O();
			else if (P(l)) {
				M();
				S()
			} else if (H(l))
				M();
			else if (k())
				L();
			else
				A()
		}
		function k() {
			if (!s)
				return false;
			var e = l == 0 || H(l - 1) || P(l - 2);
			return e && r[l] === s
		}
		function L() {
			while (!P(l) && !H(l) && l < r.length) {
				S()
			}
		}
		function A() {
			p[v][m] += f
		}
		function O() {
			p[v].push("");
			m = p[v].length - 1
		}
		function M() {
			_();
			h++;
			g++;
			p.push([]);
			v = p.length - 1;
			O()
		}
		function _() {
			D();
			if (b(o)) {
				if (p[v])
					o(U(), t);
				R()
			}
		}
		function D() {
			if (p[v].length == 1 && n.test(p[v][0])) {
				if (e.keepEmptyRows)
					p[v].splice(0, 1);
				else
					p.splice(v, 1);
				v = p.length - 1
			}
		}
		function P(e) {
			return e < r.length - 1
					&& (r[e] == "\r" && r[e + 1] == "\n" || r[e] == "\n"
							&& r[e + 1] == "\r")
		}
		function H(e) {
			return r[e] == "\r" || r[e] == "\n"
		}
		function B() {
			return !j() && l < r.length - 1 && r[l + 1] == '"'
		}
		function j() {
			return !c && F(l - 1) || F(l + 1)
		}
		function F(e) {
			if (typeof e != "number")
				e = l;
			var t = r[e];
			return e <= -1 || e >= r.length || t == i || t == "\r" || t == "\n"
		}
		function I(e, t, n) {
			d.push({
				type : e,
				code : t,
				message : n,
				line : h,
				row : v,
				index : l
			})
		}
		function q(e) {
			r = e;
			c = false;
			l = 0, g = 0, h = 1;
			R();
			p = [ [ "" ] ];
			f = r[l]
		}
		function R() {
			p = [];
			d = [];
			v = 0;
			m = 0
		}
		function U() {
			return {
				data : p,
				errors : d,
				meta : {
					lines : h,
					delimiter : i,
					aborted : y
				}
			}
		}
		var t = this;
		var n = /^\s*$/;
		var r;
		var i;
		var s;
		var o;
		var u;
		var a;
		var f;
		var l;
		var c;
		var h;
		var p;
		var d;
		var v;
		var m;
		var g;
		var y = false;
		var w = false;
		e = e || {};
		i = e.delimiter;
		s = e.comments;
		o = e.step;
		a = e.preview;
		if (typeof i !== "string" || i.length != 1
				|| Papa.BAD_DELIMITERS.indexOf(i) > -1)
			i = ",";
		if (s === true)
			s = "#";
		else if (typeof s !== "string" || s.length != 1
				|| Papa.BAD_DELIMITERS.indexOf(s) > -1 || s == i)
			s = false;
		this.parse = function(e) {
			if (typeof e !== "string")
				throw "Input must be a string";
			q(e);
			return E()
		};
		this.abort = function() {
			y = true
		}
	}
	function p() {
		var e = "worker" + String(Math.random()).substr(2);
		document.write('<script id="' + e + '"></script>');
		return document.getElementById(e).previousSibling.src
	}
	function d() {
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		var t = new e.Worker(n);
		t.onmessage = v;
		t.id = i++;
		r[t.id] = t;
		return t
	}
	function v(e) {
		var t = e.data;
		var n = r[t.workerId];
		if (t.error)
			n.userError(t.error, t.file);
		else if (t.results && t.results.data) {
			if (b(n.userStep)) {
				for ( var i = 0; i < t.results.data.length; i++) {
					n.userStep({
						data : [ t.results.data[i] ],
						errors : t.results.errors,
						meta : t.results.meta
					})
				}
				delete t.results
			} else if (b(n.userChunk)) {
				n.userChunk(t.results, t.file);
				delete t.results
			}
		}
		if (t.finished) {
			if (b(r[t.workerId].userComplete))
				r[t.workerId].userComplete(t.results);
			r[t.workerId].terminate();
			delete r[t.workerId]
		}
	}
	function m(t) {
		var n = t.data;
		if (typeof Papa.WORKER_ID === "undefined" && n)
			Papa.WORKER_ID = n.workerId;
		if (typeof n.input === "string") {
			e.postMessage({
				workerId : Papa.WORKER_ID,
				results : Papa.parse(n.input, n.config),
				finished : true
			})
		} else if (n.input instanceof File) {
			var r = Papa.parse(n.input, n.config);
			if (r)
				e.postMessage({
					workerId : Papa.WORKER_ID,
					results : r,
					finished : true
				})
		}
	}
	function g(e) {
		if (typeof e !== "object")
			e = {};
		var t = y(e);
		if (typeof t.delimiter !== "string" || t.delimiter.length != 1
				|| Papa.BAD_DELIMITERS.indexOf(t.delimiter) > -1)
			t.delimiter = s.delimiter;
		if (typeof t.header !== "boolean")
			t.header = s.header;
		if (typeof t.dynamicTyping !== "boolean")
			t.dynamicTyping = s.dynamicTyping;
		if (typeof t.preview !== "number")
			t.preview = s.preview;
		if (typeof t.step !== "function")
			t.step = s.step;
		if (typeof t.complete !== "function")
			t.complete = s.complete;
		if (typeof t.encoding !== "string")
			t.encoding = s.encoding;
		if (typeof t.worker !== "boolean")
			t.worker = s.worker;
		if (typeof t.download !== "boolean")
			t.download = s.download;
		if (typeof t.keepEmptyRows !== "boolean")
			t.keepEmptyRows = s.keepEmptyRows;
		return t
	}
	function y(e) {
		if (typeof e !== "object")
			return e;
		var t = e instanceof Array ? [] : {};
		for ( var n in e)
			t[n] = y(e[n]);
		return t
	}
	function b(e) {
		return typeof e === "function"
	}
	var t = !e.document, n;
	var r = {}, i = 0;
	var s = {
		delimiter : "",
		header : false,
		dynamicTyping : false,
		preview : 0,
		step : undefined,
		encoding : "",
		worker : false,
		comments : false,
		complete : undefined,
		download : false,
		chunk : undefined,
		keepEmptyRows : false
	};
	e.Papa = {};
	e.Papa.parse = u;
	e.Papa.unparse = a;
	e.Papa.RECORD_SEP = String.fromCharCode(30);
	e.Papa.UNIT_SEP = String.fromCharCode(31);
	e.Papa.BYTE_ORDER_MARK = "﻿";
	e.Papa.BAD_DELIMITERS = [ "\r", "\n", '"', e.Papa.BYTE_ORDER_MARK ];
	e.Papa.WORKERS_SUPPORTED = !!e.Worker;
	e.Papa.LocalChunkSize = 1024 * 1024 * 10;
	e.Papa.RemoteChunkSize = 1024 * 1024 * 5;
	e.Papa.Parser = h;
	e.Papa.ParserHandle = c;
	e.Papa.NetworkStreamer = f;
	e.Papa.FileStreamer = l;
	if (e.jQuery) {
		var o = e.jQuery;
		o.fn.parse = function(t) {
			function i() {
				if (r.length == 0) {
					if (b(t.complete))
						t.complete();
					return
				}
				var e = r[0];
				if (b(t.before)) {
					var n = t.before(e.file, e.inputElem);
					if (typeof n === "object") {
						if (n.action == "abort") {
							s("AbortError", e.file, e.inputElem, n.reason);
							return
						} else if (n.action == "skip") {
							u();
							return
						} else if (typeof n.config === "object")
							e.instanceConfig = o.extend(e.instanceConfig,
									n.config)
					} else if (n == "skip") {
						u();
						return
					}
				}
				var i = e.instanceConfig.complete;
				e.instanceConfig.complete = function(t) {
					if (b(i))
						i(t, e.file, e.inputElem);
					u()
				};
				Papa.parse(e.file, e.instanceConfig)
			}
			function s(e, n, r, i) {
				if (b(t.error))
					t.error({
						name : e
					}, n, r, i)
			}
			function u() {
				r.splice(0, 1);
				i()
			}
			var n = t.config || {};
			var r = [];
			this.each(function(t) {
				var i = o(this).prop("tagName").toUpperCase() == "INPUT"
						&& o(this).attr("type").toLowerCase() == "file"
						&& e.FileReader;
				if (!i || !this.files || this.files.length == 0)
					return true;
				for ( var s = 0; s < this.files.length; s++) {
					r.push({
						file : this.files[s],
						inputElem : this,
						instanceConfig : o.extend({}, n)
					})
				}
			});
			i();
			return this
		}
	}
	if (t)
		e.onmessage = m;
	else if (Papa.WORKERS_SUPPORTED)
		n = p()
})(this);

/** **********************Base64 to Image Converter**************************** */
function setBase64ToImage(){

	var baseString = $("#base64string").val().trim();
	// data:image/png;base64
	
	if(baseString.substring(0,4) != "data"){
		baseString = "data:image/png;base64," + baseString;
	}
	
	$("#base64Img").prop('src',baseString);	
	$("#base64Img").addClass("span12 baseurlopa2");
	$("#dwnldLink").show();
	$("#dwnldLink").prop('href',baseString);
}

function setViewTitle(title,showMenu,showSaveBtn){
	
	
	
	if(showMenu != undefined && showMenu == true){
		$("#moreMenu").show();
	}
	else{
		$("#moreMenu").hide();
	}
	
	if(showSaveBtn != undefined && showSaveBtn == true){
		$("#savebtn").show();
	}
	else{
		$("#savebtn").hide();
	}
}

function closeMsg_Credit_Card_Validator(){
	$("#hResult").hide();
	$("#closemsg").hide();
}

// viewers common function

function createFile(ext,divID){
	
	var content = "";
	
	if(divID == undefined){
		if(typeof editorResult != 'undefined'){
			content = editorResult.getValue();
		}
		if(content.trim().length==0 && typeof editor != 'undefined'){
			content = editor.getText();
		}	
		if(content.trim().length==0 && typeof editorAce != 'undefined'){
			content = editorAce.getValue();
		}
	}
	else{
		content = $("#"+divID).text();
		
		if(ext == "html"){
			content = vkbeautify.xml(content);
		}
	}
	
	if(ext == "converted"){
		ext = converted;
	}
	
	if (content.trim().length != 0) {
		var blob = new Blob([ "" + content + "" ], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "codebeautify."+ext);
	}
	else{
		openErrorDialog("Sorry Result is Empty");
	}
}



// contact us
function sendMail() {

	 	var code = grecaptcha.getResponse();
	 	var captchaCode = code;
	 	
	 	
	 	if (code.trim().length > 0) {

	 		if (code == captchaCode) {
	 			var email = $("#email").val();
	 			var subject = $("#subject").val();
	 			var message = $("#message").val();
	 			var name = $("#name").val();
	 			if (subject.trim().length > 0 && message.trim().length > 0 && name.trim().length > 0 && email.trim().length > 0) {
	 				if (isValidEmailAddress(email)) {

	 					$.ajax({
	 					    url: globalurl + "mailSend",
	 						type: 'post',
	 						data: {
	 							email: email,
	 							subject: subject,
	 							message: message,
	 							name: name,
	 							code: code.toLowerCase()
	 						},
	 						success: function(response) {

	 							if (response.toLowerCase().indexOf("success") >= 0) {
	 								openErrorDialog("Mail sent successfully");
	 								$("#email").val("");
	 								$("#subject").val("");
	 								$("#message").val("");
	 								$("#name").val("");
	 								$("#code").val("");
	 								$("#captchaCode").val("");
	 								
	 								
	 							} else {
	 								openErrorDialog("Error in sending..");
	 								$("#code").val("");
	 								$("#captchaCode").val("");
	 							}
	 						},
	 						error: function(e, s, a) {
	 							openErrorDialog("Error in sending..=" + s);
	 							$("#code").val("");
	 							$("#captchaCode").val("");
	 						}
	 					});
	 				} else {
	 					openErrorDialog("Enter valid email address");
	 				}
	 			} else {
	 				openErrorDialog("Fill required data");
	 			}
	 		} else {
	 			openErrorDialog("pls enter valid captcha code display in box");
	 			$("#code").val("");
	 			$("#captchaCode").val("");
	 		}
	 	} else {
	 		openErrorDialog("Please fill/attend the Captcha");
	 	}
	 }

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
	}

// google map location code
var map;

function initialize() {
  var mapOptions = {
    zoom: 17
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      
      var contentString = "<div><b>You are currently here.</b></div>"
      
      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: contentString,
        maxWidth: 200
      });

      var marker = new google.maps.Marker({
          position: pos,
          map: map,
      });

      
      map.setCenter(pos);
      
      infowindow.open(map,marker);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function getUrlFromString($str){
	var url = "";
	
	try{
	if($str != null && $str.length != 0){
		$("#tempDiv").html('');
		$("#tempDiv").html($str);
		$str = $("#tempDiv a").attr('href');
		var u = $str.split('=');
		if(u != null && u.length != 0){
		url = u[1].replace("/","");
		var    a = document.createElement('a');
	    a.href = url;
	    url = a.hostname;
		}
		}
	return url;
	}
	catch(e){
		return '--';
	}
}

// google search rank


function getJsonSampleData() {
	var sampleJson= '   {\n  '  + 
	 '       "employees": {\n  '  + 
	 '           "employee": [\n  '  + 
	 '               {\n  '  + 
	 '                   "id": "1", \n '  + 
	 '                   "firstName": "Tom", \n '  + 
	 '                   "lastName": "Cruise",\n  '  + 
	 '                   "photo": "http://cdn2.gossipcenter.com/sites/default/files/imagecache/story_header/photos/tom-cruise-020514sp.jpg"  \n'  + 
	 '               },\n  '  + 
	 '               { \n '  + 
	 '                   "id": "2",\n  '  + 
	 '                   "firstName": "Maria", \n '  + 
	 '                   "lastName": "Sharapova",  \n'  + 
	 '                   "photo": "http://thewallmachine.com/files/1363603040.jpg" \n '  + 
	 '               }, \n '  + 
	 '               { \n '  + 
	 '                   "id": "3", \n '  + 
	 '                   "firstName": "James", \n '  + 
	 '                   "lastName": "Bond", \n '  + 
	 '                   "photo": "http://georgesjournal.files.wordpress.com/2012/02/007_at_50_ge_pierece_brosnan.jpg" \n '  + 
	 '               } \n '  + 
	 '           ] \n '  + 
	 '       }  \n'  + 
	 '  } \n ' ; 
	
	
	 
	setToEditor(sampleJson);
	

	$(".sharelinkurl").attr("st_url", window.location);
	$(".sharelinkurl").attr("st_title", $("#save_link_title").val());
}

function getXMLSampleData(isReturn) {
	var sampleXML='<?xml version="1.0" encoding="UTF-8" ?>'  + 
	 '   <employees>  '  + 
	 '       <employee>  '  + 
	 '           <id>1</id>  '  + 
	 '           <firstName>Leonardo</firstName>  '  + 
	 '           <lastName>DiCaprio</lastName>  '  + 
	 '           <photo>http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg</photo>  '  + 
	 '       </employee>  '  + 
	 '       <employee>  '  + 
	 '           <id>2</id>  '  + 
	 '           <firstName>Johnny</firstName>  '  + 
	 '           <lastName>Depp</lastName>  '  + 
	 '           <photo>http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg</photo>  '  + 
	 '       </employee>  '  + 
	 '       <employee>  '  + 
	 '           <id>3</id>  '  + 
	 '           <firstName>Hritik</firstName>  '  + 
	 '           <lastName>Roshan</lastName>  '  + 
	 '           <photo>http://thewallmachine.com/files/1411921557.jpg</photo>  '  + 
	 '       </employee>  '  + 
	 '  </employees>  ' ;  ; 
	
	 
	 if(isReturn != undefined && isReturn){
		 return vkbeautify.xml(sampleXML);
	 }
	 
	setToEditor(vkbeautify.xml(sampleXML));

	$(".sharelinkurl").attr("st_url", window.location);
	$(".sharelinkurl").attr("st_title", $("#save_link_title").val());
}

function processJSON(data) {

	$.each(data, function(k, data1) {

		var type1 = typeof data1;

		if (type1 == "object") {

			flag = false;
			processJSON(data1);
			arr.push("end");
			arr.push("end");

		} else {
			arr.push(k, data1);
		}

	});

	return arr;
}

///this fucnttion called by xml to csv and json to csv
function jsonTocsvbyjson(data,returnFlag) {
	
	arr = [];
	flag = true;

	var header = "";
	var content = "";
	var headFlag = true;

	try {
		
		var type1 = typeof data;
		
		if (type1 != "object") {
			data = processJSON($.parseJSON(data));
		}else{
			data =processJSON (data);
		}
		

	} catch (e) {
		if(returnFlag == undefined || !returnFlag){
			editorResult.setValue("Error in Convert");
		}
		else{
			openErrorDialog("Error in Convert :" + e);
		}
		return false;
	}

	$.each(data, function(k, value) {
		if (k % 2 == 0) {
			if (headFlag) {
				if (value != "end") {
					header += value + ",";
				} else {
					// remove last colon from string
					header = header.substring(0, header.length - 1);
					headFlag = false;
				}
			}
		} else {
			if (value != "end") {
				var temp = data[k - 1];
				if (header.search(temp) != -1) {
					content += value + ",";
				}
			} else {
				// remove last colon from string
				content = content.substring(0, content.length - 1);
				content += "\n";
			}
		}

	});

	if(returnFlag == undefined || !returnFlag){
		editorResult.setValue(header + "\n" + content);
	}
	else{
		return (header + "\n" + content);
	}
}

function convertToHtml(type){

	var data = editorAce.getValue();
	
	if(data != null && data.length != 0){
		if(type.toLowerCase() == "json"){
			var csv = jsonTocsvbyjson(data,true);
			toHTML(csv,type);
		}
		else if(type.toLowerCase() == "xml"){
			var x2js = new X2JS();
			
			try {
				data = $.parseXML(data);
			} catch (e) {
				openErrorDialog("Invalid XML");
			}

			var json = x2js.xml2json(data);
			
			var csv = jsonTocsvbyjson(json,true);
			
			toHTML(csv,type);
		}
	}
}

function JsonDataNotAccurate() {}

function jsonDataValidate(json){
	try{
		$.parseJSON(json);
	}
	catch(e){
		console.log(e);
		return false;
	}
	return true;
}
function performShowHideToHtml(id){
	if(undefined == id){
		id = "editor";
	}
	
	if($("#"+id).hasClass("hide")){
		$("#"+id).removeClass("hide");
		$("#result1").addClass("hide");
		$("#showHideBtn").val("Show Output");
	}
	else{
		$("#result1").removeClass("hide");
		$("#"+id).addClass("hide");
		$("#showHideBtn").val("Show HTML");
	}
}

function addIndent($data){
	
	if($("#sel1").length > 0){
		var space = $("#sel1").val();
		var spaceStr = "";
		for(var i = 0; i < space; i++){
			spaceStr += "\t";
		}
		var lines = $data.split("\n");
		var linesWithSpace = [];
		$.each(lines, function(i, line){
		    	linesWithSpace.push(spaceStr+line);
		});
		$data = linesWithSpace.join("\n");
	}
	
	return $data;
}
