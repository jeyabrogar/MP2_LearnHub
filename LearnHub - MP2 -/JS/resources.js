
const RESOURCES_API =  "../../api/resources.php";





index();
function index()
{
    $.blockUI();
    resourcesDataTable = $("#resources").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : RESOURCES_API + "?index",
            dataSrc : function (response) {
                let return_data = new Array();

                for (let i = 0; i<response.records.length; i++) 
                {
                    return_data.push({
                        //@TODO
                        //@var change keys depending on the table
                        select : "<input type='checkbox' value='" + response.records[i].id + "' class='selected_service' />",
                        id : response.records[i].id,
                        course_id :  response.records[i].course_id,
                        link : response.records[i].link,
                        action : "<button onclick='destroy(" +response.records[i].id+ ")'>DELETE</button>"

                    });
                }

                return return_data;
            },
            complete : function() {
                $.unblockUI()
                //@TODO
                //@var change databale 
                $('#resources tbody').on('dblclick', 'tr', function() {
                    let data = $('#resources')
                        .DataTable()
                        .row(this)
                        .data()
                    
                    
                    $("#idToBeDisplay").html(data.id)
                    $("#course_id").val(data.course_id);
                    $("#link").val(data.link);
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
            { data : 'course_id' },
            { data : 'link' },
            { data : 'action'},

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
        "url" : RESOURCES_API + "?show&id=" + id,
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
               "<td>" + jsonParse.records[i].course_id + "</td>" +
               "<td>" + jsonParse.records[i].link + "</td>" +
               "<td><button onclick='goToView(" +jsonParse.records[i].id+ ")'>SHOW</button>&nbsp;"+
                    "<button onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>";

            }

            /**
             * Change element to be display
             */
            $("#resources").html(tr)
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
		description : $("#description").val(),
        days : $("#days").val(),
        price : $("#price").val(),
	}

    $.ajax({
        "url" : RESOURCES_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(studentForm),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            

            alert(responseJSON.description);

            resourceDataTable.ajax.reload(null, false);
            
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
        "url" : RESOURCES_API ,
        "type" : "POST",
        "data" : "destroy&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            

            alert(responseJSON.description);

            resourcesDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}

function update(id)
{
    
    
    //@TODO Change json collections
    let studentForm = {
		id : $("#id").val(),
        course_id : $("#course_id").val(),
        link : $("#link").val(),
	}

    $.ajax({
        "url" : RESOURCES_API ,
        "type" : "POST",
        "data" : "update=" + JSON.stringify(studentForm) + "&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
           

            alert(responseJSON.description);

            resourcesDataTable.ajax.reload(null, false);
            
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
        "url" : RESOURCES_API ,
        "type" : "POST",
        "data" : "bulkDestroy&id=" + JSON.stringify(selectedValues),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            $.unblockUI()

            alert(responseJSON.description);

            resourcesDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}