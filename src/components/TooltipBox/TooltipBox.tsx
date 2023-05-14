import { FC, ReactNode, useState } from "react";
import styles from "./TooltipBox.module.css";


type TTooltipBoxProps = {
  tooltipText: string;
  children: ReactNode;
};

const TooltipBox: FC<TTooltipBoxProps> = ({tooltipText, children}) => {

  const [showTooltip, setShowTooltip] = useState(false);
  const show = () => setShowTooltip(true);
  const hide = () => setShowTooltip(false);

  return (
    <div className={styles.tooltipItem} onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {showTooltip ? <div className={styles.tooltipCase}>{tooltipText}</div> : null}
    </div>
  )
}

export default TooltipBox;