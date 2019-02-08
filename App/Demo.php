
 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Example";

// Create connection
header("Content-type:application/json");

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Registration";
$result = $conn->query($sql);

while($row=mysqli_fetch_assoc($result))
{
	$output[]=$row;
}

print(json_encode($output,JSON_PRETTY_PRINT));
$conn->close();
?> 
