(function () {
  var PluginManager = window.tinymce.util.Tools.resolve('tinymce.PluginManager')

  function createFileInput (callback) {
    var input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.onchange = function(e) {
      var file = e.target.files[0]
      callback(file)
    }
    input.click()
  }

  function commandRegister (editor) {
    editor.addCommand('mceImageUpload', function() {
      createFileInput(function(file) {
        // 对外暴露上传回调
        editor.settings.imageSelectorCallback(file, success)
        function success (url) {
          editor.insertContent(`<img src="${url}" alt="加载失败" style="max-width: 100%;height: auto;" />`)
        }
      })
    })
  }

  function componentRegister (editor) {
    editor.ui.registry.addButton('customerimageupload', {
      icon: 'image',
      tooltip: '上传图片',
      onAction: function() {
        editor.execCommand('mceImageUpload')
      }
    })
  }

  PluginManager.add('customerimageupload', function(editor) {
    componentRegister(editor)
    commandRegister(editor)
  })

  function Plugin () {
    // ...
  }

  return Plugin
})()
