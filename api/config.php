<?php

session_start();

include_once("environment.php");
include_once ("constants.php");
include_once ("dbhelper/MysqliDb.php");



$database = new MysqliDb(
    array(
        'host' => DB_HOST,
        'username' => DB_USER,
        'password' => DB_PASS,
        'db' => DB_NAME,
        'port' => 3306,
        'prefix' => ''
    )
);




function parseResponse($code = SUCCESS, $description = "Successful", $details = null, $others = array())
{
    $response['code'] = $code;
    $response['description'] = $description;
    $response['details'] = $details;

    foreach ($others as $key => $value)
    {
        $response[$key] = $value;
    }

    return json_encode($response);
}