<?php

/**
* 
*/
class BaseModel
{
	
	function __construct(argument)
	{
		# code...
	}

	private function createDBHelper()
	{
		static $DBHelper = NULL;

		if (!isset($DBHelper)) {
			GLOBAL $_ISEEKER;

			$config['host'] = $_ISEEKER['db']['host'];
			$config['user'] = $_ISEEKER['db']['user'];
			$config['pass'] = $_ISEEKER['db']['pass'];
			$config['name'] = $_ISEEKER['db']['name'];

			$DBHelper = new Mysql($config);
		}
		
		return $DBHelper;
	}


	
	/**
	 * 更新
	 *
	 * @param string $table
	 * @param array $values    array('field'=>'val')
	 * @param array $where     array('field'=>'value','field2'=>array('op'=>'>','v'=>'30'))
	 * @return Int  更新的id
	 */
	protected function update($table,$value,$where)
	{
		$whereStr = $this->joinWhereStr($where);
		$valueStr = $this->joinValueStr($value);

		$SQL = "UPDATE $table SET $valueStr WHERE $where";
		$result = $DBHelper->query($SQL);

		return $DBHelper->affectedRows();
	}


	/**
	 * 删除
	 *
	 * @param string $table
	 * @param array $where     array('field'=>'value','field2'=>array('op'=>'>','v'=>'30'))
	 * @return Int  删除的id
	 */
	protected function delete($table,$where)
	{
		$DBHelper = $this->createDBHelper();

		$whereStr = $this->joinWhereStr($where);
		$SQL = "DELETE FROM $table WHERE $where";
		$DBHelper->query($SQL);

		return $DBHelper->affectedRows();
	}


	/**
	 * 新增
	 *
	 * @param string $table
	 * @param array $where     array('field'=>'value','field2'=>array('op'=>'>','v'=>'30'))
	 * @return Int  删除的id
	 */
	protected function insert($table,$values)
	{
		$DBHelper = $this->createDBHelper();

		$params = $this->splitValues($values);
		$SQL = "INSERT INTO $table ( $params['fields'] ) VALUES ( $params['value'] )";
		$result = $DBHelper->query($SQL);

		return $DBHelper->insertId();
	}


	/**
	 * 查找
	 *
	 * @param string $table
	 * @param array $where     array('field'=>'value','field2'=>array('op'=>'>','v'=>'30'))
	 * @return Int  删除的id
	 */
	protected function select($table,$field,$where,$limit = 1,$offset = 0)
	{
		$whereStr = $this->joinWhereStr($where);

		$SQL = "SELECT $field FROM $table WHERE $where";

		$DBHelper = $this->createDBHelper();

		if ($limit == 1) {
			$result = $DBHelper->query($SQL);
			if (empty($result)) {return FALSE;}
			return $DBHelper->fetchAssoc($result);
		}

		$SQL .= "LIMIT $offset,$limit";
		$result = $DBHelper ->query($SQL);
		if (empty($result)) {return FALSE;}
		return $DBHelper->fetchAll($result);
	}


	/**
	 * 连接值的字符串
	 *
	 * @param array $values
	 * @return string
	 */
	private function joinValueStr($values)
	{
		foreach ( $values as $key => $val )
		{
			$str .= $key . "='" . $val . "',";
		}
		$str = rtrim ( $str, ',' );
		return $str;
	}
	
	/**
	 * 连接where的字符串
	 *
	 * @param array $where
	 * @return string
	 */
	private function joinWhereStr($where)
	{
		if (empty ( $where )) {
			$str = '1=1';
		} else {
			foreach ( $where as $key => $val )
			{
				if (is_array($val))
				{
					$str .= $key . $val['op'] ."'" . $val['v'] . "' AND ";
				}else{
					$str .= $key . "='" . $val . "' AND ";
				}
			}
			$str = rtrim ( $str, " AND " );
		}
	
		return $str;
	}


	/**
	 * 将fields 和 values 拆分开成字符串
	 *
	 * @param array $values
	 * @return array() 
	 *
	 */
	private function splitValues($values)
	{
		$key = $val = $sec = '';
		foreach ($values as $tKey => $tVal )
		{
			$key .= $sec . '`' . $tKey . '`';
			$val .= $sec . '\'' . $tVal . '\'';
			$sec = ', ';
		}
	
		return array(
				'fields' => $key,
				'values' => $val
		);
	}
}



?>