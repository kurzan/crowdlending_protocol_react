import { FC, useEffect, useState } from "react";
import styles from "./CompanyLogo.module.css";
import { getImage } from "../../services/utils";

type TCompanyLogoProps = {
  src?: string,
  alt?: string
};

const CompanyLogo: FC<TCompanyLogoProps> = ({src, alt}) => {

  // const [isImage, setIsImage] = useState(false);

  // useEffect(() => {
  //   getImage(src)
  //     .then(() => setIsImage(true))
  //     .catch(() => setIsImage(false))
  // }, [src, isImage])

  return(
    <img src={src} alt={alt} />
  )
};

export default CompanyLogo;