'use strict';

module.exports = function (colors) {

  // Destructure the colors for easy access
  const {
    primary: { background, foreground },
    normal: { red, green, blue, yellow, magenta, cyan },
  } = colors;

  return {
    colors, // this is for inline usage of theme colors for text and labels
    program: {
      bg: background,
      fg: foreground,
    },
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
    redBox: {
      border: {
        type: 'line',
        fg: red,
        bg: background,
      },
      style: {
        fg: red,
        bg: background,
        label: {
          fg: red,
          bg: background,
        }
      },
    },
    list: {
      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
      style: {
        fg: foreground,
        bg: background,
        selected: {
          fg: background,
          bg: foreground,
        },
        label: {
          fg: foreground,
          bg: background,
        }
      },
    },
    progressbar: {
      style: {
        fg: foreground,
        bg: background,
        bar: {
          fg: foreground,
          bg: background,
        },
        border: {
          type: 'line',
          fg: foreground,
          bg: background,
        },
      },
    },
    scrollabletext: {
      style: {
        fg: foreground,
        bg: background,
        border: {
          fg: foreground,
          bg: background,
        }
      },
    }
  };
};
