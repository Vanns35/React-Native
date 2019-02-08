
<?php

include 'config_file.php';
header("Content-type:application/json");
$message = '';
$json = json_decode(file_get_contents('php://input'), true);
//$connection = new mysqli($host_name, $host_user, $host_password, $database_name);
$Name = $json['Name'];
$Username = $json['Username'];
$Email = $json['Email'];
$Phone = $json['Phone'];
$hashed_password = password_hash($json['Password'],PASSWORD_DEFAULT);
//$Password = $json['Password'];

if($Name != '')
{
	
	$query = "SELECT Id FROM Registration where Email = '$json[Email]'"; 
	$query_result = $connection->query($query);
	if(mysqli_num_rows($query_result) > 0)
	{
		$message = 'Email Already Exists';
	}
	else
	{
		$query = "SELECT Id FROM Registration where Username = '$json[Username]'"; 
		$query_result = $connection->query($query);
		if(mysqli_num_rows($query_result) > 0)
		{
			$message = 'Username not available.. Try another..';
		}
		else
		{
			$query = "INSERT INTO Registration(Name,Username,Email,Mobile,Password)values('$json[Name]', '$json[Username]', '$json[Email]', '$json[Phone]', '$hashed_password')";
			$query_result = $connection->query($query);

			if($query_result == true)
			{
				$message = 'Registered Succesfully';
			}

			else
			{
				$message = 'Error! Try Again.';
			}
		}
	}
}
else
{
	$message = 'Please Fill all details';
}
echo json_encode($message);
$connection->close();

?>
