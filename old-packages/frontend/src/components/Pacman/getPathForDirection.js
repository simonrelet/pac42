export default (direction, { centerX, centerY }, { mouthX, mouthY }) => {
  switch (direction) {
    case 'left':
      return (
        `M${centerX - mouthX},${centerY + mouthY}` +
        'A15 15 0 1 0' +
        `${centerX - mouthX} ${centerY - mouthY} L${centerX + 3} ${centerY}z`
      );

    case 'top':
      return (
        `M${centerX - mouthY},${centerY - mouthX}` +
        'A15 15 0 1 0' +
        `${centerX + mouthY} ${centerY - mouthX} L${centerX} ${centerY + 3}z`
      );

    case 'bottom':
      return (
        `M${centerX - mouthY},${centerY + mouthX}` +
        'A15 15 0 1 1' +
        `${centerX + mouthY} ${centerY + mouthX} L${centerX} ${centerY - 3}z`
      );

    case 'right':
    default:
      return (
        `M${centerX + mouthX},${centerY + mouthY}` +
        'A15 15 0 1 1' +
        `${centerX + mouthX} ${centerY - mouthY} L${centerX - 3} ${centerY}z`
      );
  }
};
