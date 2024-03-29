/* eslint-disable */
(function () {
  var tinymce = window.tinymce
  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager')

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools')

  var getPreviewDialogWidth = function (editor) {
    return parseInt(editor.getParam('plugin_preview_width', '650'), 10)
  }
  var getPreviewDialogHeight = function (editor) {
    return parseInt(editor.getParam('plugin_preview_height', '500'), 10)
  }
  var getContentStyle = function (editor) {
    return editor.getParam('content_style', '');
  };
  var shouldUseContentCssCors = function (editor) {
    return editor.getParam('content_css_cors', false, 'boolean');
  };
  var getBodyClassByHash = function (editor) {
    var bodyClass = editor.getParam('body_class', '', 'hash');
    return bodyClass[editor.id] || '';
  };
  var getBodyClass = function (editor) {
    var bodyClass = editor.getParam('body_class', '', 'string');
    if (bodyClass.indexOf('=') === -1) {
      return bodyClass;
    } else {
      return getBodyClassByHash(editor);
    }
  };
  var getBodyIdByHash = function (editor) {
    var bodyId = editor.getParam('body_id', '', 'hash');
    return bodyId[editor.id] || bodyId;
  };
  var getBodyId = function (editor) {
    var bodyId = editor.getParam('body_id', 'tinymce', 'string');
    if (bodyId.indexOf('=') === -1) {
      return bodyId;
    } else {
      return getBodyIdByHash(editor);
    }
  };
  var $_93t7kmhwjcq8h7ic = {
    getPreviewDialogWidth,
    getPreviewDialogHeight,
    getContentStyle
  }
  var getPreviewHtml = function (editor) {
    var headHtml = '';
    var encode = editor.dom.encode;
    var contentStyle = getContentStyle(editor);
    headHtml += '<base href="' + encode(editor.documentBaseURI.getURI()) + '">';
    if (contentStyle) {
      headHtml += '<style type="text/css">' + contentStyle + '</style>';
    }
    var cors = shouldUseContentCssCors(editor) ? ' crossorigin="anonymous"' : '';
    Tools.each(editor.contentCSS, function (url) {
      headHtml += '<link type="text/css" rel="stylesheet" href="' + encode(editor.documentBaseURI.toAbsolute(url)) + '"' + cors + '>';
    });
    var bodyId = getBodyId(editor);
    var bodyClass = getBodyClass(editor);
    var isMetaKeyPressed = PluginManager.mac ? 'e.metaKey' : 'e.ctrlKey && !e.altKey';
    var preventClicksOnLinksScript = '<script>' + 'document.addEventListener && document.addEventListener("click", function(e) {' + 'for (var elm = e.target; elm; elm = elm.parentNode) {' + 'if (elm.nodeName === "A" && !(' + isMetaKeyPressed + ')) {' + 'e.preventDefault();' + '}' + '}' + '}, false);' + '</script> ';
    var directionality = editor.getBody().dir;
    var dirAttr = directionality ? ' dir="' + encode(directionality) + '"' : '';
    var previewHtml = '<!DOCTYPE html>' + '<html>' + '<head>' + headHtml + '</head>' + '<body id="' + encode(bodyId) + '" class="mce-content-body ' + encode(bodyClass) + '"' + dirAttr + '>' + editor.getBody().innerHTML + preventClicksOnLinksScript + '</body>' + '</html>';
    return previewHtml;
  };

  var injectIframeContent = function (editor, iframe, sandbox) {
    var previewHtml = getPreviewHtml(editor)
    if (!sandbox) {
      var doc = iframe.contentWindow.document
      doc.open()
      doc.write(previewHtml)
      doc.close()
    } else {
      iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(previewHtml)
    }
  }
  var $_g8c8wshxjcq8h7id = {
    getPreviewHtml,
    injectIframeContent
  }

  var open = function (editor) {
    var content = getPreviewHtml(editor);
    var dataApi = editor.windowManager.open({
      title: '预览',
      size: 'large',
      body: {
        type: 'panel',
        items: [{
            name: 'preview',
            type: 'iframe',
            sandboxed: true
          }]
      },
      buttons: [{
          type: 'cancel',
          name: 'close',
          text: '关闭',
          primary: true
        }],
      initialData: { preview: content }
    });
    dataApi.focus('close')
  }

  var registerCommand = function (editor) {
    editor.addCommand('mcePreview', function() {
      open(editor)
    })
  }

  var registerComponent = function (editor) {
    editor.ui.registry.addButton('customerpreview', {
      icon: 'preview',
      onAction: function() {
        editor.execCommand('mcePreview')
      }
    })
  }
  PluginManager.add('customerpreview', function(editor) {
    registerCommand(editor)
    registerComponent(editor)
  })

  var Plugin = function () {
    // ...
  }
  return Plugin

})()
