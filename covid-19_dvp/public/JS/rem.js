(function(document, window) {
    var resize = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var recalc = function() {
        var clientWidth = document.documentElement.clientWidth
        if (!clientWidth) return
        if (clientWidth <= 425) {
            document.documentElement.style.fontSize = (clientWidth / 24) + 'px'
        } else if (clientWidth <= 768) {
            document.documentElement.style.fontSize = (clientWidth / 43) + 'px'
        } else {
            document.documentElement.style.fontSize = (clientWidth / 68) + 'px'
        }
    }
    if (!document.addEventListener) return
    window.addEventListener(resize, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)