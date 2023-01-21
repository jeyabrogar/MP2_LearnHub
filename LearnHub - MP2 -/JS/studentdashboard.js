

const COURSE_API =  "../../api/course.php";



let courseDataTable;
index();
function index()
{
    $.blockUI();
    courseDataTable = $("#course").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : COURSE_API + "?index",
            dataSrc : function (response) {
                let return_data = new Array();

                for (let i = 0; i<response.records.length; i++) 
                {
                    return_data.push({

                        
                        id : response.records[i].id,
                        description :  response.records[i].description,
                        days :  response.records[i].days,
                        price : response.records[i].price,
                       
                       
                    });
                }

                return return_data;
            },
            complete : function() {
                $.unblockUI()
                 
                $('#course tbody').on('dblclick', 'tr', function() {
                    let data = $('#course')
                        .DataTable()
                        .row(this)
                        .data()
                    
                    
                    $("#idToBeDisplay").html(data.id)
                    $("#description").val(data.description);
                    $("#days").val(data.days);
                    $("#price").val(data.price);
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
            { data : 'description' },
            { data : 'days' },
            { data : 'price' },
           

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
    //@var change variable COURSE_API
    $.ajax({
        "url" : COURSE_API + "?show&id=" + id,
        "success" : function(response) {
            
            let jsonParse = JSON.parse(response)
            let tr = '';

            for (var i = 0; i<jsonParse.records.length; i++) 
            {
               tr += "<tr>" +
               "<td>" + jsonParse.records[i].id + "</td>" + 
               "<td>" + jsonParse.records[i].description + "</td>" + 
               "<td>" + jsonParse.records[i].days + "</td>" +
               "<td>" + jsonParse.records[i].price + "</td>" + 
              
           "</tr>";
            }

   
            $("#course").html(tr)
        }
    })
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
