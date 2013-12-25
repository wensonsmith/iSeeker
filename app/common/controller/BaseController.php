<?php

/**
* 
*/
class BaseController
{
	/*
	*@var Template
	*/
	private static $T=NULL;
	
	protected function parseParams()
	{
		GLOBAL $_ISEEKER;
		$params = explode('-', $_ISEEKER['params']);

		return $params;
	}

	public function assign($name,$value)
	{
		$this->initTemplate();
		$this->T->assign($name,$value);
	}

	protected function initTemplate()
	{
		if (!isset($this->T)) {
			include_once ISEEKER_ROOT . '/core/Class/Template.class.php';
			$this->T = new Template();
			$this->T->tpl_dir = APP_PATH . '/view/iSeeker/' . CONTROLLER . '/' ;
			$this->T->cache_dir = APP_PATH . '/view/iSeeker/Cache/' . CONTROLLER . '/' ;
		}
	}

	public function display($action)
	{
		$this->initTemplate();
		$this->T->display($action);
	}

}

?>