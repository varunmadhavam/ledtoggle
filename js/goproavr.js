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
}


function setBluetooth()
{
 chrome.bluetooth.getAdapterState(function(adapter)
  {
    console.log("Adapter " + adapter.address + ": " + adapter.name);
  });
 chrome.bluetooth.getDevices(function(devices)
  {
		$('#mdbluetooth').removeData("modal");
		$("#mdbluetooth #mdbluetoothbody").html('Select a bluetooth device');
		$('#mdbluetooth').modal('show');
		var html='<div class="panel panel-default">\
    <div class="panel-heading">\
    Select A Device\
    </div>\
    <!-- /.panel-heading -->\
    <div class="panel-body pre-scrollable">\
    <div class="table-responsive">\
    <table class="table table-hover" id="tablebluetooth">\
    <thead>\
    <tr>\
    <th>#</th>\
		<th>Name</th>\
    <th>HW Address</th>\
    </tr>\
    </thead>\
    <tbody>';
  	for (var i = 0; i < devices.length; i++)
	 	{
    	console.log(devices[i].name+":"+devices[i].address);
			html+='<tr class="clickable-row">\
			<td>'+(i+1).toString()+'</td>\
			<td>'+devices[i].name+'</td>\
			<td>'+devices[i].address+'</td>\
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
	  $("#mdbluetooth #mdbluetoothbody").html(html);
		$("#mdbluetoothbody .clickable-row").click(function()
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
				    contype="bluetooth";
				    conpath=$(this).find('td:eq(2)').text();
				  }
				 console.log("type : "+contype+" addr : "+conpath);
     });
	});
}

function setUsbasp()
{
	$('#mdusbasp').modal('show');
	logmessage(msg_class_info,"Just an Info")
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
    });

    $("#buttonselecthex").click(function()
    {
    	chrome.fileSystem.chooseEntry({type: 'openFile'},readfile);
    });

    $("#bluetooth").click(function()
    {
    	setBluetooth();
    });

		$("#usbasp").click(function()
    {
    	setUsbasp();
    });

		$("#arduino").click(function()
    {
    	setArduino();
    });

		$("#buttonsetSerial").click(function()
    {
    	console.log("Set Serial");
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
	   	$('#mdburnflash').modal('show');
    });

		$("#buttonexit").click(function()
    {
       console.log("Set Serial");
    });

	getchips();
});

function hexToBytes(hex)
{
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function toHexString(byteArray)
{
  return byteArray.map(function(byte)
	{
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

function readfile(fileEntry)
{
  if(!fileEntry||chrome.runtime.lastError)
   {
     $("#OutputText").html("Error : "+chrome.runtime.lastError.message);
     return;
   }
  fileEntry.file(function(file)
	{
  	var reader = new FileReader();
  	reader.onload = function(e) {
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

function getchips()
{
	html='';
	for(var i=0;i<chips.chips.length;i++)
	{
		html=html+'<li id="'+i+'"><a href="#"><i class="fa fa-fw"></i>'+chips.chips[i].name+'</a></li>';
	}
	html=html+`<li class="divider"></li>
             <li>
             <a class="text-center" href="#">
             <strong>Detect Chip</strong>
             </a>
             </li>`;
  $("#chipselectdropdown").html(html);
  $("#chipselectdropdown li").click(function ()
	 {
  		setchip(parseInt($(this).attr('id')))
   });
}

function setchip(chipindex)
{
  console.log(chips.chips[chipindex].name);
}

function logmessage(msgclass,message)
{
	var html=$("#OutputTexttable").html();
	if(!html)
		html="";
	console.log("Reached");
	if(msgclass<=loglevel)
	{
		console.log("Reached:2");
		switch (msgclass)
		{
			case 3:
			        console.log("Reached:3");
              html=html+
							'<tr class="success">\
							 <td>'+msgcnt.toString()+'</td>\
							 <td>Info</td>\
							 <td>'+message+'</td>\
							 </tr>';
							 msgcnt=msgcnt+1;
							 console.log(html);
				       break;
			case 2:
							html=html+
							'<tr class="warning">\
							 <td>'+msgcnt.toString()+'</td>\
							 <td>Warning</td>\
							 <td>'+message+'</td>\
			 				 </tr>';
			 				msgcnt=msgcnt+1;
							break;
			case 1:
							html=html+
							'<tr class="danger">\
							 <td>'+msgcnt.toString()+'</td>\
							 <td>Error</td>\
							 <td>'+message+'</td>\
							 </tr>';
							msgcnt=msgcnt+1;
			        break;
		}
		$("#OutputTexttable").html(html);
	}
}
