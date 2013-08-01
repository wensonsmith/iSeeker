<?php

/**
* 
*/
class IndexController extends BaseController
{
	public function index()
	{
		$this->assign('siteName','I am Seeker');
		$this->display('index');
	}

	public function post()
	{
		echo "this is a post";
		print_r($this->parseParams());
	}
}




?>