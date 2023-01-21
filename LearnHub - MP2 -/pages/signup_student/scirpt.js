const SIGNUP_API = "../../api/signup.php";




function save() {
    let signUpForms = {     
        complete_name : $("#complete_name").val(),
        address : $("#address").val(),
        username : $("#username").val(),
        password : $("#password").val(),
        confirm_password :  $("#confirm_password").val()
        
    };

    $.ajax({
        "url" : SIGNUP_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(signUpForms),
        "success" : function(response) {
            
            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            if (responseJSON.code == 200)
            {
                window.location.href= "../login_student"
            }
            
            return false;
        }
    })

    return false;
}