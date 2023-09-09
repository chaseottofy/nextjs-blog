import { GradientRef } from 'svg/icons';

import styles from './Overlay-noise.module.css';

const OverlayNoise: React.FC = () => {
  return (
    <>
      <GradientRef />
      <div className={styles.overlayNoise} />
    </>
  );
};

export default OverlayNoise;
