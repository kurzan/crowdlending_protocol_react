import { FC, useEffect, useState } from "react";
import styles from "./CompanyLogo.module.css";
import { getImage } from "../../services/utils";

type TCompanyLogoProps = {
  src: string,
  alt: string
};

const CompanyLogo: FC<TCompanyLogoProps> = ({src, alt}) => {

  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    getImage(src)
      .then(() => setIsImage(true))
      .catch(() => setIsImage(false))

    console.log(isImage)
  }, [src, isImage])

  return isImage ? (
    <img src={src} alt={alt} />
  ) : (
    <div style={{width: '3rem', height: '3rem', backgroundColor: 'gray' }}>
    </div>
  )
};

export default CompanyLogo;