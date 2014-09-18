<?php get_header(); ?>
            
            <div class="row-fluid welcome" id="welcome">
                <div class="tablecell">
                    <div class="container">
                        <div class="span1">
                            <div class="logo"><svg viewBox="0 0 60 114" class="logo"><use xlink:href="#logo"></use></svg></div>
                        </div>
                        <div class="span5">
                            <div class="siteinfo">
                                <span class="name"><?php bloginfo( 'name' ); ?></span>
                                <h1 class="description"><?php bloginfo( 'description' ); ?></h1>
                            </div>
                        </div>
                        <div class="span4 offset2">
                            <div class="important">
                                <?php
                                    $posts = get_posts("category=1&numberposts=1");
                                    if ($posts) :
                                    foreach ($posts as $post) : setup_postdata ($post);
                                    $permalink = get_permalink( $id );
                                ?>
                                <a href="<?php echo $permalink; ?>">
                                    <?php the_title(); ?>
                                </a>
                                <?php
                                    endforeach;
                                    endif;
                                ?>
                            </div> 
                        </div>
                    </div> 
                    <div class="container">
                        <div class="span7 offset1">
                            <div class="productioninfo clearfix">
                                <div class="item">
                                    <span class="number">5000</span>
                                    <span class="info">м<sup>2</sup> площадь производства</span>
                                </div>
                                <div class="item">
                                    <span class="number">500</span>
                                    <span class="info">м<sup>3</sup> древесины в&nbsp;месяц</span>
                                </div>
                                <div class="item">
                                    <span class="number">40</span>
                                    <span class="info">высококлассных специалистов</span>
                                </div>
                                <div class="item">
                                    <span class="number">30</span>
                                    <span class="info">единиц оборудования</span>
                                </div>
                                <div class="item">
                                    <span class="number">6</span>
                                    <span class="info">лет<br>на рынке</span>
                                </div>
                                <div class="item">
                                    <span class="number">5</span>
                                    <span class="info">производственных корпусов</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="span4 offset1">
                            <a href="#" class="btn btn-main show-popup">Оформить заявку</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row-fluid characteristics">
                <div class="container">
                    <div class="span12">
                        <h2 class="caption">Производственные характеристики</h2>
                    </div>
                </div>
                <div class="items">
                    <div class="container">
                        <div class="span3">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-60"><use xlink:href="#icon-01"></use></svg>
                                <span class="info">Итальянское оборудование</span>
                            </div>
                        </div>
                        <div class="span3 offset1">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-60"><use xlink:href="#icon-02"></use></svg>
                                <span class="info">Собственная <nobr>ж/д</nobr>&nbsp;ветка</span>
                            </div>
                        </div>
                        <div class="span2 offset1">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-60"><use xlink:href="#icon-03"></use></svg>
                                <span class="info">Башенный кран</span>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="span3">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-60"><use xlink:href="#icon-04"></use></svg>
                                <span class="info">Фумигационная обработка</span>
                            </div>
                        </div>
                        <div class="span3 offset1">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-60"><use xlink:href="#icon-05"></use></svg>
                                <span class="info">Доставка по России&nbsp;и&nbsp;СНГ</span>
                            </div>
                        </div>
                        <div class="span4 offset1">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-60"><use xlink:href="#icon-06"></use></svg>
                                <span class="info">Готовность работать<br> в&nbsp;3&nbsp;смены</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="row-fluid products" id="production">
                        
                    <div id="products" class="owl-carousel">
                        
                    <?php
                        $posts = get_posts("category=4");
                        if ($posts) :
                        foreach ($posts as $post) : setup_postdata ($post);
                        $thumbnail = '';
                            if ( has_post_thumbnail( $post->ID ) ) {
                            $thumbnail = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ));
                        }
                        $permalink = get_permalink( $id );
                    ?>

                        <div class="item">
                            <div class="bg-image" style="background: url(<?php echo $thumbnail; ?>) center center no-repeat;">
                                <div class="overlay">
                                    <div class="tablecell">
                                        <div class="container">
                                            <div class="span8 offset2">
                                                <a href="<?php echo $permalink; ?>"><h2 class="caption"><?php the_title(); ?></h2></a>
                                                <div class="info">
                                                    <?php the_content(''); ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <?php
                        endforeach;
                        endif;
                    ?>

                    </div>
                    <div class="viewall">
                        <a href="<?php $permalink = get_category_link("4"); echo esc_url( $permalink ); ?>">Смотреть всю продукцию</a>
                    </div>
			</div>
            
            <div class="row-fluid structure" id="structure">
                <div class="container">
                    <div class="span8 offset2">
                        <h2 class="caption">Предприятие включает в себя все необходимые службы и&nbsp;участки для эффективной работы:</h2>
                    </div>
                </div>
                <div class="items">
                    <div class="container">
                        <div class="span4">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-07"></use></svg>
                                <span class="info">Распилочный<br>цех</span>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-08"></use></svg>
                                <span class="info">Заготовительный<br>участок</span>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-09"></use></svg>
                                <span class="info">Сборочный<br>участок</span>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="span4">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-10"></use></svg>
                                <span class="info">Участок сушки<br>древесины</span>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-11"></use></svg>
                                <span class="info">Малярный<br>участок</span>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="item">
                                <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-12"></use></svg>
                                <span class="info">Ремонтно-механический<br>участок</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="span4 offset4">
                        <a href="#" class="btn btn-main show-popup">Оформить заявку</a>
                    </div>
                </div>
            </div>
            
            <div class="row-fluid garancy" id="garancy">
                <div class="container">
                    <div class="span8 offset2">
                        <h2 class="caption">Мы гарантируем высокий уровень качества и&nbsp;индивидуальный подход с&nbsp;учётом ваших требований и&nbsp;пожеланий</h2>
                    </div>
                </div>
            </div>
            
            <div class="row-fluid benefits">
                <div class="overlay">
                    <div class="items">
                        <div class="container">
                            <div class="span4">
                                <div class="item">
                                    <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-13"></use></svg>
                                    <span class="info">Чёткие сроки</span>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="item">
                                    <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-14"></use></svg>
                                    <span class="info">Проверенные технологии&nbsp;и&nbsp;материалы</span>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="item">
                                    <svg viewBox="0 0 60 60" class="icons icons-size-100"><use xlink:href="#icon-15"></use></svg>
                                    <span class="info">Высокое качество</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row-fluid devices">
                <div class="container">
                    <div class="span10 offset1">
                        <h2 class="caption">Наше предприятие всегда использует весь накопленный опыт и&nbsp;потенциал для решения задач, поставленных нашими клиентами, а&nbsp;помогает нам в&nbsp;этом наше надежное оборудование:</h2>
                    </div>
                </div>
                <div class="container">
                    <div class="span3">
                        <ul>
                            <li>Станок однопильный</li>
                            <li>Рейсмусовые станки</li>
                            <li>Пилы маятниковые</li>
                            <li>Пилорама 2Р75-1</li>
                            <li>Заточные станки</li>
                            <li>Горячий пресс</li>
                        </ul>
                    </div>
                    <div class="span3">
                        <ul>
                            <li>Торцовочные станки</li>
                            <li>Фуговальные станки</li>
                            <li>Пятипильный станок</li>
                            <li>Станок двухпильный</li>
                            <li>Сверлильные станки</li>
                            <li>Фрезерные станки</li>
                        </ul>
                    </div>
                    <div class="span6">
                        <ul>
                            <li>Четырёхсторонний строгально-калёвочный станок</li>
                            <li>Круглопильный станок с кареткой 3200мм</li>
                            <li>Станок десятипильный прорезной</li>
                            <li>Цепно-долбёжные станки</li>
                            <li>Ленточнопильные станки</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="row-fluid callback">
                <div class="container">
                    <div class="span12">
                        <h2 class="caption">Мы всегда открыты для&nbsp;взаимовыгодного сотрудничества</h2>
                    </div>
                </div>
                <div class="container">
                    <div class="span8 offset2">
                        <span class="info">
                            Обратитесь в ООО «Прометей»<br>и мы сделаем Вам конкурентоспособное предложение
                        </span>
                    </div>
                </div>
                <div class="container">
                    <div class="span4 offset4">
                        <a href="#" class="btn btn-main show-popup">Оформить заявку</a>
                    </div>
                </div>
            </div>

            <div class="row-fluid news-more-about" id="news">
                <div class="news">
                    <div class="container">
                        <div class="span12">
                            <h2 class="caption">Новости</h2><a href="<?php $permalink = get_category_link("3"); echo esc_url( $permalink ); ?>" class="viewall">Все новости</a>
                        </div>
                    </div>
                    <div class="container">
                        <?php
                            $posts = get_posts("category=3&numberposts=4");
                            if ($posts) :
                            foreach ($posts as $post) : setup_postdata ($post);
                            $permalink = get_permalink( $id );
                            
                            $categories = get_the_category();
                            $separator = ' ';
                            $output = '';
                            if($categories){
                                foreach($categories as $category) {
                                    $output .= $category->slug.$separator;
                                }
                            }
                        ?>
                        <div class="item">
                            <div class="span3">
                                <h3 class="caption"><a href="<?php echo $permalink; ?>" class="<?php echo trim($output, $separator); ?>"><?php the_title(); ?></a></h3><span class="date"><?php echo get_the_date(); ?></span>
                            </div>
                        </div>
                        <?php
                            endforeach;
                            endif;
                        ?>
                    </div>
                </div>

                <?php if ( is_active_sidebar( 'more_menu' ) ) : ?>
                <?php dynamic_sidebar( 'more_menu' ); ?>
                <?php endif; ?>

                <?php if ( is_active_sidebar( 'about' ) ) : ?>
                <?php dynamic_sidebar( 'about' ); ?>
                <?php endif; ?>

            </div>
            
            <div class="row-fluid map" id="contacts">
                <script type="text/javascript" charset="utf-8" src="http://api-maps.yandex.ru/services/constructor/1.0/js/?sid=1UwXg13yU729A0-elRCuqScR46Jc0dtH"></script>
            </div>
            
<?php get_footer(); ?>