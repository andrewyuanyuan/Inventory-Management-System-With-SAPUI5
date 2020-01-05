sap.ui.controller("demotable2.DemoTable2", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf demotable2.DemoTable2
	 */
	onInit: function () {
		var sUrl = "https://cors-anywhere.herokuapp.com/https://bjxp7y1qfmxa1hwl-productsdata-srv.cfapps.eu10.hana.ondemand.com/odata/v2/CatalogService/Products";
		var oModel = sap.ui.model.json.JSONModel(sUrl);
		console.log(oModel);
		sap.ui.getCore().setModel(oModel, 'products');
	},

	onAfterRendering: function () {
		$("#formId").hide();
	},

	mode: 0,
	showform: function () {
		this.mode = "showform";
		$("#formId").slideDown(function () {})

	},
	onUpload: function () {
		var SingleID = "";
		var oFileUploader = sap.ui.getCore().byId("fileUploader");
		if (!oFileUploader.getValue()) {
			sap.m.MessageToast.show("Choose a file first");
		}
		var that = this;
		var f = document.querySelector('input[type="file"]').files[0];
		//Create form object and append file to the same
		var data = new FormData();
		data.append('files', document.getElementById("fileUploader-fu").files[0], document.getElementById(
			"fileUploader-fu").files[0].name);
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				var vjson = JSON.parse(this.responseText);
				//set the model for the UI5 table to populate product classification results
				var oModel1 = new sap.ui.model.json.JSONModel();
				oModel1.setData(vjson.predictions[0]);
				that.getView().setModel(oModel1);
				var label = vjson.predictions[0].results[0].label;
				var score = vjson.predictions[0].results[0].score;
			}
			var ProductImage = vjson.predictions[0].results[0].label;
			new sap.ui.commons.MessageBox.confirm("The uploaded product is " + ProductImage + ".Do you want to update the product count?", rCallAlertBack, "Confirmation");

			function rCallAlertBack(rValue) {
				if (rValue) //If User presses ‘Ok’
				{
					$("#uploadformId").hide();
					//mapped the retrieved value with the product ID for demo purpose ,we could write a simple logic to retrive the product ID from the Odata table as well

					SingleID = 0;
					if (ProductImage == 'printer') {
						SingleID = 2;
					} else if (ProductImage == 'notebook') {
						SingleID = 1;
					} else if (ProductImage == 'hard disc') {
						SingleID = 5;
					} else if (ProductImage == 'reflex camera') {
						SingleID = 4;
					} else if (ProductImage == 'mouse') {
						SingleID = 3;
					} else if (ProductImage == 'computer keyboard') {
						SingleID = 6;
					} else if (ProductImage == 'microphone') {
						SingleID = 7;
					} else if (ProductImage == 'backpack') {
						SingleID = 8;
					} else if (ProductImage == 'mobile phone') {
						SingleID = 9;
					} else if (ProductImage == 'watch') {
						SingleID = 10;
					} else {
						SingleID = 0;
						alert("Product " + ProductImage + " not found in the SAP");
					}

					var sUrl2 = "https://cors-anywhere.herokuapp.com/https://bjxp7y1qfmxa1hwl-productsdata-srv.cfapps.eu10.hana.ondemand.com/odata/v2/CatalogService/Products(" + SingleID + ")";
					var oModel2 = new sap.ui.model.json.JSONModel(sUrl2);
					console.log(oModel2);
					sap.ui.getCore().setModel(oModel2, 'singleproduct');

					$("#formId").slideDown(function () {})

					return false;
				} else // If the user presses ‘Cancel’
				{
					sap.ui.commons.MessageBox.alert("You are refussed to edit the product count", '', "Notification");
				}
			}

		});

		xhr.open("POST", "https://sandbox.api.sap.com/mlfs/api/v2/image/classification");
		xhr.setRequestHeader("apikey", "SPegI4wpf8cGLDG7hglAux4yif114dTw");
		xhr.setRequestHeader("accept", "application/json");
		xhr.send(data);

	},
	update: function () {
		this.mode = 'update';
		var productid = sap.ui.getCore().byId("ProductID").getValue();
		var productname = sap.ui.getCore().byId("ProductName").getValue();
		var productcount = sap.ui.getCore().byId("UnitsInStock").getValue();
		var sUrl = "https://bjxp7y1qfmxa1hwl-productsdata-srv.cfapps.eu10.hana.ondemand.com/odata/v2/CatalogService/Products";
		var oModels = new sap.ui.model.odata.v2.ODataModel(sUrl,true);
		var newData = {

			"ProductId": productid,
			"ProductName": productname,
			"ProductCount": productcount
		}

		OData.request({
			requestUri: "https://cors-anywhere.herokuapp.com/https://bjxp7y1qfmxa1hwl-productsdata-srv.cfapps.eu10.hana.ondemand.com/odata/v2/CatalogService/Products",
			method: "GET",
			headers: {
				
				"Allow-Control-Allow-Origin" : "*",
				
				"X-Requested-With": "XMLHttpRequest",

				"Content-Type": "application/atom+xml; charset=utf-8",

				"DataServiceVersion": "2.0",
			}

		}, function (data, request) {
			var id = $("#id").val();
			OData.request({
				requestUri: "https://cors-anywhere.herokuapp.com/https://bjxp7y1qfmxa1hwl-productsdata-srv.cfapps.eu10.hana.ondemand.com/odata/v2/CatalogService/Products(" + productid + ")",
				method: "PUT",
				headers: {
					"Allow-Control-Allow-Origin" : "*",
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml; charset=utf-8",
					"DataServiceVersion": "2.0",
					"Accept": "application/xml"
				},
				data: newData
			}, function (data, request) {

				alert("Update Success");
				location.reload(true);
			}, function (err) {

				alert("Update Failed");
			});

		}, function (err) {
			var request = err.request;
			var response = err.response;
			alert("Error in Get — Request " + request + " Response " + response);
		});

	}

});
