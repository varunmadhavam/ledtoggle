function setSerial()
{
	//$('#mdserial').removeData("modal");
	//$("#mdserial #mdserialbody").html('Select a serial device');
	$('#mdserial').modal('show');
	//var html='<select class="selectpicker show-tick"  data-width="auto">';
	/*var onGetDevices = function(ports) 
	{
      for (var i=0; i<ports.length; i++) 
	  {
       console.log(ports[i].path);
	   html+="<option>"+ports[i].path+"<option>";
      }
	  html+="</select>"
	  $("#mdserial #mdserialbody").html(html);
    }*/
    //chrome.serial.getDevices(onGetDevices);
}
function setBluetooth()
{
	$('#mdbluetooth').modal('show');
}
function setUsbasp()
{
	$('#mdusbasp').modal('show');
}
function setArduino()
{
	$('#mdarduino').modal('show');
}


$(document).ready(function()
{
    $("#serial").click(function()
    {
        setSerial();
        //more code here...
    });
    $("#bluetooth").click(function()
    {
        setBluetooth();
        //more code here...
    });
	$("#usbasp").click(function()
    {
        setUsbasp();
        //more code here...
    });
	$("#arduino").click(function()
    {
        setArduino();
        //more code here...
    });
	
	$(".clickable-row").click(function(){
    if($(this).hasClass("bg-info"))
        $(this).removeClass('bg-info');
    else
        $(this).addClass('bg-info').siblings().removeClass('bg-info');
})
});

