
<html>
<body>

<form action="seve_file.php" method="post"
enctype="multipart/form-data">
<label for="file">Filename:</label>
<input type="file" name="file" id="file" /> 
<br />
<input type="submit" name="submit" value="Submit" />
</form>

</body>
</html>


<?php

function traverseDir($dir){
        if($dir_handle = @opendir($dir)){
            while($filename = readdir($dir_handle)){
                if($filename != "." && $filename != ".."){
                    $subFile = $dir.DIRECTORY_SEPARATOR.$filename; //要将源目录及子文件相连
                    if(is_dir($subFile)){ //若子文件是个目录
                      echo '-'.$filename.'<br/>';
                    }
                    else
                    {
	                    echo $filename.'<br/>';
                    }
				
                }
            }
            closedir($dir_handle);
        }
    }
$dirNames = traverseDir(__DIR__.'/music'); 

if ($_FILES["file"]["error"] > 0)
{
  echo "Error: " . $_FILES["file"]["error"] . "<br />";
}
else
{
  echo "Upload: " . $_FILES["file"]["name"] . "<br />";
}


if (file_exists("upload/" . $_FILES["file"]["name"]))
{
  echo $_FILES["file"]["name"] . " already exists. ";
}
else
{
  move_uploaded_file($_FILES["file"]["tmp_name"],
  __DIR__ . '/music/'.$_FILES["file"]["name"]);
}


?>