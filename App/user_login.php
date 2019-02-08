
<?php

include 'config_file.php';
header("Content-type:application/json");
$message = '';
$json = json_decode(file_get_contents('php://input'), true);
$email = $json['Email'];
$Password = $json['Password'];
//$hashed_password = password_hash($json['Password'],PASSWORD_DEFAULT);
//if(password_verify($_POST["password"],$hashed_password))

if($email != '')
{
	if($Password != '')
	{
		$query = "SELECT Id FROM Registration where Email = '$email'";
		$message="hiee";
		$query_result = $connection->query($query);
		if($query_result == true)
		{
			if(mysqli_num_rows($query_result) > 0)
			{
				$query = "SELECT Password FROM Registration where Email = '$email'"; 
				$query_result = $connection->query($query);
				if($query_result == true)
				{
					$row=mysqli_fetch_assoc($query_result);
					//$output[] = json_encode($row);
					$Pass = $row['Password'];
					if(password_verify($Password,$Pass))
					{
						$message = 'Password Matched';
					}
					else
					{
						$message = 'Wrong Password';
					}
				}
				else
				{
					$message = 'Error! Try Again.';
				}
			}
			else
			{
				$message = 'User does not Exists';
			}
		}
		else
		{
			$message = 'Error! Try Again.';
		}
	}
	else
	{
		$message = 'Please Enter Password';
	}	
}
else
{
	$message = 'Please Enter Email';

}

echo json_encode($message);
$connection->close();
?>
