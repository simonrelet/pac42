import React from 'react';

export default (direction, { centerX, centerY }) => {
  switch (direction) {
    case 'left':
      return (
        <g>
          <ellipse
            cx={centerX - 9}
            cy={centerY - 3}
            rx="5"
            ry="7"
            fill="#fff"
          />
          <circle cx={centerX - 11} cy={centerY - 3} r="3" fill="#000" />
          <ellipse
            cx={centerX + 5}
            cy={centerY - 3}
            rx="5"
            ry="7"
            fill="#fff"
          />
          <circle cx={centerX + 3} cy={centerY - 3} r="3" fill="#000" />
        </g>
      );

    case 'top':
      return (
        <g>
          <ellipse
            cx={centerX - 7}
            cy={centerY - 6}
            rx="5"
            ry="7"
            fill="#fff"
          />
          <circle cx={centerX - 7} cy={centerY - 9} r="3" fill="#000" />
          <ellipse
            cx={centerX + 7}
            cy={centerY - 6}
            rx="5"
            ry="7"
            fill="#fff"
          />
          <circle cx={centerX + 7} cy={centerY - 9} r="3" fill="#000" />
        </g>
      );

    case 'bottom':
      return (
        <g>
          <ellipse cx={centerX - 7} cy={centerY} rx="5" ry="7" fill="#fff" />
          <circle cx={centerX - 7} cy={centerY + 3} r="3" fill="#000" />
          <ellipse cx={centerX + 7} cy={centerY} rx="5" ry="7" fill="#fff" />
          <circle cx={centerX + 7} cy={centerY + 3} r="3" fill="#000" />
        </g>
      );

    default:
    case 'right':
      return (
        <g>
          <ellipse
            cx={centerX - 5}
            cy={centerY - 3}
            rx="5"
            ry="7"
            fill="#fff"
          />
          <circle cx={centerX - 3} cy={centerY - 3} r="3" fill="#000" />
          <ellipse
            cx={centerX + 9}
            cy={centerY - 3}
            rx="5"
            ry="7"
            fill="#fff"
          />
          <circle cx={centerX + 11} cy={centerY - 3} r="3" fill="#000" />
        </g>
      );
  }
};
