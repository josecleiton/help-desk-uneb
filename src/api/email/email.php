<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<?php
$nome = $_POST['name'];
$email = $_POST['email']; 
?>

<?php
$to = 'danilodelete@hotmail.com';
$subject = "teste $nome";
$message = '<html>
<head>
<h1> ETA CARAI</H1>
 <title>Birthday Reminders for August</title>
</head>
<body>
<p>Here are the birthdays upcoming in August!</p>
<table>
 <tr>
  <th>Person</th><th>Day</th><th>Month</th><th>Year</th>
 </tr>
 <tr>
  <td>Joe</td><td>3rd</td><td>August</td><td>1970</td>
 </tr>
 <tr>
  <td>Sally</td><td>17th</td><td>August</td><td>1973</td>
 </tr>
</table>
</body>
</html>
';
/* Para enviar email HTML, você precisa definir o header Content-type. */
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

/* headers adicionais */
$headers .= "To: Mary <mary@example.com>, Kelly <kelly@example.com>\r\n";
$headers .= "From: Birthday Reminder <birthday@example.com>\r\n";

$headers .= "Cc: birthdayarchive@example.com\r\n";
$headers .= "Bcc: birthdaycheck@example.com\r\n";
mail('danilodelete@gmail.com','PHP MAIL',$message,$headers);
?>
<form action="email.php" method="post"></form>
  <input type="text" placeholder='nome' name="nome" id="name"><br/>
  <input type="email" name="email" placeholder='email' id="email"><br/>
  <input type="submit" value="Enviar">
</body>
</html>