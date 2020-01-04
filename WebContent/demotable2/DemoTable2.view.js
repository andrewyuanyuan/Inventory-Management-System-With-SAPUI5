sap.ui.jsview("demotable2.DemoTable2", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf demotable2.DemoTable2
	*/ 
	getControllerName : function() {
		return "demotable2.DemoTable2";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf demotable2.DemoTable2
	*/ 
	createContent : function(oController) {
			var oTable = new sap.ui.table.Table("tableId",{
			title: "Product Details",
			visibleRowCount:10,
			editable:false
		});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text:"Product ID"}),
			visible: true,
			template: new sap.ui.commons.TextView({text:"{products>ProductID}"})
		}) );
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text:"Product Name"}),
			visible: true,
			template: new sap.ui.commons.TextView({text:"{products>ProductName}"})
		}) );
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text:"Product Count"}),
			visible: true,
			template: new sap.ui.commons.TextView({text:"{products>UnitsInStock}"})
		}) );
		oTable.bindRows("products>/d/results");
		
               //Create a form to Update the Product
		var oLayout = new sap.ui.layout.form.SimpleForm("formId",{
			title: "Product Maintainance",
			content: [
		      new sap.ui.commons.Label({text: "Product ID"}),
		          		          new sap.ui.commons.TextField({
		        	  id: 'ProductId',
		        	  width: '200px',
		        	  value:'{singleproduct>/d/ProductID}',
		        	  editable: false
		        	  }),    
		          new sap.ui.commons.Label({text: "Product Name"}),
		          		          new sap.ui.commons.TextField({
		        	  id: 'ProductName',
		        	  width: '200px',
		        	  value:'{singleproduct>/d/ProductName}',
		        	  editable: false
		        	  }), 
                  
		          new sap.ui.commons.Label({text: "Product Count"}),
		         		          new sap.ui.commons.TextField({
		        	  id: 'ProductCount',
		        	  width: '200px',
		        	  value:'{singleproduct>/d/UnitsInStock}'
		        	  }), 
		          new sap.ui.commons.Label({text: ""}),
		          new sap.ui.commons.Button({
		        	  text: "Save",
		        	  width: '100px',
		        	  press: function() {
		        		  oController.update()
		        	  }
		          })
		          
            ]
			
		});
	
		//Create a file uploader form
var oUploadLayout = new sap.ui.layout.form.SimpleForm("uploadformId",{
			
			//title: "Product Maintainance",
			content: [
       new sap.ui.unified.FileUploader("fileUploader",{
      				width: "400px",
    				tooltip: "Upload your image",
    				placeholder: "Upload a product image to search...",
    				fileType: ["jpg", "png"],
    				maximumFileSize: 2,
    				uploadOnChange: false,
    				multiple: true,
    				buttonText: "Browse",
    				additionalData: "abc=123&test=456",
                  }),
		          new sap.ui.commons.Label({text: ""}),
		          new sap.ui.commons.Button({
		        	  text: "Search",
		        	  width: '150px',
		        	  height: '50px',
		        	  press: function() {
		        		  oController.onUpload()
		        	  }
		          })
		          
            ]
			
		});
		
		        var ele = [oTable,oLayout,oUploadLayout];
		return ele;
 	}
});