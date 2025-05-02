<?php
session_start();
$userCode = $_POST['code'];
if ($_SESSION['code'] == $userCode) {
  echo "verified";
} else {
  echo "invalid";
}
?>