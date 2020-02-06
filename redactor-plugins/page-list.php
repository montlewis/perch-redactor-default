<?php require __DIR__ . '/../../../../core/inc/api.php';

if (!class_exists('PerchContent_Pages')) {
    include_once(PERCH_CORE . '/apps/content/PerchContent_Pages.class.php');
    include_once(PERCH_CORE . '/apps/content/PerchContent_Page.class.php');
}

$Pages = new PerchContent_Pages();
$pages = $Pages->get_page_tree();

$opts = [];

if (PerchUtil::count($pages)) {
    foreach ($pages as $Item) {
        $depth = $Item->pageDepth() - 1;

        if ($depth < 0) {
            $depth = 0;
        }

        $opts[] = ['name' => str_repeat('-', $depth) . ' ' . $Item->pageNavText(), 'url' => $Item->pagePath()];
    }
}

header('Content-Type: application/json');
echo json_encode($opts);