import { FC, useEffect, useState } from "react";
import styles from "./CompanyLogo.module.css";
import { checkIsImage } from "../../services/utils"; 


type TCompanyLogoProps = {
  src?: string,
  alt?: string
};

const CompanyLogo: FC<TCompanyLogoProps> = ({src, alt}) => {

  // const [isImage, setIsImage] = useState(true);

  // useEffect(() => {
  //   checkIsImage(src)
  //     .then(() => setIsImage(true))
  //     .catch(() => setIsImage(false))
  // }, [])


  return(
    <div className={styles.logoBox}>
      {src ? <img style={{borderRadius: "8px"}} height="40px" width="40px" src={src} alt={alt} /> : 
      <p>{alt?.slice(0, 1)}</p>}
    </div>
      

  )
};

export default CompanyLogo;