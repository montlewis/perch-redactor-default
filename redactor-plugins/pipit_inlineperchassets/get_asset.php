<?php
    
    require (realpath(__DIR__.'/../../../../..') . '/core/runtime/runtime.php');
    

    $API = new PerchAPI(1.0, 'assets');
    $Assets  = new PerchAssets_Assets;

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);


    // If json_decode failed, the JSON is invalid.
    if(is_array($decoded)) {
        if(isset($decoded['id'])) {
            $assetID = $decoded['id'];
        
            $Asset = $Assets->find($assetID);
            if ($Asset || is_object($Asset)) {
                $result = [
                    'id' => $Asset->id(),
                    'url' => $Asset->web_path(),
                    'image' => true
                ];

                if($Asset->is_image()) {
                    $Tag = new PerchXMLTag('<perch:content id="image" type="image" >');
                    $Tag->set('width', $decoded['width']);
                    $Tag->set('height', $decoded['height']);
                    $Tag->set('crop', $decoded['crop']);
                    $Tag->set('quality', $decoded['quality']);
                    $Tag->set('density', $decoded['density']);
                    $Tag->set('sharpen', $decoded['sharpen']);
    
                    $FieldType = PerchFieldTypes::get('image', null, $Tag, [$Tag]);
                    $data[$Tag->id().'_assetID'] = $assetID;
                    $raw = $FieldType->get_raw($data);
                    $processed  = $FieldType->get_processed($raw);
    
                    if($processed) {
                        $result['url'] = $processed;
                    }
                } else {
                    $result['image'] = false;
                }


                echo json_encode($result);
            } else {
                // Asset not found
            }
        } else {
            // ID not set
        }
    } else {
        // Send error back to user.
    }