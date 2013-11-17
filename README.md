moodle_copysafe_pdf
===================

Moodle module for adding Copysafe PDF to web pages.

By ArtistScope - http://www.artistscope.com

This copysafepdf plugin is compatible with moodle version 2.5

Install instructions
====================

1) Copy the folder named 'copysafepdf' to moodle's module directory that is 'moodle/mod/'.

2) Set write permissions for user "apache". on the copysafepdfimage folder.

3) Copy the folder named 'example' to 'moodle/lib/editor/tinymce/plugins'
   Note: The tinymce version may be different in different versions.

4) Paste the code mentioned below to the end of 'moodle/course/lib.php' file
   
    $liburl = new moodle_url('/mod/copysafepdf/jquery.min.js');
    $copyurl = new moodle_url('/mod/copysafepdf/copy.js');
    ?>

    <script src="<?php echo $liburl; ?>" type="text/javascript"></script>
    <script type="text/javascript" src="<?php echo $copyurl; ?>"></script> 

5) Go to Site Administration » Notifications - Click to 'Update Moodle database now'.

6) Nominate the settings applied to all CopySafe PDF pages.




Mode
====

Here you can set mode and change it at any time for debugging purposes:

1.	Demo Mode - displays a placeholder image.
2.	Licensed Mode - displays encrypted images and activates the CopySafe PDF browser plugin.
3.	Debugging Mode - displays the html used in the object tag in a text area form object.


Select Browsers
=============

If you want to allow all web browsers, then all checkboxes need to be ticked.

This selection enables site owners to control who can access their protected web pages. If a browser is not allowed, then site visitors using that web browser will be redirected to a page explaining that their browser has not been permitted by the site owner. 

Browser selection is commonly used in corporate intranets where all users might be using Internet Explorer only.

 
CopySafe PDF Browser Plugin Installation
==================================

Viewing protected images displayed on a web page using a web browser requires a browser plugin. By installing the CopySafe PDF Reader the web browser plugin is also installed. Users can then access the protected pages and view protected PDF.

As any visitor loads a web page displaying CopySafe PDF protected PDF their browser is checked for the plugin and if it is not found they are redirected to the appropriate download page with further instructions.


Plugin Downloads
===============

This module includes the download page for the CopySafe PDF Reader installer. That page currently links to the ArtistScope download site for the installer, but you are most welcome to download the installer and host it on your own web site. Note that if you are doing this, then you will have to edit the download page to point to the new location of the download file.


Customizing the Download Pages
===========================

Any files found in the CopysafePDF folder that use "download" in their file name can be safely edited without affecting this module's functions.


Licensing
========

This Moodle module is free and provided as is. However you will need a license to use the CopySafe PDF Protector software to encrypt and domain lock your documents. See https://www.artistscope.net/ssl/order/order_pdf.asp




