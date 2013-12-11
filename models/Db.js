/**
 * Created by Administrator on 2013/11/13.
 */

var Settings = require("../settings");
var Db = require("mongodb").Db;
var Connection = require("mongodb").Connection;
var Server = require("mongodb").Server;

module.exports = new Db(Settings.db,new Server(Settings.host,Connection.DEFAULT_PORT,{}));