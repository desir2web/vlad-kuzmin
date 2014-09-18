<?php
/**
 * The template for displaying the footer.
 */
?>

        </section>
        
        <footer class="footer">

            <div class="row-fluid footer-wrapper">
                <div class="container">
					<div class="span4">
						<div class="bankinfo">
                            <?php if ( is_active_sidebar( 'bankinfo' ) ) : ?>
                            <?php dynamic_sidebar( 'bankinfo' ); ?>
                            <?php endif; ?>
                        </div>
					</div>
                    <div class="span4">
                        <div class="address">
                            <?php if ( is_active_sidebar( 'address' ) ) : ?>
                            <?php dynamic_sidebar( 'address' ); ?>
                            <?php endif; ?>
                        </div>
                        <div class="tel">
                            <?php if ( is_active_sidebar( 'tel' ) ) : ?>
                            <?php dynamic_sidebar( 'tel' ); ?>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="span3 offset1">
                        <div class="copyrights">
                            <div class="desir">
                                <span>Сделал &mdash;</span> <a href="http://desir.me/" target="_blank"><svg viewBox="0 0 45 41" class="icons icons-desir"><use xlink:href="#desir"></use></svg></a>
                            </div>
                            <div class="copy">
                                &copy; 2008 &ndash; <?php $timezone = date_default_timezone_set("Europe/Moscow"); $date = date("Y"); echo "$date"; ?>, ООО&nbsp;&laquo;Прометей&raquo;
                            </div>
                        </div>
                    </div>
				</div>
			</div>

        </footer>
        
        <div class="popup-wrapper">
            
            <div class="popup-mask"></div>
        
            <div class="popup main-popup">
                <a href="#7" class="popup-close">
                    <i class="icon __close"></i>
                </a>
                <div class="form">
                    <!-- form id="orderform" method="post">
                    <div class="form-line">
                        <input name="name" type="text" class="field" placeholder="Представьтесь, пожалуйста">
                    </div>
                    <div class="form-line">
                        <input name="email" type="text" class="field" placeholder="Email — обязательное поле">
                    </div>
                    <div class="form-line">
                        <input name="tel" type="text" class="field" placeholder="Телефон">
                    </div>
                    <div class="form-line">
                        <a href="#7" class="btn btn-main btn-send">Отправить</a> 
                    </div>
                    </form -->
                    
                    <?php
                            $page_id = 2;
                                
                            $page_data = get_page( $page_id );
                                
                            $permalink = get_permalink( $page_id );
                            $title = $page_data->post_title;
                            $content = $page_data->post_content;
                        ?>
                    
                        <?php echo apply_filters( 'the_content', $content ); ?>

                    </div>
                
                </div>
            </div>

            <div class="popup thanks-popup">
                <a href="#7" class="popup-close">
                    <i class="icon __close"></i>
                </a>
                <div class="dscr">
                    <span class="title">Спасибо</span>
                    <p class="text">
                        Мы свяжемся с Вами в ближайшее время
                    </p>
                </div>
                <div class="action">
                    <a href="#7" class="btn btn-main btn-ok">ОК</a>
                </div>
            </div>
            
        </div>
        
	</body>
	
</html>