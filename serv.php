<?
$db = 'test';
$host = 'localhost';
$user = 'root';
$password = '';
$dbtable = 'comments';

$connection = new mysqli($host, $user, $password);
//$connection = new mysqli($host, $user, $password, $db);

$sql="CREATE DATABASE IF NOT EXISTS `$db`";
$connection->query($sql);
$connection->select_db($db);
$sql="CREATE TABLE IF NOT EXISTS `$db`.`$dbtable` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(30) NOT NULL , `email` VARCHAR(50) NOT NULL , `comment` VARCHAR(500) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";
$connection->query($sql);
//$connection->close();


if($_POST['action']=='add'){
	$name = $_POST['name'];
	$email = $_POST['email'];
	$comment = $_POST['comment'];

	if($name!="" && $email!="" && $comment!=""){
		$sql = "INSERT INTO `$dbtable` (`id`, `name`, `email`, `comment`) VALUES (NULL, '$name', '$email', '$comment');";

		if($connection->query($sql)){
			showAll();
			return false;
		}
	}
	else{
		echo "<h1>Заполните ВСЕ поля!</h1>";
		return false;
	}
}
/* выводим все */
function showAll(){
	global $connection;
	global $dbtable;
	$item = '<div class="col-md-6 item col-xs-12 col-sm-6 col-lg-4">'.
				'<div class="card">'.
						'<div class="card-header">{name}</div>'.
						'<div class="card-body">'.
								'<span class="email">{email}</span>'.
								'<span class="message">{comment}</span>'.
						'</div>'.
					'</div>'.
			'</div>';
	$sql = "SELECT * FROM `$dbtable`";
	$res = $connection->query($sql);
	while($row = $res->fetch_assoc()){
			$itemm = $item;
			$search = ['{name}', '{email}', '{comment}'];
			$replace = [$row['name'], $row['email'], $row['comment']];
			$itemm = str_replace($search, $replace, $item);
			echo $itemm;
			}
	$res->close();
	$connection->close();
}
showAll();