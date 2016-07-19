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
											<th>Name</th>\
                                            <th>Path</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>';
	var onGetDevices = function(ports) 
	{
      for (var i=0; i<ports.length; i++) 
	  //for (var i=0; i<2; i++)
	  {
	   html+='<tr class="clickable-row">\
                                            <td>'+(i+1).toString()+'</td>\
											<td>'+ports[i].displayName+'</td>\
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
				 {
                  $(this).removeClass('bg-info');
				  contype="";
				  conpath="";
				 }
                 else
				 {
                 $(this).addClass('bg-info').siblings().removeClass('bg-info');
				 contype="serial";
				 conpath=$(this).find('td:eq(2)').text();
				 }
				 console.log("type : "+contype+" path : "+conpath);		 
              });
    }
    chrome.serial.getDevices(onGetDevices);
	//onGetDevices();
	
}
function setBluetooth()
{
	$('#mdbluetooth').modal('show');
	chrome.bluetooth.getAdapterState(function(adapter) {
    console.log("Adapter " + adapter.address + ": " + adapter.name);
});
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    console.log(devices[i].name+":"+devices[i].address);
  }
});
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

    $("#buttonselecthex").click(function()
    {
        chrome.fileSystem.chooseEntry({type: 'openFile'},readfile);
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
	
	$(".modal-wide").on("show.bs.modal", function() 
	{
      var height = $(window).height() - 200;
      $(this).find(".modal-body").css("max-height", height);
    });
	
	$("#buttonburnflash").click(function()
    {
       console.log("Burn Flash");
       $('#mdburnflash').removeData("modal");
	  // $("#mdburnflash #mdburnflashbody").html('Select a serial device');
	   $('#mdburnflash').modal('show');
    });
	
	$("#buttonexit").click(function()
    {
       console.log("Set Serial");
        //more code here...
    });
	
});

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function toHexString(byteArray) {
  return byteArray.map(function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

function readfile(fileEntry)
{
  if(!fileEntry)
   {
     $("#OuptutText").html("User did not choose a file");
     return;
   }
  fileEntry.file(function(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
  //console.log(e.target.result);
  var text = e.target.result;
  var lines = text.split(/[\r\n]+/g);
  var linecount=0;
  for(var i = 0; i < lines.length; i++) 
   {
	   var line=lines[i];
	   if(line!=null)
		   if(line[0]==':')
		   {
			   if(line.slice(7,9).toString().localeCompare("01")==0)
			   {
				   break;
			   }
			   if(linecount==0)
			   {
				   linecount=1;
				   startaddress=hexToBytes(line.slice(3,7));
				   //console.log(toHexString((startaddress[0]<<8) | startaddress[1]));
				   console.log(toHexString(startaddress));
			   }
               hexdata=hexdata+line.slice(9,line.length-2);			   
		   }
	       else
		   {
			   console.log("error");
			   error=true;
			   break;
	       }
	                                  
   }
   console.log(hexToBytes(hexdata));
 };
 reader.readAsText(file);
 });
}

