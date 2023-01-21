<?php

include_once("config.php");
include_once ("constants.php");


define("TABLE_NAME", "students");



if (isset($_POST['store']))
{
    $data = json_decode($_POST['store']);
    

    //@TODO
    //@var these are columns and values of the table
    $columns = array(
        "name" => $data->complete_name,
        "username" => $data->username,
        "password" => password_hash($data->password, PASSWORD_DEFAULT),
        "address" => $data->address,
        
    );

    $id = $database->insert(TABLE_NAME, $columns);

    echo $id ? parseResponse(SUCCESS, "Succesfully Inserted", $id) : parseResponse(SERVER_ERROR, "Insert failed");
    
}