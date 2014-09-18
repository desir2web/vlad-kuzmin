<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */
?>

<?php
  $post = $wp_query->post;
 
  if (in_category('production')) {
      include(TEMPLATEPATH.'/single-production.php');
  } else {
      include(TEMPLATEPATH.'/single-default.php');
  }
?>