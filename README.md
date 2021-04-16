# perch-redactor-default
Default installation of redactor config and plugins

## Installation

- Download the latest version
- Unzip the download
- Place the `redactor-plugins` folder and the `config.js` file in `/perch/addons/plugins/editors/`
- Add `define('PERCH_CUSTOM_EDITOR_CONFIGS', true);` to your `/perch/config/config.php` file
- Add calls to any css files used by the plugins to `/perch/addons/plugins/ui/_config.inc`



## Configuration

### default plugins

- definedlinks, with James Wigger's predefined links (https://jameswigger.co.uk/blog/adding-predefined-links-to-perch-redactor.html)
- Pipits inline perch assets by Hussein Al Hammad (https://grabapipit.com/pipits/other/redactor-inline-perch-assets)
- inlinestyle
- clips (added 4/16/2021)
- fontcolor
- source
- table
- video
- fullscreen
- widget
- counter
- alignment
- properties
- horizontal rule



You can add or remove additional plugins to the config file and redactor-plugins folder. The config file is set to read values from the `editor-config` textarea attribute. (`<perch:content id="desciption" type="textarea" label="Text" html editor="redactor" editor-config="full" >`) It expect a value of `full`, `simple`, or `minimal`.

**Note:** The css file for the inlinestyle and clips plugins are loaded through the `/perch/addons/plugins/ui/_config.inc` file. _There may be a way to do this through the editor config file, but I don't know how._

So something like:

```
...
<link rel="stylesheet" href="/perch/addons/plugins/editors/redactor-plugins/inlinestyle.min.css" />
<link rel="stylesheet" href="/perch/addons/plugins/editors/redactor-plugins/clips.css" />
<link rel="stylesheet" href="/perch/addons/plugins/editors/redactor-plugins/myClips.css" />
...
```

I use this as a starting point for my redactor usage in Perch CMS.

