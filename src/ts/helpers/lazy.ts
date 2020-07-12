import LazyLoad from 'vanilla-lazyload';

const lazyLoad = function(options) {
    return new LazyLoad(options);
};

const setLazyLoading = function(container) {
    lazyLoad({
        container: container,
        elements_selector: '.lazy',
        threshold: 50,
        load_delay: 100
    });
};

export default setLazyLoading;
