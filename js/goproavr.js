function setSerial()
{
	$('#mdserial').removeData("modal");
	$("#mdserial #mdserialbody").html('Select a serial device');
	$('#mdserial').modal('show');
	var html='<div class="panel panel-default">\
                        <div class="panel-heading">\
                            Select A Device\
                        </div>\
                        <!-- /.panel-heading -->\
                        <div class="panel-body pre-scrollable">\
                            <div class="table-responsive">\
                                <table class="table table-hover" id="tableserial">\
                                    <thead>\
                                        <tr>\
                                            <th>#</th>\
                                            <th>Path</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>';
	var onGetDevices = function(ports) 
	{
      for (var i=0; i<ports.length; i++) 
	  //for (var i=0; i<2; i++)
	  {
       console.log(ports[i].path);
	   html+='<tr class="clickable-row">\
                                            <td>'+(i+1).toString()+'</td>\
                                            <td>'+ports[i].path+'</td>\
                                        </tr>';
      }
	  html+="</tbody>\
                                </table>\
                            </div>\
                            <!-- /.table-responsive -->\
                        </div>\
                        <!-- /.panel-body -->\
                    </div>\
                    <!-- /.panel -->";
	  $("#mdserial #mdserialbody").html(html);
	  $("#mdserialbody .clickable-row").click(function()
	          {
                 if($(this).hasClass("bg-info"))
                 $(this).removeClass('bg-info');
                 else
                 $(this).addClass('bg-info').siblings().removeClass('bg-info');
			 
              });
    }
    chrome.serial.getDevices(onGetDevices);
	//onGetDevices();
	
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
	$("#buttonsetSerial").click(function()
    {
       console.log("Set Serial");
        //more code here...
    });
	
});

