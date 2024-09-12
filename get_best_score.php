<?php

$filename = 'best_score.txt';

if (file_exists($filename)) {
	$bestScore = intval(file_get_contents($filename));
} else {
	$bestScore = 0;
}

header('Content-Type: application/json');
echo json_encode(['bestScore' => $bestScore]);

?>