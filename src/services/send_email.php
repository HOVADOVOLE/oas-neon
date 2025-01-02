<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $to = "service@oas-neon.com"; // Zde nahraďte svou e-mailovou adresu
    $subject = "Nová zpráva z kontaktního formuláře";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Jméno: $name\n";
    $body .= "E-mail: $email\n";
    $body .= "Telefon: $phone\n";
    $body .= "Zpráva:\n$message\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["success" => true, "message" => "E-mail byl úspěšně odeslán!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Nastala chyba při odesílání e-mailu."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Neplatná metoda odeslání."]);
}
?>
