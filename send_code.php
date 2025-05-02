<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

session_start();
$email = $_POST['email'];
$code = rand(1000, 9999);
$_SESSION['code'] = $code;

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'yourgmail@gmail.com'; // گیمەیڵی خۆت
    $mail->Password = 'your-app-password';   // App Passwordی گیمەیڵ
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('yourgmail@gmail.com', 'Budget App');
    $mail->addAddress($email);
    $mail->Subject = 'کۆدی دڵنیاکردنەوە';
    $mail->Body = "کۆدی تایبەتی تۆ: $code";

    $mail->send();
    echo "کۆدی نێردرا بۆ ئیمەیڵەکەت.";
} catch (Exception $e) {
    echo "ناتوانێت نێردرێت. هەڵە: {$mail->ErrorInfo}";
}
?>