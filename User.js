		const uname = document.getElementById('uname');
		const email = document.getElementById('email');
		const pwd = document.getElementById('pwd');
		const cpwd = document.getElementById('cpwd');
		const submitBtn = document.getElementById('submit');
		const uid = document.getElementById('uid');
		
		var users=[];
		
		
		var elements=document.getElementsByTagName("input");
		
		for (i in elements) { //assemble our info objects
			if (document.getElementById(elements[i].id) != null) {
				document.getElementById(elements[i].id).addEventListener(
						'keyup', function(event) {
							
							if(validateForm()){
								// enable submit button
								submitBtn.disabled = false;
								submitBtn.style.backgroundColor = "#4CAF50";
							}else{
								submitBtn.disabled = true;
								submitBtn.style.backgroundColor = "#e0e0e0";
							}
						});
			}
		}
		function validateForm() {
			if (uname.value == "" || email.value == "" || pwd.value == "")                                  
		    {
		        return false;
		    }
			
			if(!validateEmail(email.value))
			{
				return false;
			}
			
			if(pwd.value != cpwd.value){
				return false;
			}
			
			if(!validatePwd(pwd.value)){
				//console.log(validatePwd(pwd.value));
				return false;
			} 
			
			return true;
		}
		
		function validateEmail(email) {
			  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			  return re.test(email);
			}
		
		function validatePwd(pwd) {
			  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
			  return re.test(pwd);
			}
		
		// used to add and update an user
		function addUser(){
			
			if(validateForm()){
				// if uid id not given, create a new user
				if(uid.value==''){
					var user={
							"id": Date.now(),
							"name": uname.value,
							"email": email.value,
							"pwd": pwd.value,
						};
						users.push(user);
				}else{
					
					// uid is given so update an existing user
					var user={
							"id": uid.value,
							"name": uname.value,
							"email": email.value,
							"pwd": pwd.value,
						};
					
					var i=0;
					for (; i < users.length; i++){
						if(users[i].id==uid.value){
							break;
						}
					}
					users[i]=user;
					uid.value='';
				}
				
				
				
				document.getElementById("user-form").style.display = "none";
				document.getElementById("user-added").style.display = "block";
				document.getElementById("myForm").reset();
			}else{
				alert("Form validation failed");
			}
			
			return false;
		}
		
		// called when Add user button clicked
		function showAddUser(){
			document.getElementById("myForm").reset();
			document.getElementById("user-added").style.display = "none";
			document.getElementById("users").style.display = "none";
			submitBtn.disabled = true;
			submitBtn.style.backgroundColor = "#e0e0e0";
			document.getElementById("user-form").style.display = "block";
		}
		
		// called when View Users button clicked
		function showUsers(){
			document.getElementById("user-form").style.display = "none";
			document.getElementById("user-added").style.display = "none";
			
			
			var table = document.createElement('table');
			
			// create header
			
			 var tr = document.createElement('tr');   
			    var td1 = document.createElement('th');
			    var td2 = document.createElement('th');
			    var td3 = document.createElement('th');
			    var td4 = document.createElement('th');
			    var td5 = document.createElement('th');
			    var td6 = document.createElement('th');
			    var text1 = document.createTextNode("ID");
			    var text2 = document.createTextNode("Name");
			    var text3 = document.createTextNode("Email");
			    var text4 = document.createTextNode("Password");
			    var text5 = document.createTextNode("Edit");
			    var text6 = document.createTextNode("Delete");
			    td1.appendChild(text1);
			    td2.appendChild(text2);
			    td3.appendChild(text3);
			    td4.appendChild(text4);
			    td5.appendChild(text5);
			    td6.appendChild(text6);
			    tr.appendChild(td1);
			    tr.appendChild(td2);
			    tr.appendChild(td3);
			    tr.appendChild(td4);
			    tr.appendChild(td5);
			    tr.appendChild(td6);
			    table.appendChild(tr);
			    
			// create table elements
			
			for (var i = 0; i < users.length; i++){
			    var tr = document.createElement('tr');   
			    var td1 = document.createElement('td');
			    var td2 = document.createElement('td');
			    var td3 = document.createElement('td');
			    var td4 = document.createElement('td');
			    var td5 = document.createElement('td');
			    var td6 = document.createElement('td');
			    var text1 = document.createTextNode(users[i].id);
			    var text2 = document.createTextNode(users[i].name);
			    var text3 = document.createTextNode(users[i].email);
			    var text4 = document.createTextNode(users[i].pwd);
			    var text5 = document.createElement("button");
			    text5.setAttribute("onclick", "editUser("+users[i].id+")");
			    text5.appendChild(document.createTextNode("Edit"));
			    var text6 = document.createElement("button");
			    text6.setAttribute("onclick", "deleteUser("+users[i].id+")");
			    text6.appendChild(document.createTextNode("Delete"));
			    td1.appendChild(text1);
			    td2.appendChild(text2);
			    td3.appendChild(text3);
			    td4.appendChild(text4);
			    td5.appendChild(text5);
			    td6.appendChild(text6);
			    tr.appendChild(td1);
			    tr.appendChild(td2);
			    tr.appendChild(td3);
			    tr.appendChild(td4);
			    tr.appendChild(td5);
			    tr.appendChild(td6);
			    table.appendChild(tr);
			}
			document.getElementById("users").innerHTML = '';
			document.getElementById("users").appendChild(table);
			
			document.getElementById("users").style.display = "block";
		}
		
		// called when edit button is clicked
		function editUser(id){
			var user;
			for (var i=0; i < users.length; i++){
				if(users[i].id==id){
					user = users[i];
					break;
				}
			}
			console.log(user);
			uname.value = user.name;
			email.value = user.email;
			uid.value = user.id;
			document.getElementById("user-added").style.display = "none";
			document.getElementById("users").style.display = "none";
			document.getElementById("user-form").style.display = "block";
		}
		function deleteUser(id) {
			if (confirm("Are your sure you want to delete user with id: " + id)) {
				var i = 0;
				for (; i < users.length; i++) {
					if (users[i].id == id) {
						break;
					}
				}
				console.log("index:" + i);
				users.splice(i, 1);
				showUsers();
			}
		}