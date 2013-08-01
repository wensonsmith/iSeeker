<?php

/*
 *   根据Controller获取Class文件
 */

function iFile($controller)
{
	$path = APP_PATH . '/controller/' . $controller . 'Controller.php';
	return $path;
}


?>