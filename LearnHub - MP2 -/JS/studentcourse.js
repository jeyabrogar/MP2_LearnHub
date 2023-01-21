
const STUDENTCOURSE_API =  "../../api/student-course.php";










let studentDataTable;
index();
function index()
{
    $.blockUI();
    studentDataTable = $("#studentcourse").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : STUDENTCOURSE_API + "?index",
            dataSrc : function (response) {
                let return_data = new Array();

                for (let i = 0; i<response.records.length; i++) 
                {
                    return_data.push({
                        //@TODO
                        //@var change keys depending on the table
                        select : "<input type='checkbox' value='" + response.records[i].id + "' class='selected_service' />",
                        id : response.records[i].id,
                        student_id :  response.records[i].student_id,
                        email :  response.records[i].email,
                        complete_name :  response.records[i].complete_name,
                        complete_address :  response.records[i].complete_address,
                        is_completed : response.records[i].is_completed,              
                        date_approved : response.records[i].date_approved,
                        date_expiry : response.records[i].date_expiry,
                        date_time : response.records[i].date_time,
                       
                    });
                }

                return return_data;
            },
            complete : function() {
                $.unblockUI()
                //@TODO
                //@var change databale 
                $('#studentcourse tbody').on('dblclick', 'tr', function() {
                    let data = $('#studentcourse')
                        .DataTable()
                        .row(this)
                        .data()
                    
                    
                        $("#idToBeDisplay").html(data.id)
                        $("#student_id").val(data.student_id);
                        $("#email").val(data.email);
                        $("#complete_name").val(data.complete_name);
                        $("#complete_address").val(data.complete_address);
                        $("#is_completed").val(data.is_completed);               
                        $("#date_approved").val(data.date_approved);
                        $("#date_expiry").val(data.date_expiry);
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
            { data : 'student_id' },
            { data : 'email' },
            { data : 'complete_name' },
            { data : 'complete_address' },
            { data : 'is_completed' },     
            { data : 'date_approved' },
            { data : 'date_expiry' },
            { data : 'date_time' },
           
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
        "url" : STUDENTCOURSE_API + "?show&id=" + id,
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
               "<td>" + jsonParse.records[i].student_id + "</td>" +
               "<td>" + jsonParse.records[i].email + "</td>" +
               "<td>" + jsonParse.records[i].complete_name + "</td>" +
               "<td>" + jsonParse.records[i].complete_address + "</td>" +
               "<td>" + jsonParse.records[i].is_completed + "</td>" +           
               "<td>" + jsonParse.records[i].date_approved + "</td>" +
               "<td>" + jsonParse.records[i].date_expiry + "</td>" + 
               "<td>" + jsonParse.records[i].date_time + "</td>" + 
               "<td><button onclick='update(" +jsonParse.records[i].id+ ")'>SAVE EDIT</button><button onclick='show(" +jsonParse.records[i].id+ ")'>SHOW</button>&nbsp;"+
               "<button onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>" + 
           "</tr>";
            }

            /**
             * Change element to be display
             */
            $("#course").html(tr)
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
		student_id : $("#student_id").val(),
        email : $("#email").val(),
        complete_name : $("#complete_name").val(),
        complete_address : $("#complete_address").val(),
        is_completed : $("#is_completed").val(),      
        date_approved : $("#date_approved").val(),
        date_expiry : $("#date_expiry").val(),
        

	}

    $.ajax({
        "url" : STUDENTCOURSE_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(studentForm),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            

            alert(responseJSON.description);

            studentDataTable.ajax.reload(null, false);
            
            $("#modalClickerClose").click();

            return false;
        }
    })

    return false;
}

function destroy(id)
{
   

    if (!confirm("Are you sure you want to delete?"))
    {
        return;
    }

    $.ajax({
        "url" : STUDENTCOURSE_API ,
        "type" : "POST",
        "data" : "destroy&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            

            alert(responseJSON.description);

            studentDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}

function update(id)
{
    
    
    //@TODO Change json collections
    let studentForm = {
		student_id : $("#student_id").val(),
        email : $("#email").val(),
        complete_name : $("#complete_name").val(),
        complete_address : $("#complete_address").val(),
        is_completed : $("#is_completed").val(),      
        date_approved : $("#date_approved").val(),
        date_expiry : $("#date_expiry").val(),
	}

    $.ajax({
        "url" : STUDENTCOURSE_API ,
        "type" : "POST",
        "data" : "update=" + JSON.stringify(studentForm) + "&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
           

            alert(responseJSON.description);

            studentDataTable.ajax.reload(null, false);

            $("#modalClickerClose").click();
            
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

function getSelected()
{
    let selectedValues = [];

    $(".selected_service:checked").each(function() {
        selectedValues.push($(this).val());
    })

    
    $.blockUI();

    if (!confirm("Are you sure you want to delete this records?"))
    {
        return;
    }

    $.ajax({
        "url" : STUDENTCOURSE_API ,
        "type" : "POST",
        "data" : "bulkDestroy&id=" + JSON.stringify(selectedValues),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            $.unblockUI()

            alert(responseJSON.description);

            studentDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}