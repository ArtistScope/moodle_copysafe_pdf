<?php

function wpcsw_get_config($param){
     global $DB,$CFG;
     $res=array();
     //$result = $DB->get_records_list('config', 'name', array( 'CopysafePdf_uploadfolder','CopysafePdf_uploadfolder','CopysafePdf_mode','CopysafePdf_allowie','CopysafePdf_allowfirefox','CopysafePdf_allowchrome','CopysafePdf_allownavigator','CopysafePdf_allowopera','CopysafePdf_allowsafari'), null, 'value');
     $result = $DB->get_records_sql('SELECT * FROM {config} WHERE name LIKE ?', array('CopysafePdf%'));
     //print_r($result);
     foreach ($result as $key=>$val)
     {
        $res[$val->name]=$val->value;
     }

     echo json_encode($res).'~'.$pluginurl = new moodle_url('/mod/copysafepdf/').'~'.$uploadurl = new moodle_url('/mod/copysafepdf/copysafepdfimage/');
}
function wpcsw_get_parameters($param){
     global $DB,$CFG;
	//$postid = $_POST["post_id"] ;
	$filename = trim($param["filename"]) ;
	$result = $DB->get_record_sql('SELECT * FROM {copysafepdf_settings} WHERE name = ?', array($filename));
        if(empty($result)){
        $result = wpcsw_get_first_class_settings() ;
        extract($result ) ;
        $prints_allowed = ($prints_allowed) ? 1 : 0 ;
	$print_anywhere = ($print_anywhere) ? 1 : 0 ;
	$allow_capture = ($allow_capture) ? 1 : 0 ;
	$allow_remote = ($allow_remote) ? 1 : 0 ;

	$params = 	" bgwidth='" . $bgwidth . "'" .
			" bgheight='" . $bgheight . "'" .
			" prints_allowed='" . $prints_allowed . "'" .
			" print_anywhere='" . $print_anywhere . "'" .
			" allow_capture='" . $allow_capture . "'" .
			" allow_remote='" . $allow_remote . "'" .
			" background='" . $background . "'" .
                        " language='" . $language . "'" ;
        }
        else
        {
            $params = 	" bgwidth='" . $result->bgwidth . "'" .
			" bgheight='" . $result->bgheight . "'" .
			" prints_allowed='" . $result->prints_allowed . "'" .
			" print_anywhere='" . $result->print_anywhere . "'" .
			" allow_capture='" . $result->allow_capture . "'" .
			" allow_remote='" . $result->allow_remote . "'" .
			" background='" . $result->background . "'" .
                        " language='" . $result->language . "'" ;

        }


	return $params ;
}

function wpcsw_get_first_class_settings(){
	$settings = array(
                                'bgwidth'         => '600',
				'bgheight'	  => '600',
				'prints_allowed'  => 0,
				'print_anywhere'  => 0,
				'allow_capture'   => 0,
				'allow_remote'    => 0,
				'background'	  => 'CCCCCC',
                                'language'	  => ''
			) ;
	return 	$settings ;
}

function wpcsw_file_upload($param){
	$file_error 	= $param["error"] ;
	$file_errors = array( 0 => "There is no error, the file uploaded with success" ,
                          1 => "The uploaded file exceeds the upload_max_filesize directive in php.ini",
                          2 => "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form" ,
                          3 => "The uploaded file was only partially uploaded",
                          4 => "No file was uploaded" ,
                          6 => "Missing a temporary folder" ,
                          7 => "Upload directory is not writable"
                   );

	if ( $file_error == 0 ){
		$msg = '<div class="updated"><p><strong>'.'File Uploaded. You must save "File Details" to insert post'.'</strong></p></div>';
	}else{
		$msg = '<div class="error"><p><strong>'.'Error'.'!</strong></p><p>'.$file_errors[$file_error].'</p></div>';
	}
    return $msg ;
}

function wpcsw_file_search($param){
	// get selected file details
	if (@!empty($param['search']) || @!empty($param['post_id'])) {

		$postid = $param['post_id'] ;
		$search = trim($param["search"]);

		$files = _get_wpcsw_uploadfile_list() ;

    	$result = false ;
    	foreach ($files as $file)
    		if( $search == trim($file["filename"]) )$result = true ;

		if( !$result )return "<hr /><h2>No found file</h2>" ;

		$file_options  = wpcsw_get_first_class_settings() ;

//	    $wpcsw_options = get_option( 'wpcsw_settings' );
//	    if( $wpcsw_options["classsetting"][$postid][$search] )
//	    	$file_options = $wpcsw_options["classsetting"][$postid][$search] ;
//
		extract( $file_options, EXTR_OVERWRITE );

	    $str = "<hr />
	    		<div class='icon32' id='icon-file'><br /></div>
		        <h2>Page Settings</h2>
		        <div>
	    			<table cellpadding='0' cellspacing='0' border='0' >
	  					<tbody id='wpcsw_setting_body'>
							  <tr>
							    <td align='left' width='50'>&nbsp;</td>
							    <td align='left' width='40'><img src='./images/help-24-30.png' border='0' alt='Border thickness in pixels. For no border set 0.' /></td>
    							<td align='left'>Viewer width:</td>
							    <td>
							      <input name='bgwidth' id='wpcsw_bgwidth' type='text' value='$bgwidth' size='3' />
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Color of the border and image backround area. For example use FFFFFF for white and 000000 is for black... without the # symbol.' /></td>
							    <td align='left'>Viewer height:</td>
							    <td>
							      <input name='bgheight' id='wpcsw_bgheight' type='text' value='$bgheight' size='7' />
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Color of the text message that is displayed in the image area sas the image downloads.' /></td>
							    <td align='left'>Prints Allowed:</td>
							    <td>
							      <input name='prints_allowed' id='wpcsw_prints_allowed' type='text' value='$prints_allowed' size='7' />
							    </td>
							  </tr>
							<tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Check this box to disable Printscreen and screen capture when the class image loads.'></td>
							    <td align='left'>Print Anywhere:</td>
							    <td>
							      <input name='print_anywhere' type='checkbox' value='1' $print_anywhere>
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Check this box to disable use of the keyboard when the class image loads.' /></td>
							    <td align='left'>Allow capture:</td>
							    <td>
							      <input name='allow_capture' id='wpcsw_allow_capture' type='checkbox' value='1' $allow_capture>
							    </td>
							  </tr>

							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Check this box to disable use of browser menus. This option is browser dependent.'></td>
							    <td align='left'>Allow remote:</td>
							    <td>
							      <input name='allow_remote' type='checkbox' value='1' $allow_remote>
							    </td>
							  </tr>

							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Set the message to display as this class image loads.' /></td>
							    <td align='left'>Background:&nbsp;</td>
							    <td>
							      <input name='background' id='wpcsw_background' type='text' value='$background' size='' />
							    </td>
							  </tr>
						</tbody>
					</table>
			        <p class='submit'>
			            <input type='button' value='Save' class='button-primary' id='setting_save' name='submit' />
			            <input type='button' value='Cancel' class='button-primary' id='cancel' />
			        </p>
        	</div>" ;
		return $str ;
	}
}

function wpcsw_setting_save($param){
    global $DB,$CFG;
	$postid = $param["post_id"] ;
	$name = trim($param["nname"]) ;
	$data = (array)json_decode(stripcslashes($param["set_data"])) ;


$record = new stdClass();
$record->name= $name;
$record->postid= $postid;
$record->bgwidth=$data['bgwidth'];
$record->bgheight=$data['bgheight'];
$record->prints_allowed= $data['prints_allowed'];
$record->print_anywhere= $data['print_anywhere'];
$record->allow_capture= $data['allow_capture'];
$record->allow_remote= $data['allow_remote'];
$record->background= $data['background'];
$record->language= $data['language'];

$result = $DB->get_record_sql('SELECT * FROM {copysafepdf_settings} WHERE name = ?', array($name));
if($result->postid){
   $record->id      = $result->id;
   $DB->update_record('copysafepdf_settings', $record);
}
    else
$DB->insert_record('copysafepdf_settings', $record);

//    $msg = '<div class="updated fade">
//    			<strong>'.__('File Options Are Saved').'</strong><br />
//    			<div style="margin-top:5px;"><a href="#" alt="'.$name.'" class="button-secondary sendtoeditor"><strong>Insert file to editor</strong></a></div>
//		    </div>';
    return $msg ;

}

function _get_wpcsw_uploadfile_list(){
	$listdata = array() ;
        global $CFG, $DB;
	$file_list = scandir($CFG->dirroot.'/mod/copysafepdf/copysafepdfimage/');
	foreach ($file_list as $file) {
		if( $file == "." || $file == "..")continue ;
		$file_path = $CFG->dirroot.'/mod/copysafepdf/copysafepdfimage/' . $file ;
		if( filetype($file_path) != "file" )continue ;
		$ext = end(explode('.', $file));
		if( $ext != "class" )continue ;

		$file_path = $CFG->dirroot.'/mod/copysafepdf/copysafepdfimage/'. $file ;
		$file_name = $file;
		$file_size = filesize($file_path) ;
		$file_date = filemtime ($file_path) ;

		if ( round ( $file_size/1024 ,0 )> 1 ) {
            $file_size = round ( $file_size/1024, 0 );
            $file_size = "$file_size KB";
        } else {
            $file_size = "$file_size B";
        }

        $file_date = date("n/j/Y g:h A", $file_date);

		$listdata[] = array(
					"filename" => $file_name,
					"filesize" => $file_size,
					"filedate" => $file_date
				) ;
	}
	return $listdata ;
}

function get_wpcsw_uploadfile_list(){

	$files = _get_wpcsw_uploadfile_list() ;

	foreach ($files as $file) {
		//$link = "<div class='row-actions'>
		//			<span><a href='#' alt='{$file["filename"]}' class='setdetails row-actionslink' title=''>Setting</a></span>&nbsp;|&nbsp;
		//			<span><a href='#' alt='{$file["filename"]}' class='sendtoeditor row-actionslink' title=''>Insert to post</a></span>
		//		</div>" ;
        // prepare table row
        $table.= "<tr><td></td><td><a href='#' alt='{$file["filename"]}' class='sendtoeditor row-actionslink'>{$file["filename"]}</a></td><td width='50px'>{$file["filesize"]}</td><td width='130px'>{$file["filedate"]}</td><td><a href='#' alt='{$file["filename"]}' class='delete row-actionslink'>delete</a></td></tr>";
	}

	if( !$table ){
		 $table.= '<tr><td colspan="3">'.'No file uploaded yet.'.'</td></tr>';
	}

	return $table ;
}



?>
