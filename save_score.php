<?php

$filename = 'best_score.txt';

if (isset($_POST['score'])) {
	$score = intval($_POST['score']);

	if (file_exists($filename)) {
		$currentBestScore = intval(file_get_contents($filename));
		if ($score > $currentBestScore) {
			file_put_contents($filename, $score);
		}
	} else {
		file_put_contents($filename, $score);
	}
}

?>