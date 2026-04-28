<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$data    = json_decode(file_get_contents('php://input'), true);
$name    = htmlspecialchars(trim($data['name'] ?? ''));
$email   = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$message = htmlspecialchars(trim($data['message'] ?? ''));

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

require __DIR__ . '/mail/Exception.php';
require __DIR__ . '/mail/PHPMailer.php';
require __DIR__ . '/mail/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.titan.email';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'hello@nickgranados.com';
    $mail->Password   = 'Nig.KW.2018.$'; // ← cambia esto
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('hello@nickgranados.com', 'Nick Granados Portfolio');
    $mail->addAddress('hello@nickgranados.com', 'Nick Granados');
    $mail->addReplyTo($email, $name);

    $mail->Subject = "[Portfolio] New message from $name";
    $mail->Body    = "You have a new message from your portfolio contact form.\n\n"
                   . "Name:    $name\n"
                   . "Email:   $email\n\n"
                   . "Message:\n$message";

    $mail->send();
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
