const STUDENTCOURSE = "../../api/student-course.php";




function save() {
    let signUpForms = {     
        email : $("#email").val(),
        complete_name : $("#complete_name").val(),
        complete_address : $("#complete_address").val()
        
        
    };

    $.ajax({
        "url" : STUDENTCOURSE ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(signUpForms),
        "success" : function(response) {
            
            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            if (responseJSON.code == 200)
            {
                window.location.href= "../../pages/dashboard_student/payments.html"
            }
            
            return false;
        }
    })

    return false;
}