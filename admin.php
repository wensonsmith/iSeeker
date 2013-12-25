<?php

define( 'ISEEKER_ROOT',dirname(__FILE__) );
define( 'APP_PATH',ISEEKER_ROOT.'/app/admin' );

require ISEEKER_ROOT . '/core/iseeker.php';
$iSeeker = &Init::instance();
$iSeeker -> run();

?>