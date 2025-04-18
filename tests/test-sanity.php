<?php
class SampleTest extends WP_UnitTestCase {
    public function test_plugin_loaded() {
        $this->assertTrue( is_plugin_active( 'choose-your-best-selling-products/choose-your-best-selling-products.php' ) );
    }
}
