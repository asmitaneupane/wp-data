<?php
/**
 * Plugin Name:       Wp Data
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-data
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 function wp_data_block_render_callback($attributes, $content) {
    
    // Get the path to the data.json file
    // $data_file_path = plugin_dir_url( __FILE__ ) . '../wp-content/plugins/wp-data/src/store.json';
    $data_file_url = plugins_url( 'wp-data/src/store.json', __FILE__ );

    // Read and parse the JSON data from the file
    $json_data = file_get_contents($data_file_url);
    $data = json_decode($json_data);

    if (!$data) {
        return 'Invalid JSON data';
    }

    // Extract and format the desired information
    $title = $data->title;
    $price = $data->price;
    $description = $data->description;

    // Generate and return the dynamic block markup
    return sprintf(
        '<div>
            <p>Title: %s<p>
            <p>Price: %s<p>
            <p>Description: %s<p>
        </div>',
        esc_html($title),
        esc_html($price),
        esc_html($description)
    );
}


function create_block_wp_data_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_wp_data_block_init' );

