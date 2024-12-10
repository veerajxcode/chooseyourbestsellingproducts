<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitb7cff5c8e2b0ee7015baa25d1a4f3de8
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitb7cff5c8e2b0ee7015baa25d1a4f3de8', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitb7cff5c8e2b0ee7015baa25d1a4f3de8', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitb7cff5c8e2b0ee7015baa25d1a4f3de8::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
