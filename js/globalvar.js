var contype="";
var conpath="";
var hexdata="";
var error=false;
var startaddress;

var chipname="";
var chipcode=new Uint8Array(3);
var chipinfo=new Uint32Array(10);// 0->wordsize_flash,1->wordsize_eeprom,2->flash_size,3->eeprom_size,4->pagesize_flash,
                                 // 5->pagesize_eeprom,6->twd_fuse,7->twd_flash,8->twd_eeprom,9->twd_erase