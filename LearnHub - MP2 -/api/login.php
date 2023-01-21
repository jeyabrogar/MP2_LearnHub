<?php

include_once("config.php");
include_once("constants.php");


define("TABLE_NAME", "students");

if (isset($_POST['auth']))
{
    $loginCredentials = json_decode($_POST["auth"]); 

    $response = array(
        "code" => INPUT_ERROR, // Default 200 422 500
        "description" => "Wrong username password"
    );

    //Select * from users
    $students = $database->get(TABLE_NAME);

    foreach ($students as $student) {
        if ($student["username"] === $loginCredentials->username) {
            if (password_verify($loginCredentials->password, $student["password"])) {
                $response["code"] = SUCCESS;
                $response["description"] = "Successfully Login";

                $_SESSION["loggedin-user"] = $loginCredentials->username;
            }
        }
    }

    echo json_encode($response);
}
?>