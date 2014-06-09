function share(options) {
    function onBridgeReady() {
        if (!options.imgUrl) {
            var img = document.querySelector('img');
            if (img) {
                options.imgUrl = img.src;
            } else {
                options.imgUrl = "";
            }
        }

        if (!options.title) {
            var titleTemp = document.querySelector('title');
            if (titleTemp) {
                options.title = titleTemp.innerHTML;
            } else {
                options.title = " ";
            }
        }

        options.desc = options.desc || "";
        options.link = options.link || window.location.href;

        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": options.imgUrl,
                "link": options.link,
                "desc": options.desc,
                "title": options.title
            }, function(res) {});
        });

        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": options.imgUrl,
                "link": options.link,
                "desc": options.desc,
                "title": options.title
            }, function(res) {});
        });
    }

    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
}
