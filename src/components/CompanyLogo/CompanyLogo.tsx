import { FC, useEffect, useState } from "react";
import styles from "./CompanyLogo.module.css";
import { getImage } from "../../services/utils";


type TCompanyLogoProps = {
  src?: string,
  alt?: string
};

const CompanyLogo: FC<TCompanyLogoProps> = ({src, alt}) => {

  return(
      <img style={{borderRadius: "8px"}} height="40px" width="40px" src={src} alt={alt} />

  )
};

export default CompanyLogo;