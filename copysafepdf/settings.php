<?php  //$Id: settings.php,v 1.1.2.2 2007/12/19 17:38:41 skodak Exp $
defined('MOODLE_INTERNAL') || die;
require_once($CFG->dirroot.'/mod/copysafepdf/set.php');

//$settings->add(new admin_setting_heading('CopysafePdf_method_heading', 'List of Uploaded Class files',
               //get_wpcsw_uploadfile_list()));


$settings->add(new admin_setting_heading('CopysafePdf_normal_heading', 'Settings',
                   'Default settings applied to all protected pages:'));



$options = array();
$options[0]  = 'Demo Mode';
$options[1] = 'Licensed';
$options[2] = 'Debugging Mode';
$settings->add(new admin_setting_configselect('CopysafePdf_mode','Mode:',
                   '','', $options));

$settings->add(new admin_setting_configcheckbox('CopysafePdf_allowie', 'Allow IE:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafePdf_allowfirefox', 'Allow Firefox:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafePdf_allowchrome', 'Allow Chrome:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafePdf_allownavigator', 'Allow Navigator:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafePdf_allowopera', 'Allow Opera:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafePdf_allowsafari', 'Allow Safari:',
                   ''));
$optionslanguage = array();
$optionslanguage["0c01"] = "Arabic";
$optionslanguage["0004"] = "Chinese (simplified)";
$optionslanguage["0413"] = "Dutch";
$optionslanguage[""]     = "English";
$optionslanguage["0464"] = "Filipino";
$optionslanguage["000c"] = "French";
$optionslanguage["0007"] = "German";
$optionslanguage["040d"] = "Hebrew";
$optionslanguage["0439"] = "Hindi";
$optionslanguage["000e"] = "Hungarian";
$optionslanguage["0410"] = "Italian";
$optionslanguage["0411"] = "Japanese";
$optionslanguage["0415"] = "Polish";
$optionslanguage["0816"] = "Portuguese (PT)";
$optionslanguage["0419"] = "Russian";
$optionslanguage["0c0a"] = "Spanish";
$optionslanguage["041e"] = "Thai";
$optionslanguage["002a"] = "Vietnamese";

$settings->add(new admin_setting_configselect('CopysafePdf_language','Language:',
                   '','', $optionslanguage));

?>

