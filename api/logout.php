<?php

include_once("student-accounts.php");


session_destroy();

$response["code"] = 200;
$response["description"] = "Successfully Logout";

echo json_encode($response);