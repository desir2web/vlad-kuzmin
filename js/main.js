$(function() {

    var App = {};
    App.Collections = {};
    App.Models = {};
    App.Views = {};
    App.Router = {};

    /*****************
     *
     *  Models
     *
     ******************/

    App.Routes = [{
        id: 0,
        route: 'home',
        color: 'rgba(72,47,31,.45)'
    }, {
        id: 1,
        route: 'resume',
        color: 'rgba(42,7,34,.45)'
    }, {
        id: 2,
        route: 'show',
        color: 'rgba(72,47,31,0)'
    }, {
        id: 3,
        route: 'school',
        color: 'rgba(17,64,94,.8)'
    }, {
        id: 4,
        route: 'gallery',
        color: 'rgba(0,0,0,.45)'
    }, {
        id: 5,
        route: 'news',
        color: 'rgba(50,43,21,.45)'
    }, {
        id: 6,
        route: 'contacts',
        color: 'rgba(54,76,91,.45)'
    }];

    /*****************
     *
     *  Views
     *
     ******************/

    App.Views.App = Backbone.View.extend({
        el: 'body',
        routeCounter: 0,
        events: {
            'click .js-slideArrowLeft': 'prevPage',
            'click .js-slideArrowRight': 'nextPage',
            'click .js-showVideoSliderBtn': 'showVideoSlider',
            'click .js-showPhotoSliderBtn': 'showPhotoSlider',
            'click .js-showHomeVideoSliderBtn': 'showHomeVideoSlider',
            'keyup': 'arrowSlide',
            'click .js-menuLink': 'setPointer',
            'click .js-recentNewsBtn': 'renderRecentNews'
        },
        frameWidth: 0,
        frameHeight: 0,
        framesCount: 0,
        currentFrame: 0,
        headerHeight: 0,
        footerHeight: 0,
        animationSpeed: 500,
        isAdmin: function() {
            if ($('html.js-isAdmin').length > 0) {
                return true;
            } else {
                return false;
            }
        },
        renderRecentNews: function(e) {
            var $currentTarget = $(e.currentTarget);

            if ($currentTarget.hasClass('active')) {
                newsCollection.fetch({
                    url: $currentTarget.data('url'),
                    reset: true
                });
            } else {
                $currentTarget.addClass('active');
            }
        },
        setPointer: function(e) {
            e.stopPropagation();
            var $currentTarget = $(e.currentTarget),
                $pointer = this.$('.js-menuPointer'),
                menuItemWidth = $currentTarget.outerWidth(),
                menuItemPosition = $currentTarget.position().left;
            $pointer.css({
                'left': menuItemPosition + (menuItemWidth / 2) - 5
            });

            // Reset active class for recent news btn
            this.$('.js-menuItem').removeClass('active');
        },
        getFramesInfo: function() {
            var $window = $(window);
            this.frameWidth = $window.width() >= 940 ? $window.width() : 940;
            this.frameHeight = $window.height() >= 620 ? $window.height() : 620;
            this.framesCount = this.$('.js-section').length;

            this.headerHeight = this.$('.js-siteHeader').height();
            this.footerHeight = this.$('.js-siteFooter').height();
        },
        resize: function(e) {
            var self = this;

            $(window).off('resize');

            setTimeout(function() {
                self.setSizes();
                router.setActiveFrame(self.currentFrame);
                // Uodate custom scroll
                appView.$('.js-scroll').perfectScrollbar('update');
                $(window).on('resize', function(e) {
                    self.resize(e);
                });
            }, 700);
        },
        setSizes: function() {
            var self = this;
            this.getFramesInfo();

            this.$('.js-framesContainer').css({
                'width': this.frameWidth * this.framesCount,
                'height': this.frameHeight
            });
            this.$('.js-section, .js-frame').css({
                'width': this.frameWidth,
                'height': this.frameHeight
            });
            this.$('.js-section').each(function(index, el) {
                $(el).css({
                    'left': index * self.frameWidth
                });
            });
            this.$('.js-container').css({
                'height': (this.frameHeight - this.headerHeight - 30 - this.footerHeight) - (this.isAdmin() ? 32 : 0),
                'margin-top': (this.headerHeight + 30) + (this.isAdmin() ? 32 : 0)
            });
            this.$('.js-article').css({
                'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 100 - (this.isAdmin() ? 32 : 0)
            });
            this.$('.js-tabsContent').css({
                'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 30 - (this.isAdmin() ? 32 : 0)
            });
            this.$('.js-newsContainer').css({
                'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 100 - (this.isAdmin() ? 32 : 0)
            });
            this.$('.js-galleryContainer').css({
                'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 30 - (this.isAdmin() ? 32 : 0)
            });
            if (this.isAdmin()) {
                this.$('.js-siteHeader').css({
                    'top': 32
                });
            }
        },
        initialize: function() {
            var self = this;
            $(window).on('resize', function(event) {
                self.resize(event);
            });

            this.setSizes();

            // Columnizer
            this.$('.js-article').columnize({
                columns: 3,
                lastNeverTallest: true,
                buildOnce: true,
                doneFunc: function(e) {
                    self.$('.column').addClass('wow bounceInDown');
                    self.$('.column').each(function(index, el) {
                        $(el).attr('data-wow-delay', 0.3 * (index + 0.3) + 's');
                    });
                }
            });

            this.$('.js-scroll').perfectScrollbar();

            setTimeout(function() {
                // self.$('.js-framesContainer').prepend('<div class="color-overlay js-colorOverlay"></div>');
            }, 3000);

            // Group show photos and video
            this.$('.js-showPhotoPopup').find('a').attr('rel', 'show-photos');
            this.$('.js-showVideoPopup').find('a').attr('rel', 'show-video');
            this.$('.js-showHomeVideoPopup').find('a').attr('rel', 'home-video');
            this.$('[id^="gallery-"]').each(function(index, el) {
                $(el).find('a').attr('rel', $(el).attr('id'));
            });

            // Remove wp panel
            $('html, body').attr('style', 'margin-top: 0 !important');

        },
        setRoute: function(id) {
            router.navigate(App.Routes[id].route, {
                trigger: true
            });
        },
        arrowSlide: function(e) {
            switch (e.keyCode) {
                case 37:
                    this.$('.js-slideArrowLeft').trigger('click');
                    break;
                case 39:
                    this.$('.js-slideArrowRight').trigger('click');
                    break;
            }
        },
        prevPage: function() {
            appView.currentFrame--;
            // To prevent dbl click
            this.$el.undelegate('.js-slideArrowLeft', 'click');
            if (appView.currentFrame >= 0) {
                router.setActiveFrame(appView.currentFrame);

                appView.$('.js-menuLink[data-id="' + appView.currentFrame + '"]').trigger('click');

                // To prevent dbl click
                setTimeout(function() {
                    appView.$el.delegate('.js-slideArrowLeft', 'click', function() {
                        appView.prevPage();
                    });
                }, 1000);
            } else {
                var self = this;
                // To prevent dbl click
                setTimeout(function() {
                    appView.$el.delegate('.js-slideArrowLeft', 'click keyup', function() {
                        appView.prevPage();
                    });
                }, 1000);

                appView.$('.js-section').each(function(index, el) {
                    if (index === self.framesCount - 1) {
                        $(el).css({
                            'left': 0 * self.frameWidth
                        });
                    } else {
                        $(el).css({
                            'left': (index + 1) * self.frameWidth
                        });
                    }
                });

                appView.$('.js-framesContainer').css({
                    '-webkit-transition': 'none',
                    '-moz-transition': 'none',
                    '-ms-transition': 'none',
                    'transition': 'none',
                    '-webkit-transform': 'translate3d(' + -1 * appView.frameWidth + 'px, 0, 0)',
                    '-moz-transform': 'translate3d(' + -1 * appView.frameWidth + 'px, 0, 0)',
                    '-ms-transform': 'translate3d(' + -1 * appView.frameWidth + 'px, 0, 0)',
                    'transform': 'translate3d(' + -1 * appView.frameWidth + 'px, 0, 0)'
                });

                setTimeout(function() {
                    appView.$('.js-framesContainer').css({
                        '-webkit-transition': '-webkit-transform ' + appView.animationSpeed / 1000 + 's',
                        '-moz-transition': '-moz-transform ' + appView.animationSpeed / 1000 + 's',
                        '-ms-transition': '-ms-transform ' + appView.animationSpeed / 1000 + 's',
                        'transition': 'transform ' + appView.animationSpeed / 1000 + 's',
                        '-webkit-transform': 'translate3d(' + 0 + 'px, 0, 0)',
                        '-moz-transform': 'translate3d(' + 0 + 'px, 0, 0)',
                        '-ms-transform': 'translate3d(' + 0 + 'px, 0, 0)',
                        'transform': 'translate3d(' + 0 + 'px, 0, 0)'
                    });

                    setTimeout(function() {
                        appView.$('.js-section').each(function(index, el) {
                            $(el).css({
                                'left': index * self.frameWidth
                            });
                        });

                        appView.$('.js-framesContainer').css({
                            '-webkit-transition': 'none',
                            '-moz-transition': 'none',
                            '-ms-transition': 'none',
                            'transition': 'none',
                            '-webkit-transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)',
                            '-moz-transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)',
                            '-ms-transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)',
                            'transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)'
                        });
                        appView.currentFrame = appView.framesCount - 1;
                    }, appView.animationSpeed);

                    router.navigate(App.Routes[(appView.framesCount - 1)].route, {
                        trigger: false
                    });

                    router.setOverlayColor(appView.framesCount - 1);

                    appView.$('.js-menuLink').removeClass('active');
                    appView.$('.js-menuLink[data-id="' + (appView.framesCount - 1) + '"]').addClass('active');

                    appView.$('[href="#contacts"]').trigger('click');
                }, 200);
            }

        },
        nextPage: function() {
            var self = this;
            appView.currentFrame++;
            // To prevent dbl click
            this.$el.undelegate('.js-slideArrowRight', 'click');
            if (appView.currentFrame < appView.framesCount) {
                router.setActiveFrame(appView.currentFrame);

                appView.$('.js-menuLink[data-id="' + appView.currentFrame + '"]').trigger('click');

                setTimeout(function() {
                    appView.$el.delegate('.js-slideArrowRight', 'click keyup', function() {
                        appView.nextPage();
                    });
                }, 1000);
            } else {
                appView.$('.js-section').each(function(index, el) {
                    if (index === 0) {
                        $(el).css({
                            'left': (self.framesCount - 1) * self.frameWidth
                        });
                    } else {
                        $(el).css({
                            'left': (index - 1) * self.frameWidth
                        });
                    }
                });

                appView.$('.js-framesContainer').css({
                    '-webkit-transition': 'none',
                    '-moz-transition': 'none',
                    '-ms-transition': 'none',
                    'transition': 'none',
                    '-webkit-transform': 'translate3d(' + -(appView.framesCount - 2) * appView.frameWidth + 'px, 0, 0)',
                    '-moz-transform': 'translate3d(' + -(appView.framesCount - 2) * appView.frameWidth + 'px, 0, 0)',
                    '-ms-transform': 'translate3d(' + -(appView.framesCount - 2) * appView.frameWidth + 'px, 0, 0)',
                    'transform': 'translate3d(' + -(appView.framesCount - 2) * appView.frameWidth + 'px, 0, 0)'
                });

                setTimeout(function() {
                    appView.currentFrame = 0;

                    appView.$('.js-framesContainer').css({
                        '-webkit-transition': '-webkit-transform ' + appView.animationSpeed / 1000 + 's',
                        '-moz-transition': '-moz-transform ' + appView.animationSpeed / 1000 + 's',
                        '-ms-transition': '-ms-transform ' + appView.animationSpeed / 1000 + 's',
                        'transition': 'transform ' + appView.animationSpeed / 1000 + 's',
                        '-webkit-transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)',
                        '-moz-transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)',
                        '-ms-transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)',
                        'transform': 'translate3d(' + -(appView.framesCount - 1) * appView.frameWidth + 'px, 0, 0)'
                    });

                    setTimeout(function() {
                        appView.$('.js-section').each(function(index, el) {
                            $(el).css({
                                'left': index * self.frameWidth
                            });
                        });
                        appView.$('.js-framesContainer').css({
                            '-webkit-transition': 'none',
                            '-moz-transition': 'none',
                            '-ms-transition': 'none',
                            'transition': 'none',
                            '-webkit-transform': 'translate3d(' + appView.currentFrame * appView.frameWidth + 'px, 0, 0)',
                            '-moz-transform': 'translate3d(' + appView.currentFrame * appView.frameWidth + 'px, 0, 0)',
                            '-ms-transform': 'translate3d(' + appView.currentFrame * appView.frameWidth + 'px, 0, 0)',
                            'transform': 'translate3d(' + appView.currentFrame * appView.frameWidth + 'px, 0, 0)'
                        });

                        setTimeout(function() {
                            appView.$el.delegate('.js-slideArrowRight', 'click keyup', function() {
                                appView.nextPage();
                            });
                        }, 300);
                    }, appView.animationSpeed);

                    router.navigate(App.Routes[0].route, {
                        trigger: false
                    });

                    router.setOverlayColor(0);
                    appView.$('[href="#home"]').trigger('click');

                    appView.$('.js-menuLink').removeClass('active');
                    appView.$('.js-menuLink[data-id="0"]').addClass('active');

                    router.resetWow();
                }, 200);
            }
        },
        showVideoSlider: function() {
            this.$('.js-showVideoPopup a').eq(0).trigger('click');
        },
        showPhotoSlider: function() {
            this.$('.js-showPhotoPopup a').eq(0).trigger('click');
        },
        showHomeVideoSlider: function(e) {
            var id = $(e.currentTarget).data('id');
            this.$('.js-showHomeVideoPopup a').eq(id).trigger('click');
        }
    });

    // Slider view

    App.Views.Slider = Backbone.View.extend({
        el: '.js-videoSlider',
        events: {
            'click .js-slideLeft': 'prevSlide',
            'click .js-slideRight': 'nextSlide',
            'click .js-closeBtn': 'close'
        },
        slidesCount: 0,
        slideWidth: 0,
        currentSlide: 0,
        escape: function(e) {
            if (e.keyCode === 27) {
                this.close();
            }
        },
        close: function() {
            this.$el.fadeOut('fast');
        },
        initialize: function() {
            var self = this;
            this.slidesCount = this.$('.js-sliderItem').length;
            this.slideWidth = this.$('.js-sliderItem').width();
            this.$('.js-slideLeft').hide();

            this.$('.js-sliderContainer').css({
                'width': this.slidesCount * this.slideWidth
            });

            $('body').on('keyup', function(e) {
                self.escape(e);
            });
        },
        setActiveSlide: function(slide) {
            this.$('.js-sliderContainer').animate({
                'left': -slide * this.slideWidth
            }, appView.animationSpeed);
        },
        prevSlide: function(e) {
            var self = this;
            this.currentSlide--;
            if (this.currentSlide > 0) {
                this.$('.js-slideArrow').show();
                this.setActiveSlide(this.currentSlide);
            } else {
                this.currentSlide = 0;
                this.setActiveSlide(this.currentSlide);
                $(e.currentTarget).hide();
            }
        },
        nextSlide: function(e) {
            var self = this;
            this.currentSlide++;
            if (this.currentSlide < this.slidesCount - 1) {
                this.$('.js-slideArrow').show();
                this.setActiveSlide(this.currentSlide);
            } else {
                this.currentSlide = this.slidesCount - 1;
                this.setActiveSlide(this.currentSlide);
                $(e.currentTarget).hide();
            }
        }
    });

    // News view
    App.Views.News = Backbone.View.extend({
        el: '.js-newsPage',
        initialize: function() {
            this.collection.on('reset', function() {
                this.render();
            }, this);
        },
        render: function() {
            if (this.collection.models.length === 0) {
                appView.$('.js-showNewsArchiveBtn').hide();
            } else {
                appView.$('.js-showNewsArchiveBtn').show();
            }

            this.$el.html('');
            this.collection.each(function(newsItem, index) {
                var newsItemView = new App.Views.NewsItem({
                    model: newsItem
                });
                newsItemView.$el.attr('data-wow-delay', index * 0.3 + 's');
                this.$el.append(newsItemView.el);
            }, this);
            router.resetWow();
        }
    });

    // News item view
    App.Views.NewsItem = Backbone.View.extend({
        template: $('#newsItemTemplate').html(),
        tagName: 'li',
        className: 'news__item wow rollIn',
        initialize: function() {
            this.render();
        },
        render: function() {
            var date = this.model.get('date'),
                slug = this.model.get('categories')[0].slug;
            // Set day number and month
            this.model.set('dayNumber', moment(date).format('DD'));
            this.model.set('month', moment(date).format('MMMM'));
            // Set important from slug
            if (slug === 'important') {
                this.model.set('important', true);
            }

            var rendered = Mustache.render(this.template, this.model.toJSON());
            this.$el.html(rendered);
            return this;
        }
    });

    // News archive view
    App.Views.NewsArchive = Backbone.View.extend({
        el: '.js-newsView',
        events: {
            'click .js-showNewsArchiveBtn': 'showArchive',
            'click .js-newsArchiveBtn': 'openArchiveItem'
        },
        openArchiveItem: function(e) {
            e.preventDefault();
            newsCollection.fetch({
                url: $(e.currentTarget).attr('href'),
                reset: true
            });
        },
        showArchive: function(e) {
            var url = $(e.currentTarget).data('url') + '?json=get_date_index';
            this.collection.url = url;
            this.collection.fetch({
                reset: true
            });
        },
        initialize: function() {
            this.collection.on('reset', function() {
                this.render();
            }, this);
        },
        render: function() {
            this.$('.js-newsPage').html('');
            this.collection.each(function(newsArchiveItem, index) {
                var newsArchiveItemView = new App.Views.NewsArchiveItem({
                    model: newsArchiveItem
                });
                newsArchiveItemView.$el.attr('data-wow-delay', index * 0.3 + 's');
                this.$('.js-newsPage').append(newsArchiveItemView.el);
            });
            router.resetWow();
        }
    });

    // News archive item view
    App.Views.NewsArchiveItem = Backbone.View.extend({
        template: $('#newsArchiveItemTemplate').html(),
        tagName: 'li',
        className: 'news__item news__item_archive wow rollIn',
        initialize: function() {
            this.render();
        },
        render: function() {
            var rendered = Mustache.render(this.template, this.model.toJSON());
            this.$el.html(rendered);
            return this;
        }
    });

    // Tabs view
    App.Views.Tabs = Backbone.View.extend({
        el: '.js-tabs',
        events: {
            'click .js-tabBtn': 'setTab'
        },
        initialize: function() {
            setTimeout(function() {
                $('.js-tabBtn.active').trigger('click');
            }, 0);
        },
        setTab: function(e) {
            e.preventDefault();

            var $currentTab = $(e.currentTarget),
                currentTabId = $currentTab.attr('href');

            if (!$currentTab.hasClass('active') || !this.$('.js-tabsContent').is(':visible')) {
                this.resetTabsContent();
                $(currentTabId).fadeIn('slow');
                $currentTab.addClass('active');
            }
        },
        resetTabsContent: function() {
            this.$('.js-tabsContent').hide();
            this.$('.js-tabBtn').removeClass('active');
        }
    });

    // Accordion
    App.Views.Accordion = Backbone.View.extend({
        el: '.js-accordion',
        events: {
            'click .js-accordionBtn': 'click'
        },
        click: function(e) {
            e.preventDefault();

            if ($(e.currentTarget).hasClass('expanded')) {
                this.close(e);
            } else {
                this.open(e);
            }
        },
        open: function(e) {
            var $currentBtn = $(e.currentTarget),
                $accordion = $(e.currentTarget).closest('.js-accordion'),
                $content = $accordion.find('.js-accordionContent'),
                $plus = $accordion.find('.js-accordionPlus'),
                $minus = $accordion.find('.js-accordionMinus');

            $currentBtn.addClass('expanded');
            $content.slideDown('fast');
            $plus.hide();
            $minus.show();
        },
        close: function(e) {
            var $currentBtn = $(e.currentTarget),
                $accordion = $(e.currentTarget).closest('.js-accordion'),
                $content = $accordion.find('.js-accordionContent'),
                $plus = $accordion.find('.js-accordionPlus'),
                $minus = $accordion.find('.js-accordionMinus');

            $currentBtn.removeClass('expanded');
            $content.slideUp('fast');
            $plus.show();
            $minus.hide();
        }
    });

    // Gallery
    App.Views.Gallery = Backbone.View.extend({
        el: '.js-gallery',
        initialize: function() {
            this.collection.on('reset', function() {
                this.render();
            }, this);
        },
        colorbox: function(element, isIframe, width, height, iWidth, iHeight) {
            var popupsCount = $(element).length;
            appView.$(element).colorbox({
                maxWidth: width,
                maxHeight: height,
                innerWidth: iWidth,
                innerHeight: iHeight,
                className: 'colorbox-overlay',
                closeButton: false,
                transition: 'elastic',
                iframe: isIframe,
                onOpen: function() {
                    var closeTpl = '<div class="close-popup js-colorboxCloseBtn"><div class="sprite icon icon-close"></div></div>',
                        leftArrow = '<div class="arrow arrow_left arrow_always js-colorboxArrowLeft"><svg viewBox="0 0 64.347 127.279" class="icon icon-slida-arrow-left"><use xlink:href="#slide-arrow-left"></use></svg></div>',
                        rightArrow = '<div class="arrow arrow_right arrow_always js-colorboxArrowRight"><svg viewBox="0 0 64.347 127.279" class="icon icon-slida-arrow-right"><use xlink:href="#slide-arrow-right"></use></svg></div>';

                    $('.js-colorboxArrowLeft, .js-colorboxArrowRight').remove();
                    if ($('.js-colorboxCloseBtn').length === 0) {
                        $('body').append(closeTpl);
                    }
                    if (popupsCount > 1) {
                        $('body').append(leftArrow + rightArrow);
                    }

                    // close
                    $('body').on('click', '.js-colorboxCloseBtn', function() {
                        $.colorbox.close();
                        $(this).remove();
                    });

                    // prev
                    $('body').on('click', '.js-colorboxArrowLeft', function() {
                        $.colorbox.prev();
                    });
                    // next
                    $('body').on('click', '.js-colorboxArrowRight', function() {
                        $.colorbox.next();
                    });



                    $('body').off('keyup');
                },
                onCleanup: function() {
                    $('.js-colorboxCloseBtn, .js-colorboxArrowLeft, .js-colorboxArrowRight').remove();
                    $('body').on('keyup', function(e) {
                        appView.arrowSlide(e);
                    });
                }
            });
        },
        render: function() {
            var self = this;
            this.collection.each(function(galleryItem) {
                var galleryItemView = new App.Views.GalleryItem({
                    model: galleryItem
                });
                this.$('.js-galleryContainer').find('ul').append(galleryItemView.el);
            }, this);

            // Gallery scroll init
            this.$('.js-scroll').perfectScrollbar({
                wheelSpeed: 40
            });

            // Color box
            this.colorbox('.js-galleryPopup', false, '70%', '70%', '', '');
            this.colorbox('.js-showPhotoPopup a', false, '70%', '70%', '', '');
            this.colorbox('.gallery-icon a', false, '70%', '70%', '', '');
            this.colorbox('.js-showHomeVideoPopup a', true, 768, 480, 768, 768);
            this.colorbox('.js-showVideoPopup a', true, 768, 480, 768, 768);
            this.colorbox('.js-showResumeVideoSliderBtn', true, 768, 480, 768, 768);
        }
    });

    App.Views.GalleryItem = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        tagName: 'li',
        className: 'gallery__item',
        template: $('#galleryItemTemplate').html(),
        render: function() {
            var rendered = Mustache.render(this.template, this.model.toJSON());
            this.$el.html(rendered);
            return this;
        }
    });

    /*****************
     *
     *  Routes
     *
     ******************/

    App.Router.App = Backbone.Router.extend({
        routes: {
            '': 'home',
            'home': 'home',
            'resume': 'resume',
            'show': 'show',
            'school': 'school',
            'gallery': 'gallery',
            'news': 'news',
            'contacts': 'contacts',
            '*path': 'home'
        },
        activeFrame: 0,
        isActiveMenuItemSet: false,
        resetWow: function() {
            $('.animated').removeClass('animated');
            new WOW().init();
        },
        setActiveFrame: function(frame) {
            appView.$('.js-menuLink').removeClass('active');
            var $activeMenuLink = appView.$('.js-menuLink[data-id="' + frame + '"]'),
                self = this;
            $activeMenuLink.addClass('active');

            if (!this.isActiveMenuItemSet) {
                setTimeout(function() {
                    $activeMenuLink.trigger('click');
                }, 300);
                this.isActiveMenuItemSet = true;
            }

            // WOW css animation init
            this.resetWow();

            appView.$('.js-framesContainer').css({
                '-webkit-transform': 'translate3d(' + -frame * appView.frameWidth + 'px, 0, 0)',
                '-moz-transform': 'translate3d(' + -frame * appView.frameWidth + 'px, 0, 0)',
                '-ms-transform': 'translate3d(' + -frame * appView.frameWidth + 'px, 0, 0)',
                'transform': 'translate3d(' + -frame * appView.frameWidth + 'px, 0, 0)',
                '-webkit-transition': '-webkit-transform ' + appView.animationSpeed / 1000 + 's',
                '-moz-transition': '-moz-transform ' + appView.animationSpeed / 1000 + 's',
                '-ms-transition': '-ms-transform ' + appView.animationSpeed / 1000 + 's',
                'transition': 'transform ' + appView.animationSpeed / 1000 + 's'
            });

            this.navigate(App.Routes[frame].route, {
                trigger: false
            });

            self.setOverlayColor(frame);

            // Close all accrodions
            var $accordionBtn = appView.$('.js-accordionBtn'),
                $accordion = appView.$('.js-accordion'),
                $content = $accordion.find('.js-accordionContent'),
                $plus = $accordion.find('.js-accordionPlus'),
                $minus = $accordion.find('.js-accordionMinus');

            $accordionBtn.removeClass('expanded');
            $content.slideUp('fast');
            $plus.show();
            $minus.hide();
        },
        getRouteId: function(routeName) {
            var pageId = null;
            _.find(App.Routes, function(route, i) {
                if (route.route === routeName) {
                    pageId = i;
                    return route;
                }
            });

            return pageId;
        },
        setOverlayColor: function(frame) {
            appView.$('.js-colorOverlay').css({
                'background-color': App.Routes[frame].color
            });
        },
        home: function() {
            var id = this.getRouteId('home');
            this.setActiveFrame(id);
            appView.currentFrame = id;
        },
        resume: function() {
            var id = this.getRouteId('resume');
            this.setActiveFrame(id);
            appView.currentFrame = id;
        },
        show: function() {
            var id = this.getRouteId('show');
            this.setActiveFrame(id);
            appView.currentFrame = id;
        },
        school: function() {
            var id = this.getRouteId('school');
            this.setActiveFrame(id);
            appView.currentFrame = id;
        },
        gallery: function() {
            var id = this.getRouteId('gallery');
            this.setActiveFrame(id);
            appView.currentFrame = id;
        },
        news: function() {
            var id = this.getRouteId('news');
            this.setActiveFrame(id);
            appView.currentFrame = id;
        },
        contacts: function() {
            var id = this.getRouteId('contacts');
            this.setActiveFrame(id);
            appView.currentFrame = id;
        }
    });


    /*****************
     *
     *  Collections
     *
     ******************/

    App.Collections.Gallery = Backbone.Collection.extend({
        url: $('#galleryItemTemplate').data('url'),
        parse: function(response) {
            var galleryContent = response.page.content,
                $galleryContent = $(galleryContent);
            var attachments = response.page.attachments,
                galleryItems = _.map($galleryContent.find('a'), function(item) {
                    return {
                        thumb: $(item).find('img').attr('src'),
                        img: $(item).attr('href')
                    };
                });
            return galleryItems;

        },
        initialize: function() {
            this.fetch({
                reset: true
            });
        }
    });
    App.Collections.NewsArchive = Backbone.Collection.extend({
        parse: function(response) {
            return _.map(response.permalinks, function(item) {
                return {
                    date: moment(item.split('=')[1], 'YYYYMM').format('YYYY-MM'),
                    year: moment(item.split('=')[1], 'YYYYMM').format('YYYY'),
                    month: moment(item.split('=')[1], 'YYYYMM').format('MMMM'),
                    link: '?json=get_date_posts&date=' + moment(item.split('=')[1], 'YYYYMM').format('YYYY-MM') + '&category_name=news'
                };
            });
        },
    });
    App.Collections.News = Backbone.Collection.extend({
        url: $('#newsItemTemplate').data('url') + '/?json=get_posts&category_name=news',
        parse: function(response) {
            return response.posts;
        },
        initialize: function() {
            this.fetch({
                reset: true
            });
        }
    });


    /*****************
     *
     *  Initialize
     *
     ******************/

    var galleryCollection = new App.Collections.Gallery(),
        newsArchiveCollection = new App.Collections.NewsArchive(),
        newsCollection = new App.Collections.News();

    var appView = new App.Views.App(),
        videoSliderView = new App.Views.Slider(),
        photoSliderView = new App.Views.Slider({
            el: '.js-photoSlider'
        }),
        tabsView = new App.Views.Tabs(),
        accordionView = new App.Views.Accordion(),
        galleryView = new App.Views.Gallery({
            collection: galleryCollection
        }),
        newsView = new App.Views.News({
            collection: newsCollection
        }),
        newsArchiveView = new App.Views.NewsArchive({
            collection: newsArchiveCollection
        });

    var router = new App.Router.App();

    Backbone.history.start();

});