'use strict';

module.exports = function (colors) {

  // Destructure the colors for easy access
  const {
    primary: { background, foreground },
    normal: { red, green, blue, yellow, magenta, cyan },
  } = colors;

  const _colors = [red, green,blue, yellow, magenta, cyan];
  const colorNames = ['red','green','blue','yellow','magenta','cyan'];

  const colorBoxes = _colors.map(c => {
    return {
        border: {
          type: 'line',
          fg: c,
          bg: background,
        },
        style: {
          fg: c,
          bg: background,
          label: {
            fg: c,
            bg: background,
          }
        },
    };
  });

  const theme =  {

    box: {
      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
      style: {
        fg: foreground,
        bg: background,
        label: {
          fg: foreground,
          bg: background,
        }
      },
    },
  };

  colorNames.forEach((c,index) => {
    const name = `${c}Box`;
    theme[name] = colorBoxes[index];
  });

  return theme;

};
