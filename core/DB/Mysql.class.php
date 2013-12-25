<?php


/**
* 
*/
class Mysql
{
	
	/*服务器*/
	private $host;           

	/*用户名*/
	private $user;           

	/*服务器密码*/
	private $pass;

	/*表名*/
	private $name;

	/*链接*/
	private $conn;

	/*数据库错误*/
	private $error;  
    private $errno; 
	
	function __construct($config)
	{
		$this->host = $config['host'];
		$this->user = $config['user'];
		$this->pswd = $config['pswd'];
		$this->name = $config['name'];

		$this->connect();
	}

	function __destruct()
	{
		mysql_close($this->conn);
	}

	private function connect()
	{
		$this->conn = mysql_connect($this->host,$this->user,$this->pswd);
		$this->setCharset();
		$this->selectDB($this->name);
		if (!$conn) {
			$this->error("Can't Connect To Host");
		}

	}

	/**
	 * 设置字符集
	 * @param string $charset
	 * @return boolean|resource
	 */
	protected function setCharset($charset = 'utf8'){
		if (version_compare(PHP_VERSION, '5.2.3', '>=')) {
			// the preferred way to set charset
			return mysql_set_charset($charset,$this->conn);
		}else{
			return mysql_query('SET NAMES ' . $charset,$this->conn);
		}
	}
	
	/**
	 * 选择一个数据库
	 * @param $dbName
	 * @return bool
	 */
	public function selectDB($dbName){
		if(isset($dbName)){
			$re = mysql_select_db($dbName, $this->conn);
			if(!$re){
				$this->error('Select DB Failure');
			}
		}
		return true;
	}


	

	public function query($sql)
	{
		$result = mysql_query($sql);

		if ($result) {
			return $result;
		}else{
			$this->error("Query Failed",$sql);
			return false;
		}
	}

	public function insertId()
	{
		return mysql_insert_id($this->conn);
	}


	public function affectedRows()
	{
		return mysql_affected_rows($this->conn);
	}

	public function fetchAll($sql)
	{
        $res = $this->query($sql);
        if ($res !== false)
        {
            $arr = array();
            while ($row = mysql_fetch_assoc($res))
            {
                $arr[] = $row;
            }

            return $arr;
        }
        else
        {
            return false;
        }
	}

	public function fetchAssoc($query)
	{
		return mysql_fetch_assoc($query);
	}


	public function fetchRow($query)
	{
		$query = mysql_fetch_row($query);
		return $query;
	}

	public function bigQuery()
	{
		mysql_unbuffered_query(query);
	}

	private function error($msg='',$sql=''){
		$message = '';
		if ($msg) {
			$message .=  "ErrorMsg:$msg; <br/>";
		}

		if ($sql) {
			$message .=  "SQL: $sql; <br/>";
		}
		
		$message .=  "Error: " . mysql_error($this->conn)." <br/>";
		$message .=  "Errno: " . mysql_errno($this->conn);;
	
		trigger_error($message,E_USER_ERROR);
		return false;
	}
}


?>