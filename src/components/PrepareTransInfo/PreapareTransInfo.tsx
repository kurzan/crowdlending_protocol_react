import { FC } from "react";
import Box from "../Box/Box";
import styles from "./PrepareTransInfo.module.css";

type TPrepareTransInfoProps = {
  values: any[],
  bg?: string;
};

const PrepareTransInfo: FC<TPrepareTransInfoProps> = ({values, bg = "rgb(249, 249, 249)"}) => {
  return(
    <Box margin="0" bg={`${bg}`} >
      {values.filter(value => value.amount > 0).map((value, index) => (
          <div key={index} className={styles.trans_info}>
            <p className={styles.trans_text}>{value.text}</p>
            <p className={styles.trans_amount}>{value.amount}</p>
          </div>
      ))}

  </Box>
  )
};

export default PrepareTransInfo;