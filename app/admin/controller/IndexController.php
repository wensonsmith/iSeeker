<?php

/**
* 
*/
class IndexController extends BaseController
{
	
	function index()
	{
		$this->assign('siteName','I am administrator!');
		$this->assign('pageName','iSeeker');
		$this->display('index');
	}
}


?>