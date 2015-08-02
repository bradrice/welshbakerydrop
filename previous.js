<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title></title>
    <!--[if lte IE 7]> <html class="ie7"> <![endif]-->
    <!--[if IE 8]> <html class="ie8"> <![endif]-->
    <!--[if IE 9]> <html class="ie9"> <![endif]-->
    <!--[if !IE]><!--> <html> <!--<![endif]-->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script src="http://www.welshbaker.com/js/jquery.cookie.js"></script>
    <script type="text/javascript" language="JavaScript">
var textArea = '';
var catId = '';
var Quantity = '';
var ProductId = '';
var Flavor = '';
var Choice = '';
var Count = 0;
var CountExtra = 0;
var TotalQuantity = '';
var TotalQuantityExtra = '';
var txtareaproduct = document.getElementsByName("txtareaproduct");
var txtareaproductvalue = '';
var productName;
var Product_price = 0;
var ExtraQuantity = '';
var radioButtons = document.getElementsByName("pickbox");
var strQuery = '';
var strPrice = '';
var chngTextArea = "";
if (!jQuery.cookie('viewCart')) {
    $.cookie("viewCart", 0);
}

window.onload = function () {
    //Bind dropdown
    strQuery = QuseryStringValue('product');

    $.ajax({
        type: "GET",
        url: "xml/product.xml?dummy=" + Math.random(),
        dataType: "xml",
        success: function (xml) {
            var strProduct = '';
            $(xml).find('ProductName').each(function () {
                var value = $(this).find('Name').text();
                strProduct = '';
                if (strQuery == $(this).find('Id').text()) {
                    strPrice = $(this).find('Price').text();
                    strProduct = strProduct + "<tr><td  width='1%' height='35' align='left' valign='middle' ><input type='hidden' id='hdnCatalogId" + $(this).find('Id').text() + "' value='" + $(this).find('CatalogId').text() + "' /><input type='hidden' id='hdnYourOption" + $(this).find('Id').text() + "' value='" + $(this).find('YourOption').text() + "' /><input type='hidden' id='hdnProdcutExtra" + $(this).find('Id').text() + "' value='" + $(this).find('Extra').text() + "' /> <input type='hidden' id='hdnExtraQty" + $(this).find('Id').text() + "' value='" + $(this).find('ExtraQuantity').text() + "' /><input type='radio' checked id='" + $(this).find('Name').text() + "' onclick='callProduct(" + $(this).find('Price').text() + "," + $(this).find('Id').text() +  ");' value='" + $(this).find('Id').text() + "' name='pickbox' attr='" + $(this).find('Quantity').text() + "' /></td><td width='69%' height='35' align='left' valign='middle' style='font-size: 16px'>" + $(this).find('Name').text() + "</td></tr>";
                }
                else {
                    strProduct = strProduct + "<tr><td  width='1%' height='35' align='left' valign='middle' ><input type='hidden' id='hdnCatalogId" + $(this).find('Id').text() + "' value='" + $(this).find('CatalogId').text() + "' /><input type='hidden' id='hdnYourOption" + $(this).find('Id').text() + "' value='" + $(this).find('YourOption').text() + "' /><input type='hidden' id='hdnProdcutExtra" + $(this).find('Id').text() + "' value='" + $(this).find('Extra').text() + "' /> <input type='hidden' id='hdnExtraQty" + $(this).find('Id').text() + "' value='" + $(this).find('ExtraQuantity').text() + "' /><input type='radio' id='" + $(this).find('Name').text() + "' onclick='callProduct(" + $(this).find('Price').text() + "," + $(this).find('Id').text() + ");' value='" + $(this).find('Id').text() + "' name='pickbox' attr='" + $(this).find('Quantity').text() + "' /></td><td width='69%' height='35' align='left' valign='middle' style='font-size: 16px'>" + $(this).find('Name').text() + "</td></tr>";
                }
                $('#tblProduct').append(strProduct);
            });

        }
    });
    var flag = $.cookie("viewCart")
    if (flag == 1) {
        $.cookie("viewCart", 0);
        $("#loading").toggle();
        window.location.href = "http://www.welshbaker.com/view_cart.asp";
    }
    else {
        if (strQuery != '' || strQuery == null) {
            setTimeout(function () {
                $("#loading").toggle();
                callProduct(strPrice,strQuery);
                $("#loading").toggle();
            }, 500);

        }
    }
}


function QuseryStringValue(QID) {

    var QStringOriginal = window.location.search.substring(1);
    QString = QStringOriginal.toLowerCase();
    var qsValue = '';
    QID = QID.toLowerCase();
    var qsStartPoint = QString.indexOf(QID);
    if (qsStartPoint != -1) {
        qsValue = QStringOriginal.substring(qsStartPoint + QID.length + 1);
        var qsEndPoint = qsValue.indexOf('&');
        if (qsEndPoint != -1) {
            qsValue = qsValue.substring(0, qsEndPoint);
        }
        else if (qsValue.indexOf('#') != -1) {
            qsEndPoint = qsValue.indexOf('&');
            qsValue = qsValue.substring(0, qsEndPoint);
        }
        else {
            qsValue = qsValue.substring(0);
        }
    }
    return qsValue;
}

function StartOver() {
    location.reload();
}
function callProduct(price,productId) {
    $("#loading").toggle();
    var quantity = 0;
    var quantityExtra = 0;
    Count = 0;
    CountExtra = 0;

    document.getElementById('ddlselection').options.length = 0;
    if (txtareaproduct != null || txtareaproduct != '') {
        document.getElementById('ddlFlavor').options.length = 0;
        document.getElementById("ddlChoice").options.length = 0;
        bindFlavor(document.getElementById('ddlFlavor'),productId);
    }

    for (var x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            ProductId = radioButtons[x].value;
            if ($('#hdnProdcutExtra' + radioButtons[x].value).val() == "0") {
                $('#ddlChoiceQuantity').hide();
                $('#ddlChoice').hide();
                $('#spChoiceQty').hide();
                $('#spExtra').hide();
                $('#spExtraChoice').hide();
                document.getElementById('ddlChoiceQuantity').options.length = 0;
                TotalQuantityExtra = 0;
                $("#spRemainChoice").text(TotalQuantityExtra);
            }
            else {
                if ($('#hdnExtraQty' + radioButtons[x].value).val() != "0" && $('#hdnExtraQty' + radioButtons[x].value).val() != '') {
                    $('#ddlChoiceQuantity').show();
                    $('#ddlChoice').show();
                    $('#spChoiceQty').show();
                    $('#spExtra').show();
                    $('#spExtraChoice').show();
                    var quanExtra = document.getElementById("ddlChoiceQuantity");
                    quantityExtra = $('#hdnExtraQty' + radioButtons[x].value).val();
                    document.getElementById('ddlChoiceQuantity').options.length = 0;
                    for (var i = 1; i <= quantityExtra; i++) {
                        var newOption = document.createElement("option");
                        newOption.value = i;
                        newOption.text = i;
                        quanExtra.add(newOption);
                    }
                    TotalQuantityExtra = quantityExtra;
                    $("#spRemainChoice").text(TotalQuantityExtra);
                }
                else {
                    $('#ddlChoiceQuantity').hide();
                    $('#ddlChoice').hide();
                    $('#spChoiceQty').hide();
                    $('#spExtra').hide();
                    $('#spExtraChoice').hide();
                    document.getElementById('ddlChoiceQuantity').options.length = 0;
                    TotalQuantityExtra = 0;
                    $("#spRemainChoice").text(TotalQuantityExtra);
                }
            }
            $('#ddlFlavor').show();
            $('#ddlselection').show();
            $('#ddlQuantity').show();
            $('#dvBox2').show();
            $('#dvBox3').show();
            quantity = radioButtons[x].getAttribute("attr");
            TotalQuantity = radioButtons[x].getAttribute("attr");
            $("#spRemainFlavor").text(TotalQuantity);
            textArea = $('#hdnYourOption' + ProductId).val();
            catId = $('#hdnCatalogId' + ProductId).val();
            if (txtareaproductvalue == '') {
                txtareaproductvalue = radioButtons[x].getAttribute("id");
                $('#txtareaproduct').val(txtareaproductvalue);
            }
            Product_price = price;
            $('#lblPrice').show();
            $('#divPrice').show();
            $('#spanPrice').text(price);
            txtareaproductvalue = '';

        }
    }
    if (quantity > 0) {
        var quan = document.getElementById("ddlQuantity");
        document.getElementById('ddlQuantity').options.length = 0;
        for (var i = 1; i <= quantity; i++) {
            var newOption = document.createElement("option");
            newOption.value = i;
            newOption.text = i;
            quan.add(newOption);
        }
        Quantity = document.getElementById("ddlQuantity").value;
    }
    $("#loading").toggle();
}



function bindFlavor(select,productId) {
    $.ajax({
        type: "GET",
        url: "xml/product.xml?dummy=" + Math.random(),
        dataType: "xml",
        success: function (xml) {
            $(xml).find('FlavorName').each(function () {

                if ($(this).find('ExcludedId').length==0 ||
                    $(this).find('ExcludedId').text().indexOf(productId)==-1) {
                    $(this).find('Name').each(function () {
                        var value = $(this).text();
                        var newOption = document.createElement("option");
                        newOption.value = value;
                        newOption.text = value;
                        select.add(newOption);
                    });
                }
            });

            $(xml).find('ExtraChoiceName').each(function () {
                $(this).find('Name').each(function () {
                    var value = $(this).text();
                    var newChoiceOption = document.createElement("option");
                    newChoiceOption.value = value;
                    newChoiceOption.text = value;
                    document.getElementById("ddlChoice").add(newChoiceOption);
                });
            });
        }
    });

};


function SelectFlavor(item) {

    var cntQnt = 0;

    if (item == 'ddlFlavor') {
        if ($("#ddlFlavor option:selected").text() != null && $("#ddlFlavor option:selected").text() != '') {
            $("#ddlFlavor").prop("disabled", true);
            Count = Count + parseInt(document.getElementById("ddlQuantity").value);
            if (Count <= TotalQuantity) {
                $("#spRemainFlavor").text(TotalQuantity - Count);
                var src = document.getElementById(item);
                var dest = document.getElementById("ddlselection");
                Quantity = document.getElementById("ddlQuantity").value;
                for (var count = 0; count < src.options.length; count++) {
                    if (src.options[count].selected == true) {
                        var option = src.options[count];
                        var newOption = document.createElement("option");
                        newOption.value = option.value;
                        newOption.text = option.text + " (" + Quantity + ")";
                        newOption.tagName = Quantity;
                        txtareaproductvalue = txtareaproductvalue + "," + option.text + " (" + Quantity + ")";
                        $("#txtareaproduct").val(txtareaproductvalue);
                        newOption.selected = true;
                        Flavor = option.value;
                        try {
                            $('#ddlselection  option').each(function () {
                                if (this.value == option.text) {
                                    var pos = this.text.indexOf("(") + 1;
                                    cntQnt = this.text.slice(pos, this.text.lastIndexOf(")"));
                                    this.text = option.text + " (" + (parseInt(cntQnt) + parseInt(Quantity)) + ")";
                                }
                            });

                            if (parseInt(cntQnt) > 0) {
                                //Standard
                                cntQnt = 0;
                            }
                            else {
                                dest.add(newOption, null);
                            }

                        } catch (error) {
                            //dest.add(newOption); // IE only
                            $('#ddlselection  option').each(function () {
                                if (this.value == option.text) {
                                    var pos = this.text.indexOf("(") + 1;
                                    cntQnt = this.text.slice(pos, this.text.lastIndexOf(")"));
                                    this.text = option.text + " (" + (parseInt(cntQnt) + parseInt(Quantity)) + ")";
                                }
                            });

                            if (parseInt(cntQnt) > 0) {
                                cntQnt = 0;
                            }
                            else {
                                dest.add(newOption); // IE only
                            }
                        }
                    }
                }
                document.getElementById("ddlQuantity").selectedIndex = 0;
                document.getElementById("ddlChoiceQuantity").selectedIndex = 0;
            }
            else {
                Count = Count - parseInt(document.getElementById("ddlQuantity").value);
                if (Count < TotalQuantity) {
                    var rmainProduct = TotalQuantity - Count;
                    alert("Please add only " + rmainProduct + " more flavors");
                }
                if (Count == TotalQuantity) {
                    alert("Sorry, you have reached the limit of this box.\nYou have already added " + Count + " packs");
                }
            }
            $("#ddlFlavor").prop("disabled", false);
        }
    }
    if (item == 'ddlChoice') {
        if ($("#ddlChoice option:selected").text() != null && $("#ddlChoice option:selected").text() != '') {
            $("#ddlChoice").prop("disabled", true);
            CountExtra = CountExtra + parseInt(document.getElementById("ddlChoiceQuantity").value);
            if (CountExtra <= TotalQuantityExtra) {
                $("#spRemainChoice").text(TotalQuantityExtra - CountExtra);
                var src = document.getElementById(item);
                var dest = document.getElementById("ddlselection");
                for (var count = 0; count < src.options.length; count++) {
                    if (src.options[count].selected == true) {
                        var option = src.options[count];
                        var newOption = document.createElement("option");
                        newOption.value = option.value;
                        newOption.text = option.text + " (" + document.getElementById("ddlChoiceQuantity").value + ")";
                        txtareaproductvalue = txtareaproductvalue + "," + option.text + " (" + document.getElementById("ddlChoiceQuantity").value + ")";
                        $("#txtareaproduct").val(txtareaproductvalue);
                        newOption.selected = true;
                        Choice = option.value;
                        try {
                            // dest.add(newOption, null); //Standard
                            $('#ddlselection  option').each(function () {
                                if (this.value == option.text) {
                                    var pos = this.text.indexOf("(") + 1;
                                    cntQnt = this.text.slice(pos, this.text.lastIndexOf(")"));
                                    this.text = option.text + " (" + (parseInt(cntQnt) + parseInt(Quantity)) + ")";
                                }
                            });
                            if (parseInt(cntQnt) > 0) {
                                cntQnt = 0;
                            }
                            else {
                                dest.add(newOption, null);
                            }
                        } catch (error) {
                            //dest.add(newOption); // IE only
                            $('#ddlselection  option').each(function () {
                                if (this.value == option.text) {
                                    var pos = this.text.indexOf("(") + 1;
                                    cntQnt = this.text.slice(pos, this.text.lastIndexOf(")"));
                                    this.text = option.text + " (" + (parseInt(cntQnt) + parseInt(Quantity)) + ")";
                                }
                            });
                            if (parseInt(cntQnt) > 0) {
                                //Standard
                                cntQnt = 0;
                            }
                            else {
                                dest.add(newOption); // IE only
                            }
                        }
                    }
                }
                document.getElementById("ddlQuantity").selectedIndex = 0;
                document.getElementById("ddlChoiceQuantity").selectedIndex = 0;
            }
            else {
                CountExtra = CountExtra - parseInt(document.getElementById("ddlChoiceQuantity").value);
                if (CountExtra < TotalQuantityExtra) {
                    var rmainProduct = TotalQuantityExtra - CountExtra;
                    alert("Please add only " + rmainProduct + " more extra choices");
                }
                if (CountExtra == TotalQuantityExtra) {
                    alert("Sorry, you have reached the limit of this box.\nYou have already added " + CountExtra + " extras");
                }
            }
            $("#ddlChoice").prop("disabled", false);
        }
    }
}

function validate() {
    if (Flavor == null || Flavor == '') {
        alert("Please select flavor.")
    }
    else {
        if (Count < TotalQuantity) {
            var rmainProduct = TotalQuantity - Count;
            alert("Please add " + rmainProduct + " more flavors")
        }
        else {
            if ($('#hdnExtraQty' + ProductId).val() == "0" && $('#hdnExtraQty' + ProductId).val() != '') {
                $('#ddlselection  option').each(function () {
                    chngTextArea = chngTextArea + "," + this.text;

                });
                $("#txtareaproduct").val(chngTextArea);
                $("#btnAddToCart").prop('disabled', true);
                addtoCart();
            }
            else {
                if (Choice == null || Choice == '') {
                    alert("Please select extra choice.")
                }
                else {
                    if (CountExtra < TotalQuantityExtra) {
                        var rmainProduct = TotalQuantityExtra - CountExtra;
                        alert("Please add " + rmainProduct + " more choices")
                    }
                    else {
                        $('#ddlselection  option').each(function () {
                            chngTextArea = chngTextArea + "," + this.text;
                        });
                        $("#txtareaproduct").val(chngTextArea);
                        $("#btnAddToCart").prop('disabled', true);
                        addtoCart();

                    }
                }
            }
        }
    }
}


//-----------------------// Add to Cart Start//-----------------------//
function addtoCart() {
    $("#loading").toggle();
    $.cookie("viewCart", 1);

    var selectedProduct = chngTextArea;
    var customizevalue = new Array();
    customizevalue = selectedProduct.split(",");
    productName = customizevalue[0];
    var product = new Array();
    test = new Array();
    Array.prototype.removeByIndex = function (index) {
        this.splice(index, 1);
    }
    customizevalue.removeByIndex(0);
    function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (customizevalue[i] == val) {
                customizevalue.splice(i, 1);

                break;
            }
        }
    }


    function add(index, productName, product) {
        var form = createBaseForm(index, productName, product);
        form.appendTo('#cart_helper');
        form.submit();
    }

    function createBaseForm(index, productName, product) {
        var baseForm = $('<form />', {
            enctype: "multipart/form-data",
            method: "post",
            action: "http://www.welshbaker.com/add_cart.asp",
            style: "display: block",
            target: "_self"
        });
        var cartId = ProductId;
        var product_options = textArea;
        var cat_getid = catId;
        var productOptionsValue = product;

        addInput('item_id', cat_getid, baseForm);
        addInput('itemid', cartId, baseForm);
        addInput('category_id', '[catid]', baseForm);
        addInput('qty-0', '1', baseForm);
        addInput('std_price', '10.00', baseForm);
        addInput(product_options, productOptionsValue, baseForm);
        addInput('specialamount', Product_price, baseForm);
        return baseForm;
    }
    add(2, productName, customizevalue);

    function addInput(name, value, form) {
        if (name && value) {
            $('<input>').attr({
                type: 'hidden',
                name: name,
                value: value
            }).appendTo(form);
        }
    }

}


//-----------------------// Add to Cart End //-----------------------//


</script>
<style>

.ie7 .pick-a-box-bottom-content-div{
    margin-left:25px;

}
.ie8 .pick-a-box-bottom-content-div{
    margin-left:25px;
}


#dialog-box-main-div
{
    margin: 0 auto 0 162px;
    margin: 0 0 0 168px\9;
    width: 87%;

}
#dialog-box-main-div h2
{
    font-size: 18px;
    width: 820px;
    padding-left:200px\9;
    color: #333;
    margin: 0px;
    padding: 0px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    margin-bottom: 20px;
}
.dialog-box1
{
    float: left;
    width: 190px;
    border: #000 solid 1px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    margin-right: 3px;
    padding:0 0 21px 0\9;
    padding-bottom:20px\9;
    height: 558px;
    height:570px\9;
}
.dialog-box3
{
    float: left;
    border: #000 solid 1px;
    width: 200px;
    margin-left: 3px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    height:240px;
    padding-bottom: 20px;
}
.dialog-box4
{
    float: right;
    width: 120px;
    border: #000 solid 1px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
}
.pick-a-box-heading
{
    background: #000;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    font-family: Monotype Corsiva;
    -webkit-border-top-left-radius: 15px;
    -webkit-border-top-right-radius: 15px;
    -moz-border-radius-topleft: 15px;
    -moz-border-radius-topright: 15px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
p
{
    font-family: Arial,Helvetica,sans-serif;
    font-size: 12px;
    margin: 0;
    padding: 15px 0 15px 8px;
    text-align: left;
}
.pick-a-box-redio-content-div
{
    font-family: Arial,Helvetica,sans-serif;
    font-size: 12px;
    margin: 10px auto;
    padding: 0 6px;
}


.pick-a-box-bottom-content-div
{
    width: 140px;
    margin: 10px 20px;
}
.pick-a-box-bottom-content-div p
{
    font-family: Arial,Helvetica,sans-serif;
    font-size: 11px;
    margin: 0;
    padding: 0 0 5px;
    text-align: center;
}
.button-yallow-1
{
    /* background-color: #900202;*/
    border: 1px solid #000000;
    color: #1B115C;
    font-size: 30px;
    padding: 8px 0 7px;
    text-align: center;
    font-family: arial;
}
.button-yallow-2
{
    /*background-color: #787878;*/
    background-color: #900202;
    border: 1px solid #000000;
    color: Yellow;
    font-size: 13px;
    margin: 7px 0;
    padding: 5px 0 7px;
    text-align: center;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    font-family: arial;
    font-weight:bold;
}
.dialog-box2
{
    float: left;
    width: 412px;
    height:558px;
    border: #000 solid 1px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    height:570px\9;

}
.two_left_part
{
    float: left;
    width: 49%;
}
.two_left_part strong
{
    float: left;
    font-family: arial;
    font-size: 12px;
    font-weight: bold;
    padding: 8px 0 8px 8px;
    width: 100%
}
#spExtra strong
{
    float: left;
    font-family: arial;
    font-size: 12px;
    font-weight: bold;
    padding: 8px 0 8px 27px;
    width: 100%
}
select
{
    margin: 0 0 10px 10px;
    float: left;
    width: 90%;
}
.two_right_part
{
    float: right;
    width: 49%;
    text-align: center;
}
.dialog-box2_bottom_div
{
    color: #1B115C;
    float: left;
    font-family: arial;
    font-size: 17px;
    font-style: italic;
    text-align: center;
    width: 100%;
}
.start_button
{
    background: none repeat scroll 0 0 #800000;
    border: solid 1px #333;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    padding: 4px 18px;
    color: #fff;
    cursor: pointer;
}
.start_button:hover
{
    background: #9b0101;
}
.add_button
{
    background: none repeat scroll 0 0 #800000;
    border: solid 1px #333;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    padding: 4px 18px;
    color: #fff;
    cursor: pointer;
    margin-top: 25px;
    margin-bottom:17px\9;
    margin-left: 0px;
    margin-bottom:20px;
}
.add_button:hover
{
    background: #9b0101;
}
.dialog-box2_bottom_div span
{
    color: #d301b9;
}
textarea
{
    font-family: Arial,Helvetica,sans-serif;
    font-size: 12px;
    margin: 0 0 8px 13px;
    padding: 8px;
    text-align: left;
    width: 70%;
}
.date_div
{
    font-size: 11px;
    float: left;
    padding: 5px 10px;
    font-family: Arial, Helvetica, sans-serif;
}
.date_div strong
{
    font-weight: bold;
}
.you_can
{
    float: left;
    text-align: center;
    width: 100%;
}
#spChoiceQty p {
    float: left;
    font-family: Arial,Helvetica,sans-serif;
    font-size: 12px;
    margin: 0;
    padding: 0 0 15px 8px;
    text-align: left;
    width: 100%;
}
</style>
</head>
<body>
<div id="dialog-box-main-div" style="width: 1056px; height: 1406px">
    <h2 style="text-align:center;">
    <font face="Arial Rounded MT Bold" size="5">Ordering is easy - Pick a
box, fill it and we ship it to you for <font color="#FF0000">
    <span style="background-color: #FFFF00">FREE!</span></font></font></h2>
<div class="dialog-box1" style="width: 241px; height: 571px">
    <div class="pick-a-box-heading">
    <a href="http://www.welshbaker.com/BoxDeals" style="text-decoration: none">
    <font color="#FFFFFF" face="Arial Rounded MT Bold" size="5">1.Pick a Box
</font></a> </div>
<div class="pick-a-box-redio-content-div" style="overflow-y:scroll; overflow-x:hidden; height:375px; width:226px">
    <table id="tblProduct" width="100%" border="0" cellspacing="0" cellpadding="0" >
    </table>
    </div>
    <div class="pick-a-box-bottom-content-div" style="width: 193px; height: 214px">
    <p class="pick-a-box-small-text" id="lblPrice" style="display: none">
    This
Box Price is*</p>
<div class="button-yallow-1" id="divPrice" style="display: none">
    $ <span id="spanPrice"></span>
    </div>
    <div class="button-yallow-2">
    ALL BOXES<br />
SHIP FOR FREE!</div>
<p style="text-align: center;">
    *Got a promo code to save money? <br>
You can enter it at checkout. <br>
<!--  <p style="text-align: left;">
    Learn about promocodes</p>-->
</p>
</div>
</div>
<div class="dialog-box2" id="dvBox2" style="display: none; width:450px; height:700px">
    <div class="pick-a-box-heading">
    <font face="Arial Rounded MT Bold" size="5">2. Add Items to Fill Your Box</font></div>
<div class="two_left_part" style="width: 209px; height: 1200px">
    <strong style="float: left;font-family: arial;font-size: 12px;font-weight: bold;text-align: center">
    Click to Add Yummies to your box</strong><p style="width:120px; float:left;">
    Select a Qty To Add</p>
<select name="ddlQuantity" id="ddlQuantity" style="margin-top: 17px; display: none;width:61 !important;height:22">
    </select>
    <select size="18" onclick="SelectFlavor('ddlFlavor')" name="ddlFlavor" id="ddlFlavor"
style="display: none;"></select><span id="spExtra" ><strong>Click to add
<a target="_blank" href="http://www.welshbaker.com/Extras">Extras</a> to your box</strong></span>
<span id="spChoiceQty">
    <p style="width:100px; float:left;">Select Qty to Add
</p></span>
<select name="ddlChoiceQuantity" id="ddlChoiceQuantity" style="margin-top:3px; display: none;width:50px !important;" >
    </select>
    <select size="9" name="ddlChoice" id="ddlChoice" onclick="SelectFlavor('ddlChoice')"
style="display: none;"></select> </div>
<div class="two_right_part" style="width: 220px; height: 379px">
    <strong style="float: left;font-family: arial;font-size: 12px;font-weight: bold;padding: 8px 0 8px 8px;width: 100%;text-align: center;">
    Here's a List of what is in your box<strong style="text-align: center;"><span style="font-weight: 400; font-style: italic"><br>
</span> </strong></strong>&nbsp;<select size="18" name="ddlselection" id="ddlselection" style="display: none; margin-top: 4px;">
    </select>
    <p>
    <strong style="float: left;font-family: arial;font-size: 12px;font-weight: bold;text-align: center">
    <strong style="text-align: center;">
    <span style="font-weight: 400; font-style: italic">Note: Scones &amp; Shortbread
may not always be available to purchase and they only fit into
12+ boxes and boxes that contain Extras</span>.<br>
</strong><span style="font-weight: 400; font-style: italic"><br>
WF = Wheat Free</span></strong></p>
<textarea id="txtareaproduct" name="txtareaproduct" style="display: none;"></textarea>
    </div>


    </div>


    <div class="dialog-box3" id="dvBox3" style="display: none; width:209px; height:270px">
    <div class="pick-a-box-heading">
    <font face="Arial Rounded MT Bold" size="5">3. Add to Cart</font></div>
<div class="you_can"> <div class="dialog-box2_bottom_div" style="margin-top: 14px;">You need to add <br/><span id="spRemainFlavor">2</span> More Pack(s) <br><span id="spExtraChoice" style="color:#1B115C;"> and <span id="spRemainChoice">1</span> More Extra(s) <br/>to your box.</span></div>
<input type="button" name="Add to cart" id="btnAddToCart" class="add_button" onclick="validate();"
value="Add to cart" />

    <input type="button" name="Start_button" class="start_button" value="Start Over"
onclick="StartOver()" />
    </div></div>
<div id="cart_helper">
    </div>
    </div>

    <div id="loading" align="center" style="z-index: 999; position: fixed; display: none; filter:alpha(opacity=30);width:965px; height:488px !important; top:25%; z-index:2; padding-top:200px">
    <img alt="Loading..." id="ImgLoader" runat="server" src="assets/images/loadingImg.gif" />
    </div>
    </body>
    </html>