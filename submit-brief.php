<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Build email content
$emailContent = "
<html>
<head>
<style>
body { font-family: sans-serif; line-height: 1.6; }
.header { background: linear-gradient(135deg, #FF5500, #FF0000); color: white; padding: 20px; }
.section { background: #f9f9f9; padding: 20px; margin: 10px 0; border-left: 4px solid #FF5500; }
.label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
.value { margin: 5px 0 15px 0; }
</style>
</head>
<body>
<div class='header'>
<h1>🚀 NOUVEAU LEAD - " . htmlspecialchars($data['brandName'] ?? 'Projet Inconnu') . "</h1>
</div>

<div class='section'>
<h2>📋 CONTACT</h2>
<div class='label'>Marque</div>
<div class='value'>" . htmlspecialchars($data['brandName'] ?? '-') . "</div>
<div class='label'>Email</div>
<div class='value'>" . htmlspecialchars($data['email'] ?? '-') . "</div>
<div class='label'>Téléphone</div>
<div class='value'>" . htmlspecialchars($data['phone'] ?? '-') . "</div>
</div>

<div class='section'>
<h2>💼 BUSINESS</h2>
<div class='label'>Pitch</div>
<div class='value'>" . nl2br(htmlspecialchars($data['pitch'] ?? '-')) . "</div>
<div class='label'>Concurrents</div>
<div class='value'>" . htmlspecialchars($data['competitors'] ?? '-') . "</div>
</div>

<div class='section'>
<h2>🎯 CIBLE</h2>
<div class='label'>Cible</div>
<div class='value'>" . htmlspecialchars($data['target'] ?? '-') . "</div>
<div class='label'>Problème</div>
<div class='value'>" . nl2br(htmlspecialchars($data['problem'] ?? '-')) . "</div>
<div class='label'>Solution</div>
<div class='value'>" . nl2br(htmlspecialchars($data['solution'] ?? '-')) . "</div>
<div class='label'>Pourquoi vous</div>
<div class='value'>" . nl2br(htmlspecialchars($data['whyUs'] ?? '-')) . "</div>
</div>

<div class='section'>
<h2>🎨 IDENTITÉ</h2>
<div class='label'>Archétype</div>
<div class='value'>" . htmlspecialchars($data['archetype'] ?? '-') . "</div>
<div class='label'>Vibe</div>
<div class='value'>" . htmlspecialchars($data['vibeSeriousness'] ?? '-') . " / " . htmlspecialchars($data['vibeStyle'] ?? '-') . "</div>
<div class='label'>Copywriting</div>
<div class='value'>" . htmlspecialchars($data['copywriting'] ?? '-') . "</div>
</div>

<div class='section'>
<h2>📦 PACK</h2>
<div class='label'>Pack</div>
<div class='value'><strong>" . htmlspecialchars($data['selectedPack'] ?? '-') . "</strong></div>
<div class='label'>Prix / Délai</div>
<div class='value'>" . htmlspecialchars($data['price'] ?? '0') . "€ / " . htmlspecialchars($data['delay'] ?? '0') . "j</div>
" . (isset($data['upsells']) ? "
<div class='label'>Options</div>
<div class='value'>" . htmlspecialchars($data['upsells']) . "</div>
" : "") . "
</div>

<div class='section'>
<h2>🌐 DOMAINE</h2>
<div class='label'>Domaine</div>
<div class='value'>" . htmlspecialchars($data['hasDomain'] ?? 'Non') . " " . (isset($data['domainName']) ? "(" . htmlspecialchars($data['domainName']) . ")" : "") . "</div>
<div class='label'>Care</div>
<div class='value'>" . htmlspecialchars($data['care'] ?? 'Non') . "</div>
</div>

</body>
</html>
";

// Send email
$to = 't.martella@bigneurons.com';
$subject = '🚀 NOUVEAU LEAD - ' . ($data['brandName'] ?? 'Projet Inconnu');
$headers = "From: Tomorrow Online <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
$headers .= "Cc: mf.phan@bigneurons.com, a.escare@bigneurons.com\r\n";
$headers .= "Reply-To: " . ($data['email'] ?? 'noreply@example.com') . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$sent = mail($to, $subject, $emailContent, $headers);

if ($sent) {
    // Send auto-response
    $clientEmail = $data['email'] ?? null;
    if ($clientEmail) {
        $autoResponse = "
        <html>
        <body style='font-family: sans-serif; padding: 40px;'>
        <h1 style='color: #FF5500;'>Merci pour votre confiance !</h1>
        <p>Votre brief a bien été reçu par notre équipe.</p>
        <p><strong>Un membre de notre équipe vous appellera demain matin entre 09h00 et 10h00</strong>.</p>
        <p style='color: #666; margin-top: 40px;'>À très vite,<br>L'équipe Tomorrow Online</p>
        </body>
        </html>
        ";
        
        $autoHeaders = "From: Tomorrow Online <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
        $autoHeaders .= "MIME-Version: 1.0\r\n";
        $autoHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
        
        mail($clientEmail, 'Brief bien reçu ! 🚀', $autoResponse, $autoHeaders);
    }
    
    echo json_encode(['success' => true, 'message' => 'Brief envoyé']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur envoi email']);
}
?>
