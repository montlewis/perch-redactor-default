(function($R) {
    $R.add('plugin', 'inlineperchassets', {
        init: function(app)
        {
            this.app     = app;
            this.toolbar = app.toolbar; 
        },
        start: function()
        {
            var source    = this.app.source.getElement();
            this.textarea = source.nodes[0];

            var img_button = this.toolbar.addButton('inlineperchassets_img', {
                    title: 'Image',
                    api: 'plugin.inlineperchassets.chooser',
                    icon: '<i class="re-icon-image"></i>',
                    args: {
                        type: 'img',
                    }
                });
            var file_button = this.toolbar.addButton('inlineperchassets_file', {
                    title: 'File',
                    api: 'plugin.inlineperchassets.chooser',
                    icon: '<i class="re-icon-file"></i>',
                    args: {
                        type: 'file',
                    }
                });
        },
        chooser: function(args)
        {
            var this_redactor = this.app;
            
            var opts = {
                field:    this.textarea.getAttribute('id'),
                bucket:   this.textarea.getAttribute('data-bucket'),
                type:     args.type,
                width: false,
                height: false,
                crop: false,
                quality: false,
                density: false,
                sharpen: false,
            };

            if(this.textarea.getAttribute('data-width')) {
                opts.width = this.textarea.getAttribute('data-width');
            }
            if(this.textarea.getAttribute('data-height')) {
                opts.height = this.textarea.getAttribute('data-height');
            }
            if(this.textarea.getAttribute('data-crop')) {
                opts.crop = this.textarea.getAttribute('data-crop');
            }
            if(this.textarea.getAttribute('data-quality')) {
                opts.quality = this.textarea.getAttribute('data-quality');
            }
            if(this.textarea.getAttribute('data-density')) {
                opts.density = this.textarea.getAttribute('data-density');
            }
            if(this.textarea.getAttribute('data-sharpen')) {
                opts.sharpen = this.textarea.getAttribute('data-sharpen');
            }

            

            this_redactor.selection.save();

            Perch.UI.Assets.choose(opts, function(result){    
                this_redactor.selection.restore();                                      
                var imageData = {
                    "thumb": result.thumburl,
                    "id": result.id,
                };

                const url = Perch.path+'/addons/plugins/editors/redactor-plugins/pipit_inlineperchassets/get_asset.php';

                let data = {
                    id: result.id, 
                    width: opts.width,
                    height: opts.height,
                    crop: opts.crop,
                    quality: opts.quality,
                    density: opts.density,
                    sharpen: opts.sharpen,
                };
                
                var request = new Request(url, {
                    method: 'POST', 
                    mode: "same-origin",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data), 
                });


                fetch(request)
                .then((resp) => resp.json())
                .then(function(data) {
                    imageData.url = data.url;
                    if(data.image) {
                        this_redactor.api('module.image.insert', { image: imageData });
                    } else {
                        this_redactor.insertion.insertHtml(result.embed);
                    }
                });
            });
        }
    });
})(Redactor);