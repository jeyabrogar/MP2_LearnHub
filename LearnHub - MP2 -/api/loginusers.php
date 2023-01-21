<?php

include_once("config.php");
include_once("constants.php");


define("TABLE_NAME", "user_accounts");

if (isset($_POST['auth']))
{
    $loginCredentials = json_decode($_POST["auth"]); 

    $response = array(
        "code" => INPUT_ERROR, // Default 200 422 500
        "description" => "Wrong username password"
    );

   
    $user_accounts = $database->get(TABLE_NAME);

    foreach ($user_accounts as $user_account) {
        if ($user_account["username"] === $loginCredentials->username) {
            if (password_verify($loginCredentials->password, $user_account["password"])) {
                $response["code"] = SUCCESS;
                $response["description"] = "Successfully Login";

                $_SESSION["loggedin-user"] = $loginCredentials->username;
            }
        }
    }

    echo json_encode($response);
}
?>