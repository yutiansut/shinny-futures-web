export default (accessor_aroon, plot, plotMixin) => () => {
  // Closure function
  const // Container for private, direct access mixed in variables
    p = {};

  const oscLine = plot.pathLine();
  const oscArea = plot.pathArea();
  const middleLine = plot.pathLine();
  const upLine = plot.pathLine();
  const downLine = plot.pathLine();

  class aroon {
    constructor(g) {
      const group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'aroon oscillator');
      group.entry.append('path').attr('class', 'aroon oscillatorArea');
      group.entry.append('path').attr('class', 'aroon middle');
      group.entry.append('path').attr('class', 'aroon up');
      group.entry.append('path').attr('class', 'aroon down');
      aroon.refresh(g);
    }

    static refresh(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, oscLine, oscArea,
        middleLine, upLine, downLine);
    }
  }

  function binder() {
    oscLine.init(p.accessor.d, p.xScale, p.accessor.oscillator, p.yScale);
    oscArea.init(p.accessor.d, p.xScale, p.accessor.oscillator, p.yScale, 0);
    middleLine.init(p.accessor.d, p.xScale, p.accessor.m, p.yScale);
    upLine.init(p.accessor.d, p.xScale, p.accessor.up, p.yScale);
    downLine.init(p.accessor.d, p.xScale, p.accessor.down, p.yScale);
  }

  // Mixin 'superclass' methods and variables
  plotMixin(aroon, p).plot(accessor_aroon(), binder).dataSelector(plotMixin.dataMapper.array);
  binder();

  return aroon;
};

function refresh(selection, accessor, x, y, plot, oscLine, oscArea, middleLine, upLine, downLine) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  selection.select('path.aroon.oscillator').attr('d', oscLine);
  selection.select('path.aroon.oscillatorArea').attr('d', oscArea);
  selection.select('path.aroon.middle').attr('d', middleLine);
  selection.select('path.aroon.up').attr('d', upLine);
  selection.select('path.aroon.down').attr('d', downLine);
}
