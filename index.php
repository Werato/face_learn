<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>faces</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

	<?php
	include("cons.php");
	include("function/sorce_loader.php");
	$loader->load_css_href(css_dir);
	?>
	

</head>
<body>

	<div id = "Stats-output">
	</div>
	<!--Div which will hold the Output -->
	<div id = "canvas_face">
	</div>
	<!--Javascript code that runs our Three.js examples -->
<?=$loader->load_scripts_href(scripts_dir)?>
</body>
</html>