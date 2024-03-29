(function() {
  var tinymce = window.tinymce
  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager')
  var regBody = /<body[^>]*>([\s\S]*)<\/body>/
  function getBody(content){
      var result = regBody.exec(content)
      if(result && result.length === 2) {
        return result[1]
      }
      return content
  }
  PluginManager.add('customerplaceholder', function (editor) {
    editor.on('init', function () {
      var label = new Label

      onBlur()

      tinymce.DOM.bind(label.el, 'click', onFocus)
      editor.on('focus', onFocus)
      editor.on('blur', onBlur)
      editor.on('change', onBlur)
      editor.on('setContent', onBlur)
      editor.on('keydown', onKeydown)

      function onFocus() {
        if (!editor.settings.readonly === true) {
          label.hide()
        }
        editor.execCommand('mceFocus', false)
      }

      function onBlur() {
        var content = getBody(editor.getContent())
        content = content.replace(/\n\s/g, '')
        if (content == '') {
          label.show()
        } else {
          label.hide()
        }
      }

      function onKeydown() {
        label.hide()
      }
    })

    var Label = function () {
      var placeholder_text = editor.getElement().getAttribute("customerPlaceholder") || editor.settings.customerPlaceholder
      var placeholder_attrs = editor.settings.placeholder_attrs || {
        style: {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '98%',
          padding: '8px',
          'line-height': '16px',
          overflow: 'hidden',
          color: '#999',
          'white-space': 'pre-wrap'
        }
      }
      var contentAreaContainer = editor.getContentAreaContainer()

      tinymce.DOM.setStyle(contentAreaContainer, 'position', 'relative')

      // Create label el
      this.el = tinymce.DOM.add(contentAreaContainer, editor.settings.placeholder_tag || "label", placeholder_attrs, placeholder_text)
    }

    Label.prototype.hide = function () {
      tinymce.DOM.setStyle(this.el, 'display', 'none')
    }

    Label.prototype.show = function () {
      tinymce.DOM.setStyle(this.el, 'display', '')
    }
  })
})()
