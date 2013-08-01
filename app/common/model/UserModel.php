<?php
/**
* 
*/
class UserModel extends BaseModel
{
	private $_tableName = 'iseeker_users';
	
	function __construct(argument)
	{
		# code...
	}

	public function getUser($uid)
	{
		return $this->select($this->tableName,'*',array('uid'=>$uid));
	}

	public function updateUser($values,$uid)
	{
		return $this->update($this->tableName,$values,array('uid'=>$uid));
	}

	public function addUser($values)
	{
		return $this->insert($this->tableName,$values);
	}

	public function deleteUser($uid)
	{
		return $this->delete($uid);
	}
}








?>