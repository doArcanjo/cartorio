var viewname, converted = "", editorAce, editorResult, old = '', mode, json = '', editor;

$(document).ready(function() {

	viewname = $("#viewName").val().trim();

	if (viewname == "sql-to-csv-converter") {
		setViewTitle("SQL TO CSV Converter", true, true);
		createEditor("sql", "text");

	} else if (viewname == "sql-to-html-converter") {
		setViewTitle("SQL TO HTML Converter", true, true);
		createEditor("sql", "html");

	} else if (viewname == "sql-to-json-converter") {
		mode = document.getElementById('mode');
		mode.onchange = function() {
			editor.setMode(mode.value);
			showJSON(true);
		};

		var container = document.getElementById("jsoneditor");

		var options = {
			mode : mode.value,
			error : function(err) {
				openErrorDialog(err.toString());
			}
		};
		editor = new jsoneditor.JSONEditor(container, options, json);

		setViewTitle("SQL TO JSON Converter", true, true);
		createEditor("sql");

	} else if (viewname == "sql-to-xml-converter") {
		setViewTitle("SQL TO XML Converter", true, true);
		createEditor("sql", "xml");

	} else if (viewname == "sql-to-yaml-converter") {
		setViewTitle("SQL TO YAML Converter", true, true);
		createEditor("xml", "yaml");
	} else if (viewname == "sqlformat") {
		setViewTitle("SQL EDITOR", true, true);
		createEditor("sql", "sql");
	}
	
});

function setToEditor(data) {
	
	editorAce.setValue(data);

	if (viewname == "sql-to-csv-converter") {
		sqlTOcsv();
	} else if (viewname == "sql-to-html-converter") {
		sqlTOhtml();
	} else if (viewname == "sql-to-json-converter") {
		sqlTOjson();
	} else if (viewname == "sql-to-xml-converter") {
		sqlTOxml();
	} else if (viewname == "sql-to-yaml-converter") {
		sqlTOyaml();
	} else if (viewname == "sqlformat") {
		FormatSQL();
	}

}

function sqlTOcsv() {

	var data = editorAce.getValue();
	try {
		if (data != null && data.trim().length != 0) {

			if (data.toLowerCase().search("create") == -1) {
				editorResult.setValue("Missing CREATE STATEMENT");
				return false;
			} else if (data.toLowerCase().search("select") == -1) {
				editorResult.setValue("Missing SELECT STATEMENT");
				return false;
			}

			var db = new SQL.Database();
			var res = db.exec(data);

			var csvData = "";

			$.each(res, function(i, value) {

				if (res.length != 1) {
					csvData += "TABLE " + (i + 1) + "\n";
					csvData += "-------\n";
				}

				csvData += value.columns.join() + "\n";

				$.each(value.values, function(i, value1) {
					csvData += value1.join() + "\n";
				});

				if (res.length != 1) {
					csvData += "-------\n";
				}

			});

			editorResult.setValue(csvData);

			setOutputMsg("SQL TO CSV");
		}
	} catch (e) {
		editorResult.setValue(e.message);
	}
}

function sqlTOhtml() {

	var data = editorAce.getValue();
	try {
		if (data != null && data.trim().length != 0) {

			if (data.toLowerCase().search("create") == -1) {
				editorResult.setValue("Missing CREATE STATEMENT");
				return false;
			} else if (data.toLowerCase().search("select") == -1) {
				editorResult.setValue("Missing SELECT STATEMENT");
				return false;
			}

			var db = new SQL.Database();
			var res = db.exec(data);
			var htmlData = "<center>";

			$.each(res, function(i, value) {

				if (res.length != 1) {

					htmlData += "============= TABLE-" + (i + 1)
							+ " ============= ";

				}

				htmlData += "<table border = '1' class='display'><thead><tr>";

				for ( var j = 0; j < value.columns.length; j++) {
					htmlData += "<th>" + value.columns[j] + "</th>";
				}

				htmlData += "</tr></thead><tbody>";

				$.each(value.values, function(k, value1) {

					htmlData += "<tr>";

					$.each(value1, function(l, data) {

						htmlData += "<td>" + data + "</td>";

					});
					htmlData += "</tr>";
				});

				if (res.length != 1) {
					htmlData += "</tbody></table><br>";
				}
			});

			htmlData += "</center>";

			editorResult.setValue(htmlData);
			
			var htmlString = "<!DOCTYPE html><html>\n";
			htmlString = htmlString + "<head><meta charset='UTF-8'><title>SQL To HTML using codebeautify.org</title></head>\n";
			htmlString = htmlString + "<body>\n";
			htmlString = htmlString +  htmlData;
			htmlString = htmlString + "\n</body>\n";
			htmlString = htmlString + "</html>";
		
			$("#templTableDiv").text(vkbeautify.xml(htmlString));
			editorResult.setValue(vkbeautify.xml(htmlString));
			htmlOutput();
			setOutputMsg("SQL TO HTML");
		}
	} catch (e) {
		editorResult.setValue(e.message);
	}
}

function htmlOutput() {
	$("#result1").show();
	var data = editorResult.getValue();
	if (data.trim().length > 0) {
		var result1 = document.getElementById("result1");
		var d = result1.contentWindow.document;

		if (old != data) {
			old = data;
			d.open();
			d.write(old);
			d.close();
		}

		$("html, body").animate({
			scrollTop : 0
		}, 10);
	}
}

function sqlTOjson() {

	var data = editorAce.getValue();

	try {

		if (data != null && data.trim().length != 0) {

			if (data.toLowerCase().search("create") == -1) {
				openErrorDialog("Missing CREATE STATEMENT");
				return false;
			} else if (data.toLowerCase().search("select") == -1) {
				openErrorDialog("Missing SELECT STATEMENT");
				return false;
			}

			var db = new SQL.Database();
			var res = db.exec(data);

			var jsonData = "[";

			$.each(res, function(i, value) {

				$.each(value.values, function(j, value1) {

					var jsonArr = "{";

					$.each(value1, function(k, data) {

						jsonArr += '"' + value.columns[k] + '"  :' + '"' + data
								+ '"';

						if (value1.length != (k + 1)) {
							jsonArr += ",";
						}

					});

					jsonArr += "}";

					if (value.values.length != (j + 1)) {
						jsonArr += ",";
					}

					jsonData += jsonArr;
				});

				if (res.length != (i + 1)) {
					jsonData += ",";
				}

			});

			jsonData += "]";

			editor.set($.parseJSON(jsonData));
			editor.expandAll(true);
			$("#templTableDiv").text(jsonData);

			setOutputMsg("SQL TO JSON");
		}
	} catch (e) {
		editor.set(e.message);
	}
}

function sqlTOxml() {

	var data = editorAce.getValue();

	try {

		if (data != null && data.trim().length != 0) {

			if (data.toLowerCase().search("create") == -1) {
				editorResult.setValue("Missing CREATE STATEMENT");
				return false;
			} else if (data.toLowerCase().search("select") == -1) {
				editorResult.setValue("Missing SELECT STATEMENT");
				return false;
			}

			var db = new SQL.Database();
			var res = db.exec(data);

			var jsonData = "[";

			$.each(res, function(i, value) {

				$.each(value.values, function(j, value1) {

					var jsonArr = "{";

					$.each(value1, function(k, data) {

						jsonArr += '"' + value.columns[k] + '"  :' + '"' + data
								+ '"';

						if (value1.length != (k + 1)) {
							jsonArr += ",";
						}

					});

					jsonArr += "}";

					if (value.values.length != (j + 1)) {
						jsonArr += ",";
					}

					jsonData += jsonArr;
				});

				if (res.length != (i + 1)) {
					jsonData += ",";
				}

			});

			jsonData += "]";

			var xotree = new XML.ObjTree();
			var xml = xotree.writeXML(JSON.parse(jsonData));
			xml = decodeSpecialCharacter(xml);
			var isvalidXML;
			try {
				isvalidXML = $.parseXML(xml);
			} catch (e) {
				isvalidXML = false;

			}
			if (isvalidXML == false) {
				xml = xml.substr(0, 39) + "<root>" + xml.substr(39) + "</root>";
			}

			editorResult.setValue(vkbeautify.xml(xml));

			setOutputMsg("SQL TO XML");
		}
	} catch (e) {
		editorResult.setValue(e.message);
	}
}
function sqlTOyaml() {

	var data = editorAce.getValue();

	try {

		if (data != null && data.trim().length != 0) {

			if (data.toLowerCase().search("create") == -1) {
				editorResult.setValue("Missing CREATE STATEMENT");
				return false;
			} else if (data.toLowerCase().search("select") == -1) {
				editorResult.setValue("Missing SELECT STATEMENT");
				return false;
			}
			var db = new SQL.Database();
			var res = db.exec(data);

			var jsonData = "[";

			$.each(res, function(i, value) {

				$.each(value.values, function(j, value1) {

					var jsonArr = "{";

					$.each(value1, function(k, data) {

						jsonArr += '"' + value.columns[k] + '"  :' + '"' + data
								+ '"';

						if (value1.length != (k + 1)) {
							jsonArr += ",";
						}

					});

					jsonArr += "}";

					if (value.values.length != (j + 1)) {
						jsonArr += ",";
					}

					jsonData += jsonArr;
				});

				if (res.length != (i + 1)) {
					jsonData += ",";
				}
			});

			jsonData += "]";

			try {

				data = json2yaml(jsonData.trim());

				editorResult.setValue(data);

			} catch (e) {
				var errorData = "";

				errorData = errorData + "Error : " + e['message'];
				errorData = errorData + "\n";
				errorData = errorData + "Line : " + e['parsedLine'] + "  "
						+ e['snippet'];

				editorResult.setValue(errorData);
			}

			setOutputMsg("SQL TO YAML");
		}
	} catch (e) {
		editorResult.setValue(e.message);
	}
}

function FormatSQL() {
	editorResult.getSession().setUseWrapMode(true);

	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		$.ajax({
			type : "post",
			url : globalurl + "sql/formateSQL",
			dataType : "text",
			data : {
				data : oldformat
			},
			success : function(response) {
				try {

					editorResult.setValue(response);

				} catch (e) {
					openErrorDialog("Error..!");
				}
			},
			error : function(e, s, a) {
				openErrorDialog("Failed to load data=" + s);

			}
		});
		setOutputMsg("Beautify SQL");
	}
}

function MinifySQL() {
	editorResult.getSession().setUseWrapMode(true);
	var oldformat = editorAce.getValue();

	if (oldformat.trim().length > 0) {
		$.ajax({
			type : "post",
			url : globalurl + "sql/minifySQL",
			dataType : "text",
			data : {
				data : oldformat
			},
			success : function(response) {
				try {
					// var obj=JSON.parse(response);

					editorResult.setValue(response);

				} catch (e) {
					openErrorDialog("invalid SQL");
				}
			},
			error : function(e, s, a) {
				openErrorDialog("Failed Minifining=" + s);

			}
		});
		setOutputMsg("Minify SQL");
	}

}

function removeCommentsSQL() {
	editorResult.getSession().setUseWrapMode(true);
	var oldformat = editorAce.getValue();

	if (oldformat.trim().length > 0) {
		$.ajax({
			type : "post",
			url : globalurl + "sql/removeCommentsSQL",
			dataType : "text",
			data : {
				data : oldformat
			},
			success : function(response) {
				try {
					// var obj=JSON.parse(response);

					editorResult.setValue(response);

				} catch (e) {
					openErrorDialog("invalid SQL");
				}
			},
			error : function(e, s, a) {
				openErrorDialog("Failed Minifining=" + s);

			}
		});
		setOutputMsg("SQL without comments");
	}

}