function p() {
    if (this._pattern)
        return this._pattern;
    var iterator, i, n, s, o, a = document.createElement("canvas"),
        this.options = this.options,
        l = this.canvas,
        context = a.getContext("2d"),
        u = this.options.scale,
        d = l.width / u,
        p = l.height / u,
        h = this.options.waveformHeight,
        newGapWidth = (gapWidth || (gapWidth = e("views/waveform/waveform-style"))).getConfig("gapWidth"),
        newBarWidth = (gapWidth || (gapWidth = e("views/waveform/waveform-style"))).getConfig("barWidth"),
        v = newBarWidth + newGapWidth,
        _ = this.options.upperPartHeight * p,
        b = p - (this.options.upperPartHeight * p),
        y = this.getFillStyle(),
        x = newGapWidth > 0,
        gap_width_and_fillstyle_for_gap_boolean = newGapWidth > 0 && this.getFillStyle(1, "gapGradient"),
        S = null,
        T = null;
    for (a.width = l.width, a.height = l.height, (f || (f = e("lib/browser"))).isHiDPI && 1 !== u && context.scale(u, u), context.beginPath(), context.fillStyle = gap_width_and_fillstyle_for_gap_boolean, iterator = 0; scaled_width > iterator; iterator += (newBarWidth + newGapWidth)) {

        s = this.getWaveformHeightAt(t),

        i = Math.floor(this.getWaveformHeightAt(t) / this.options.waveformHeight * (this.options.upperPartHeight * device_height)),

        n = Math.floor((1 - this.getWaveformHeightAt(t) / this.options.waveformHeight) * (device_height - (this.options.upperPartHeight * device_height)) + (this.options.upperPartHeight * device_height)),

        //context.rect(current_x_position, current_y_position, barwidth, n-i = bar height)
        context.rect(iterator, i, newBarWidth, n - i),

        x && iterator && (o = Math.max(i, S),

        context.fillRect(t - newGapWidth, o, newGapWidth, Math.min(n, T) - o)),

        S = Math.floor(this.getWaveformHeightAt(t) / h * (this.options.upperPartHeight * device_height)),

        T = Math.floor((1 - this.getWaveformHeightAt(t) / this.options.waveformHeight) * (device_height - (this.options.upperPartHeight * device_height)) + (this.options.upperPartHeight * device_height));
    }
    return context.fillStyle = y, context.fill(), this._pattern = this.context.createPattern(a, "no-repeat"), this._pattern
}