<?php

class Template {

    #模板文件扩展名 建议为PHP文件 这样在Dreamweaver中PHP代码才会有高亮效果
    public $tpl_ext = '.html';

    #模板文件所在目录 注意以斜杠结束
    public $tpl_dir = null;
           
    #模板编译后的缓存目录 一样以斜杠结束 无则自动创建
    public $cache_dir = null;
    
    /**
     * 编译后模板的缓存时间（单位：秒）
     * 0为马上过期 即每次都重新编译
     * -1为永不过期 网站上线后建议设置为-1
     */
    public $cache_time = 0;

    #自定义的正则替换
    public $my_rep = array(
        '~__Public__~' => '../Public',
        '~__PUBLIC__~' => ISEEKER_ROOT,
//        '~__PROJ__~' => '/index.php',
//        '~__SPACE__~' => '/index.php/home',
//        '~__CLASS__~' => '/index.php/home/index',
//        '~__METHOD__~' => '/index.php/home/index/index',
    );

    #内置的正则替换
    private $tmd_rep = array(
        #{$name}
        '~\{(\$[a-z0-9_]+)\}~i'
            => '<?php echo $1 ?>',

        #{$arr.key}
        '~\{(\$[a-z0-9_]+)\.([a-z0-9_]+)\}~i'
            => '<?php echo $1[\'$2\'] ?>',

        #{$arr.key.key2}
        '~\{(\$[a-z0-9_]+)\.([a-z0-9_]+)\.([a-z0-9_]+)\}~i'
            => '<?php echo $1[\'$2\'][\'$3\'] ?>',

        #＜?php include('inc/top.php'); ?＞
        '~<\?php\s+(include_once|require_once|include|require)\s*\(\s*(.+?)\s*\)\s*;?\s*\?>~i'
            => '<?php include \$this->_include($2, __FILE__) ?>',

        #{:strip_tags($a)}
        '~\{:(.+?)\}~'
            => '<?php echo $1 ?>',

        #{~var_dump($a)}
        '~<\~(.+?)\~>~'
            => '<?php $1 ?>',
        
    );
    // 用于存储模板变量
    public $data = array();
    
    function __construct($cfg=NULL) {
        if ($cfg) {
            $this->config($cfg);
        }
    }

    function defineConst()
    {
        define('SITE_PUBLIC', ISEEKER_ROOT . '/public');
    }
    function config($cfg) {
        if (is_string($cfg)) {
            $cfg = require $cfg;
        }
        if (isset($cfg['tpl_dir'])) {
            $this->tpl_dir = $cfg['tpl_dir'];
        }
        if (isset($cfg['tpl_ext'])) {
            $this->tpl_ext = $cfg['tpl_ext'];
        }
        if (isset($cfg['cache_dir'])) {
            $this->cache_dir = $cfg['cache_dir'];
        }
        if (isset($cfg['cache_time'])) {
            $this->cache_time = $cfg['cache_time'];
        }
        if (isset($cfg['my_rep'])) {
            $this->my_rep = $cfg['my_rep'];
        }
        if (isset($cfg['data'])) {
            $this->data = $cfg['data'];
        }
    }
    // 赋值
    function assign($name, $value=NULL) {
        if (is_array($name)) {
            foreach ($name as $k => $v) {
                $this->data[$k] = $v;
            }
        }else{
            $this->data[$name] = &$value;
        }
    }
    // 输出页面
    function display($tpl_file) {
        $_cache_path = $this->cache_path($tpl_file);
        if (!$this->is_cached($_cache_path)) {
            $this->compile($this->tpl_path($tpl_file), $_cache_path);
        }
        unset($tpl_file);
        extract($this->data); // 如果data里有个_cache_path...
        include $_cache_path;
    }
    // 返回页面
    function fetch($tpl_file) {
        ob_start();
        ob_implicit_flush(0);
        $this->display($tpl_file);
        return ob_get_clean();
    }
    // 获取模板文件路径
    private function tpl_path($tpl_file) {
        return $this->tpl_dir . $tpl_file . $this->tpl_ext;
    }
    // 获取模板缓存路径
    private function cache_path($tpl_file) {
        return $this->cache_dir . $tpl_file . $this->tpl_ext;
    }
    // 模板缓存是否有效
    private function is_cached($cache_path) {
        if (!file_exists($cache_path)) {
            return false;
        }
        if ($this->cache_time<0) {
            return true;
        }
        $cache_time = filemtime($cache_path);
        if ( time()-$cache_time > $this->cache_time ) {
            return false;
        }
        return true;
    }
    // 编译模板
    private function compile($tpl_path, $cache_path) {
        $tpl = @file_get_contents($tpl_path);
        if ($tpl===FALSE) {
            die("模板文件“{$tpl_path}”不存在");
        }
        
        $tmp = array_merge($this->tmd_rep, $this->my_rep);
        $cache = preg_replace(array_keys($tmp), $tmp, $tpl);
        
        @mkdir(dirname($cache_path), 0777, true);
        
        $tmp = @file_put_contents($cache_path, $cache, LOCK_EX);
        if ($tmp===FALSE) {
            die("编译后的模板文件“$cache_path”无法写入");
        }
    }
    // 页面有include时用到
    private function _include($inc_file, $cache_path) {
        $inc_path = dirname($cache_path) . '/' . $inc_file;
        if (!$this->is_cached($inc_path)) {
            $tpl_path = str_replace(realpath($this->cache_dir), realpath($this->tpl_dir), $inc_path);
            $this->compile($tpl_path, $inc_path);
        }
        return $inc_path;
    }
}