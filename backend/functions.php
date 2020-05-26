<?php
    $connection = mysqli_connect("localhost", "mysql", "mysql", "spabd");
    if($connection==false){
        echo "Error!";
        echo mysqli_connect_errno();
        exit();
    }

function getData($route, $params = []) {
    global $connection;
    $query =  mysqli_query($connection, "SELECT * FROM `$route` ORDER BY id DESC");
    while($article = mysqli_fetch_assoc($query)){
        $data[] = $article;
    }

    if (!empty($params['id'])) {
        $id = $params['id'];
        return array_find($data, function ($element) use ($id) {
            return (int) $element['id'] === (int) $id;
        });
    }
    
    return $data;
}

function postData($route, $params = []) {
    global $connection;
    $newData;
    
    switch ($route) {
        case 'news': {
            if (empty($params['title']) || empty($params['text']) || empty($params['author'])) {
                http_response_code(400);
                exit('Request error');    
            }

            $newData = [
                'title' => $params['title'],
                'text' => $params['text'],
                'author' => $params['author'],
                'picture' => $params['picture'],
                'date' => $params['date']
            ];

            break;
        }

        case 'users': {
            if (empty($params['login']) || empty($params['name']) || empty($params['password'])) {
                http_response_code(400);
                exit('Request error');    
            }
            
            $newData = [
                'login' => $params['login'],
                'name' => $params['name'],
                'password' => $params['password'],
            ];

            break;
        }
    }

    $newTitle=$newData['title'];
    $newText=$newData['text'];
    $newAuthor=$newData['author'];
    $newPicture=$newData['picture'];
    $newDate=$newData['date'];
    echo $newID;
    $addData=mysqli_query($connection, "INSERT INTO `$route` VALUES (DEFAULT, '$newTitle', '$newText', '$newAuthor', '$newPicture', '$newDate')");
    $newData['id'] = mysqli_insert_id($connection);
    $data[] = $newData;
    return $newData;
}

function deleteData($route, $params = []) {
    global $connection;
    // $filePath = makeRoutePath($route);
    
    // if (!file_exists($filePath)) {
    //     http_response_code(404);
    //     exit('Not found');    

    // } else 
    if (empty($params['id'])) {
        http_response_code(400);
        exit('Request error');    
    }

    // $dataJSON = file_get_contents($filePath);
    $data;
    $deletableId = $params['id'];
    $deletableTitle = $params['title'];

    // $dataToDelete = array_find($data, function ($element) use ($deletableId) {
    //     return (int) $element['id'] === (int) $deletableId;
    // });
    $DeleteQuery=mysqli_query($connection, "DELETE FROM `$route` WHERE id=$deletableId ");
    $DeletedData=mysqli_query($connection, "SELECT * FROM `$route` ORDER BY id DESC");
    if (empty($DeletedData)) {
        http_response_code(404);
        exit('Not found');    
    }

    // $resultData = array_filter($data, function ($element) use ($deletableId) {
    //     return (int) $element['id'] !== (int) $deletableId;
    // });

    // $dataToWriteJSON = json_encode($resultData, JSON_UNESCAPED_UNICODE);
    // $writeReslt = file_put_contents($filePath, $dataToWriteJSON);

    // if (!$writeReslt) {
    //     http_response_code(500);
    //     echo 'Internal server error';
    //     exit;
    // }

    return $DeletedData;
}

function makeRoutePath($route) {
    $filenameJson = $route . '.json';
    $dataDirPath = __DIR__ . '/data/';
    return $dataDirPath . $filenameJson;
}

function array_find($haystack, $callback) {
    foreach ($haystack as $element)
        if ($callback($element))
            return $element;
}