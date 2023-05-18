import { FC, ReactNode, useRef, useState } from "react";
import styles from "./TooltipBox.module.css";


type TTooltipBoxProps = {
  tooltipText: string | number;
  children: any;
};

const TooltipBox: FC<TTooltipBoxProps> = ({tooltipText, children}) => {

  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<any>(null);
  const show = () => setShowTooltip(true);
  const hide = () => setShowTooltip(false);

  return (
    <div className={styles.tooltipItem} onMouseEnter={show} onMouseLeave={hide} ref={containerRef}>
      {children}
      {showTooltip ? <div className={styles.tooltipCase} style={{width:`${containerRef.current.offsetWidth}px`}}>{tooltipText}</div> : null}
    </div>
  )
}

export default TooltipBox;