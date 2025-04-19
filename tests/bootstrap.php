<?php
// Define polyfills path for WP test suite.
if ( ! defined( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH' ) ) {
    define(
        'WP_TESTS_PHPUNIT_POLYFILLS_PATH',
        __DIR__ . '/../vendor/yoast/phpunit-polyfills'
    );
}

// Load WordPress test environment.
$_tests_dir = getenv('WP_TESTS_DIR') ?: '/tmp/wordpress-tests-lib';

if (!file_exists($_tests_dir . '/includes/functions.php')) {
    echo "Could not find WordPress test library at $_tests_dir. Please check WP_TESTS_DIR.\n";
    exit(1);
}

require_once $_tests_dir . '/includes/functions.php';

function _manually_load_plugin() {
    $plugin_file = __DIR__ . '/../choose-your-best-selling-products/choose-your-best-selling-products.php';

    if (!file_exists($plugin_file)) {
        echo "Plugin file not found: $plugin_file\n";
        exit(1);
    }

    require $plugin_file;
}

tests_add_filter('muplugins_loaded', '_manually_load_plugin');

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
