



const STUDENTS_API =  "../../api/students.php";





index();
function index()
{
    $.blockUI();
    serviceDataTable = $("#records").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : STUDENTS_API + "?index",
            dataSrc : function (response) {
                let return_data = new Array();

                for (let i = 0; i<response.records.length; i++) 
                {
                    return_data.push({
                        //@TODO
                        //@var change keys depending on the table
                        id : response.records[i].id,
                        name :  response.records[i].name,
                        username :  response.records[i].username,
                        password :  response.records[i].password,
                        address :  response.records[i].address,
                        date_time : response.records[i].date_time,
                        action : "<button onclick='destroy(" +response.records[i].id+ ")'>DELETE</button>"
                    });
                }

                return return_data;
            },
            complete : function() {
                $.unblockUI()
                //@TODO
                //@var change databale 
                $('#records tbody').on('dblclick', 'tr', function() {
                    let data = $('#records')
                        .DataTable()
                        .row(this)
                        .data()
                    
                    
                    $("#idToBeDisplay").html(data.id)
                    $("#name").val(data.name);
                    $("#username").val(data.username);
                    $("#password").val(data.password);
                    $("#address").val(data.address);
                    $("#modalClickerShow").click();

                    $("#saveButton").hide();
                    $("#updateButton").show();
                    $("#showId").show();
                });
            },
        },
        columns : [
            //@TODO
            //@var change data keys depending on the table column declared above
            { data : 'id' },
            { data : 'name' },
            { data : 'username' },
            { data : 'password' },
            { data : 'address' },
            { data : 'date_time' },
            { data : 'action' },
        ],
        dom : 'lBfrtip',
        buttons : [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdf'
        ]
    });
}

/**
 * 
 * @param {*} id 
 */
function show(id)
{
    //@var change variable STUDENTS_API
    $.ajax({
        "url" : STUDENTS_API + "?show&id=" + id,
        "success" : function(response) {
            
            let jsonParse = JSON.parse(response)
            let tr = '';

            for (var i = 0; i<jsonParse.records.length; i++) 
            {
                //@TODO same with index
                /**
                 * Change display depending on your needs
                 */
                //jsonParse.records[i].id
               //jsonParse.records[i].id
               tr += "<tr>" +
               "<td>" + jsonParse.records[i].id + "</td>" +
               "<td>" + jsonParse.records[i].name + "</td>" +
               "<td>" + jsonParse.records[i].username + "</td>" + 
               "<td>" + jsonParse.records[i].password + "</td>" +
               "<td>" + jsonParse.records[i].address + "</td>" + 
               "<td>" + jsonParse.records[i].date_time + "</td>" + 
               "<td><button onclick='destroy(" +jsonParse.records[i].id+ ")'>SAVE EDIT</button><button onclick='show(" +jsonParse.records[i].id+ ")'>SHOW</button>&nbsp;"+
               "<button onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>" + 
           "</tr>";
            }

            /**
             * Change element to be display
             */
            $("#records").html(tr)
        }
    })
}

//Saving a record
function store()
{
    
    /**
     * Change json collections
     */
    //@TODO change json collection
    let studentForm = {
		name : $("#name").val(),
        username : $("#username").val(),
        password : $("#password").val(),
        address : $("#address").val(),

	}

    $.ajax({
        "url" : STUDENTS_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(studentForm),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            

            alert(responseJSON.description);

            serviceDataTable.ajax.reload(null, false);
            
            $("#modalClickerClose").click();

            return false;
        }
    })

    return false;
}

function destroy(id)
{
    $.blockUI();

    if (!confirm("Are you sure you want to delete?"))
    {
        return;
    }

    $.ajax({
        "url" : STUDENTS_API ,
        "type" : "POST",
        "data" : "destroy&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            $.unblockUI()

            alert(responseJSON.description);

            serviceDataTable.ajax.reload(null, false);
            
            return false;
        }
        
    })
}

function update(id)
{
    $.blockUI();
    
    //@TODO Change json collections
    let studentForm = {
		name : $("#name").val(),
        username : $("#username").val(),
        password : $("#password").val(),
        address : $("#address").val(),
	}

    $.ajax({
        "url" : STUDENTS_API ,
        "type" : "POST",
        "data" : "update=" + JSON.stringify(studentForm) + "&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            $.unblockUI()

            alert(responseJSON.description);

            serviceDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}













function resetButton()
{
    $("#saveButton").show();
    $("#updateButton").hide();
    $("#showId").hide();
}

function doUpdate()
{
    let id = $("#idToBeDisplay").html();

    update(id)

    $("#modalClickerClose").click();
}




let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}





