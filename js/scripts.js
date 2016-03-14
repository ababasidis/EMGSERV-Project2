	//now what?
	/*if they enter an orgId (we will get it next class through a search), we need to find:
		-What different areas of information the organization has (/Application/Tabs?orgId=x)
		-then, find each area on demand (each will need it's own call)
			General
				Path: ...ESD/{orgId}/General  (this one we did together!)
			Locations
				Path: ...ESD/{orgId}/Locations
			Treatment
				Path: ...ESD/{orgId}/Treatments
			Training
				Path: ...ESD/{orgId}/Training
			Facilities
				Path: ...ESD/{orgId}/Facilities
			Equipment
				Path: ...ESD/{orgId}/Equipment
			Physicians
				Path: ...ESD/{orgId}/Physicians
			People
				Path: ...ESD/{orgId}/People
	*/
	
///////////////////////////////////////
//Build the search functionality.
//onload, get the cities for the state.
	$(document).ready(function(){
		getCities('NY');
		getOrgTypes();
	});
	
//For now, this will be a select to get the 'tabs' needed for the orgId.   
// For the project you will do this with tabs from the jQuery UI.
function getData(id){
//we need to figure out how many 'tabs' or areas of information this type of org has
		$.ajax({
			type:'get',
			async:true,
			url:'proxy.php',
			data:{path:'/Application/Tabs?orgId='+id},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
					//output that server is down/sucks
				}else{
					//data should be an xml doc with the tabs that I need
					//var x='<select onchange="window[\'get\'+$(this).val()]('+id+')">';				
					//var x='';
					//$('Tab',data).each(function(){
					//	x+='<option value="'+$(this).text()+'">'+$(this).text()+'</option>';
					//});
					
					//dump it out
					//$('#dump').html(x+'</select>');
					getGeneral(id);
					getLocations(id);
					getTraining(id);
					getTreatment(id);
					getFacilities(id);
					getPhysicians(id);
					getPeople(id);
				}
			}
		});
	}
	// This will be called by the changing of the select to get the general information for orgId
	function getGeneral(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/General'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
//make a table from the XML, the following comments shows what the xml looks like:
//<data>
//<name>Some Hospital</name>
//<description>Something cool here about the hospital</description>
//<email>sf@lkj.sdf</email>
//<website>http://www.rit.edu</website>
//<nummembers>33</nummembers>
//<numcalls>300</numcalls>
//</data>
					var x='<table><tr><td>Name:</td><td>'+$(data).find('name').text()+'</td></tr>';
					x+='<tr><td>Description:</td><td>'+$(data).find('description').text()+'</td></tr>';
					x+='<tr><td>email:</td><td>'+$(data).find('email').text()+'</td></tr>';
					x+='<tr><td>website:</td><td>'+$(data).find('website').text()+'</td></tr>';
					x+='<tr><td>number of members:</td><td>'+$(data).find('nummembers').text()+'</td></tr>';
					x+='<tr><td>number of calls:</td><td>'+$(data).find('numcalls').text()+'</td></tr></table>';
					
					var title='<h2>'+$(data).find('name').text()+'</h2>';
/// this line will change slightly when we add the tabs plugin					
					//$('#output').html(x);
					$('#name-title').html(title);
					$('#fragment-1').html(x);
				}
			}
		});
	}
	
	//Student needs to build these:
	function getLocations(id){
		//check file path?????????
		//$('#output').html('going to get Locations of '+id);
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Locations'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
					$(data).find('location').each(function() {
						var x='<tr><td>type:</td><td>'+$(this).find('type').text()+'</td></tr>';
						x+='<tr><td>address 1:</td><td>'+$(this).find('address1').text()+'</td></tr>';
						x+='<tr><td>address 2:</td><td>'+$(this).find('address2').text()+'</td></tr>';
						x+='<tr><td>city:</td><td>'+$(this).find('city').text()+'</td></tr>';
						x+='<tr><td>state:</td><td>'+$(this).find('state').text()+'</td></tr>';
						x+='<tr><td>zip:</td><td>'+$(this).find('zip').text()+'</td></tr>';
						x+='<tr><td>phone:</td><td>'+$(this).find('phone').text()+'</td></tr>';
						x+='<tr><td>tty phone:</td><td>'+$(this).find('ttyPhone').text()+'</td></tr>';
						x+='<tr><td>fax:</td><td>'+$(this).find('fax').text()+'</td></tr>';
						x+='<tr><td>latitude:</td><td>'+$(this).find('latitude').text()+'</td></tr>';
						x+='<tr><td>longitude:</td><td>'+$(this).find('longitude').text()+'</td></tr>';
						x+='<tr><td>county ID:</td><td>'+$(this).find('countyId').text()+'</td></tr>';
						x+='<tr><td>site ID:</td><td>'+$(this).find('siteId').text()+'</td></tr>';

						//$('#output').html(x);

						//var map+='<iframe style="float:right; position:relative;" width="105%" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q=hospitals%20near%20rochester%20ny&key=AIzaSyAVl5qhf9nzJEzaeKn-d-bkNJhpzZSm_Ao"></iframe>';

						$('#fragment-2').html(x);

					});
				
				}
			}
		});
	}
	function getTraining(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Training'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
					$(data).find('training').each(function() {
						var x='<tr><td>type ID:</td><td>'+$(this).find('typeId').text()+'</td></tr>';
						x+='<tr><td>type:</td><td>'+$(this).find('type').text()+'</td></tr>';
						x+='<tr><td>abbreviation:</td><td>'+$(this).find('abbreviation').text()+'</td></tr>';

						//$('#output').html(x);
						$('#fragment-3').html(x);

					});
				
				}
			}
		});
	}
	function getTreatment(id){
				$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Treatments'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
					$(data).find('treatment').each(function() {
						var x='<tr><td>type ID:</td><td>'+$(this).find('typeId').text()+'</td></tr>';
						x+='<tr><td>type:</td><td>'+$(this).find('type').text()+'</td></tr>';
						x+='<tr><td>abbreviation:</td><td>'+$(this).find('abbreviation').text()+'</td></tr>';

						//$('#output').html(x);
						$('#fragment-4').html(x);
					});
				
				}
			}
		});
	}
	function getFacilities(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Facilities'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
					$(data).find('facility').each(function() {
						var x='<tr><td>type ID:</td><td>'+$(this).find('typeId').text()+'</td></tr>';
						x+='<tr><td>type:</td><td>'+$(this).find('type').text()+'</td></tr>';
						x+='<tr><td>quantity:</td><td>'+$(this).find('quantity').text()+'</td></tr>';
						x+='<tr><td>description:</td><td>'+$(this).find('description').text()+'</td></tr>';
						//$('#output').html(x);
						$('#fragment-5').html(x);
					});
				
				}
			}
		});
	}
	function getEquipment(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Equipment'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
					$(data).find('equipment').each(function() {
						var x='<tr><td>type ID:</td><td>'+$(this).find('typeId').text()+'</td></tr>';
						x+='<tr><td>type:</td><td>'+$(this).find('type').text()+'</td></tr>';
						x+='<tr><td>quantity:</td><td>'+$(this).find('quantity').text()+'</td></tr>';
						x+='<tr><td>description:</td><td>'+$(this).find('description').text()+'</td></tr>';
						//$('#output').html(x);
						$('#fragment-6').html(x);
					});
				
				}
			}
		});
	}
	function getPhysicians(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Physicians'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
					$(data).find('physician').each(function() {
						var x='<tr><td>person ID:</td><td>'+$(this).find('typeId').text()+'</td></tr>';
						x+='<tr><td>first name:</td><td>'+$(this).find('fName').text()+'</td></tr>';
						x+='<tr><td>middle name:</td><td>'+$(this).find('mName').text()+'</td></tr>';
						x+='<tr><td>last name:</td><td>'+$(this).find('lName').text()+'</td></tr>';
						x+='<tr><td>suffix:</td><td>'+$(this).find('suffix').text()+'</td></tr>';
						x+='<tr><td>phone:</td><td>'+$(this).find('phone').text()+'</td></tr>';
						x+='<tr><td>license:</td><td>'+$(this).find('license').text()+'</td></tr>';
						//$('#output').html(x);
						$('#fragment-7').html(x);
					});
				
				}
			}
		});
	}
	function getPeople(id){
		//alert(id);
		var y='';
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/People'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
					$(data).find('site').each(function() {
						y+='<tr><td>address:</td><td>'+$(this).attr('address')+'</td></tr>';
						y+='<tr><td>site ID:</td><td>'+$(this).attr('siteId')+'</td></tr>';
						y+='<tr><td>site type:</td><td>'+$(this).attr('siteType')+'</td></tr>';
						//$('#fragment-8').html(y);
						$(this).find('person').each(function() {
							y+='<tr><td>person ID:</td><td>'+$(this).find('typeId').text()+'</td></tr>';
							y+='<tr><td>first name:</td><td>'+$(this).find('fName').text()+'</td></tr>';
							y+='<tr><td>middle name:</td><td>'+$(this).find('mName').text()+'</td></tr>';
							y+='<tr><td>last name:</td><td>'+$(this).find('lName').text()+'</td></tr>';
							y+='<tr><td>suffix:</td><td>'+$(this).find('suffix').text()+'</td></tr>';
							y+='<tr><td>phone:</td><td>'+$(this).find('phone').text()+'</td></tr>';
							y+='<tr><td>license:</td><td>'+$(this).find('license').text()+'</td></tr>';
							//$('#output').html(x);
							
						});
						
					});
					$('#fragment-8').html(y);

				}
			}
		});
	}

	//This function is called when user changes the state select (and onload)
    function getCities(which){
    		if(which == ''){
    			$('#orgCitySearch').html('City/Town<input id="cityTown" type="text"/>');
    		}else{
    		$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/Cities?state="+which},  
  				dataType: "xml",
  				success: function(data, status){ 
       	 			var x='';
       	 			if($(data).find('error').length != 0){
	       	 			//do nothing?
       	 			}else if($(data).find('row').length==0 && which != ''){
       	 				$('#orgCitySearch').html('City/Town<input id="cityTown" type="text" value="No cities/Towns in "'+which+'"/>');
       	 			}else{
       	 				x+='<select id="cityTown" name="town"><option value="">--cities--<\/option>';
       	 				$('row',data).each(
       	 					function(){
       	 						x+='<option value="'+$(this).find('city').text()+'">'+$(this).find('city').text()+'<\/option>';
       	 					}
       	 				);
       	 				x+="<\/select>";
       	 				$('#orgCitySearch').html(x);
       	 			}
		   		}
			});
		}
    }
	
//Because the orgTypes could change we load them 'fresh' every time.
	//In reality you should load these in PHP on the server end (saves a round trip)
	//but since this is client...
	function getOrgTypes(){
    		$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/OrgTypes"},  
  				dataType: "xml",
  				success: function(data, status){ 
       	 			var x='';
       	 			if($(data).find('error').length != 0){
	       	 			//do nothing?
       	 			}else{
       	 				x+='<option value="">All Organization Types<\/option>';
       	 				$('row',data).each(
       	 					function(){
       	 						x+='<option value="'+$(this).find('type').text()+'">'+$(this).find('type').text()+'<\/option>';
       	 					}
       	 				);
       	 				//return x;
       	 				$("#orgType").html(x);
       	 			}
		   		}
			});
    	}
	
	//Do a search. 
	//so when an org is clicked it will create the select and getGeneral().
	function checkSearch(){
			$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/Organizations?"+$('#Form1').serialize()},
  				dataType: "xml",
  				success: function(data, status){ 
  					var x='';
       	 			$('#tabelOutput').html('');
       	 			if($(data).find('error').length != 0){
	       	 			$('error', data).each(
    	   	 				function(){
       		 				x+="error getting data"; 
       	 					}
       	 				);
       	 			}else if($(data).find('row').length==0){
       	 				x+="No data matches for: "+$('#orgType').val() + (($('#orgName').val()!='')?" > name: "+$('#orgName').val():"") + (($('#state').val()!='')?" > State: "+$('state').val():"");
       	 				if($('#cityTown').val()=='' || $('#cityTown').val().search(/No cities/)==0){
       	 					x+="";
       	 				}else{
       	 					x+=" > City: "+$('#cityTown').val();
       	 				}
       	 			/**********/
       	 			//This is for a Physician - it will be different data coming back
       	 			}else if($("#orgType").val() == "Physician"){
       	 				$("#resultsTitle").html(' ('+$(data).find('row').length+' total found)');
       	 				// build a table of Physician information
					/**********/
       	 			}else{
       	 				$("#resultsTitle").html(' ('+$(data).find('row').length+' total found)');
       	 				x+="<div><table id=\"myTable\" class=\"tablesorter\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th class=\"header\" style=\"width:90px;\">Type<\/th><th class=\"header\">Name<\/th><th class=\"header\">City<\/th><th class=\"header\">Zip<\/th><th class=\"header\" style=\"width:70px;\">County<\/th><th class=\"header\" style=\"width:40px;\">State<\/th><\/tr><\/thead>";
       	 				$('row',data).each(
       	 					function(){
       	 						x+='<tr><tbody>';
       							x+="<td>"+$(this).find('type').text()+"<\/td>";
        						x+="<td style=\"cursor:pointer;color:#ECF0F1;\" onclick=\"getData("+$(this).find('OrganizationID').text()+");\">"+$(this).find('Name').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('city').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('zip').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('CountyName').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('State').text()+"<\/td><\/tr>";
       	 					}
       	 				);
       	 				x+="<\/table><\/tbody>";
       	 			}
		     		$('#tabelOutput').html(x);
		   		}
			});
		}
	
	//Occasionally we will get back 'null' as a value
	//you should NEVER show 'null' in the client - make it blank...
	function myFind(what,data,i){
		if(i!=-1){
			return (($(data).find(what).eq(i).text()!='null')?$(data).find(what).eq(i).text()+' ':'')
		}else{
			return (($(data).find(what).text()!='null')?$(data).find(what).text()+' ':'')
		}
	}
