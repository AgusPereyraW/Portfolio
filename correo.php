<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags(trim($_POST["user_name"]));
    $email = filter_var(trim($_POST["user_mail"]), FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags(trim($_POST["user_message"]));

    // Valida que los campos no estén vacíos
    if (empty($nombre) OR empty($mensaje) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Puedes redirigir a una página de error o mostrar un mensaje
        http_response_code(400);
        echo "Completa todos los campos correctamente.";
        exit;
    }

    // Dirección de correo electrónico a la que se enviarán los mensajes
    $destinatario = "agusmapa@gmail.com"; // ¡CAMBIA ESTO POR TU DIRECCIÓN DE CORREO!

    // Asunto del correo electrónico
    $asunto = "Nuevo mensaje desde Portfolio";

    // Cuerpo del correo electrónico
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Correo electrónico: $email\n\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";

    // Encabezados adicionales
    $encabezados = "From: $nombre <$email>";

    // Envía el correo electrónico
    if (mail($destinatario, $asunto, $cuerpo, $encabezados)) {
        // Éxito - Puedes redirigir a una página de agradecimiento
        http_response_code(200);
        echo "Tu mensaje fue enviado.";
    } else {
        // Error al enviar el correo
        http_response_code(500);
        echo "Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.";
    }
} else {
    // Si alguien intenta acceder directamente al script
    http_response_code(403);
    echo "Hubo un problema con el envío, por favor vuelve al formulario e inténtalo de nuevo.";
}
?>
