const STUDENTLOGIN_API = "../../api/student-login.php";

function login() {
    let loginCredentials = {
        username : $("#username").val(),
        password : $("#password").val(),
    }

    $.ajax({
        "url" : STUDENTLOGIN_API,
        "type" : "POST",
        "data" : "auth=" + JSON.stringify(loginCredentials),
        "success" : function(response) {
            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            if (responseJSON.code == 200) {
                window.location.href = "../../pages/dashboard_student";
            }

            return false;
        }
    })

    return false;
}