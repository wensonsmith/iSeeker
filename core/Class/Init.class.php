<?php
// Load common functions
require ISEEKER_ROOT . '/core/Func/global.func.php';

/**
* Init 
*/
class Init
{

	public function &instance()
	{
		static $_instance = NULL;
		if($_instance === NULL)
			$_instance = new Init();
		return $_instance;
	}
	
	public function run()
	{
		# Global Various
		global $_ISEEKER;
		$_ISEEKER = array();

		$_ISEEKER['params'] = $this->parseURL();
		
		require_once iFile(CONTROLLER);
		$class = CONTROLLER . 'Controller';
		$action= ACTION;
		$controller = new $class;
		$controller->$action();
	}

	private function parseURL()
	{
		$control = 'Index';
		$action  = 'index';
		$params  = NULL;
		if (array_key_exists('PATH_INFO', $_SERVER))
		{
			$pathInfo = explode('/', $_SERVER['PATH_INFO']);
			$control  = empty($pathInfo[1]) ? 'Index' : $pathInfo[1];
			$action   = empty($pathInfo[2]) ? 'index' : $pathInfo[2];
			$params   = empty($pathInfo[3]) ? NULL : $pathInfo[3];
		}
		
		define('CONTROLLER', ucfirst($control));
		define('ACTION', $action);
		return $params;
	}


}



?>