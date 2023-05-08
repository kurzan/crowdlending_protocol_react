import { FC } from "react";
import acceptedLogo from '../../images/icons/accepted.svg';
import warningLogo from '../../images/icons/warning.svg';
import styles from './CompanyStatus.module.css';


type TCompanyStatusProps = {
  verified: boolean;
}

const CompanyStatus:FC<TCompanyStatusProps> = ({verified}) => {
  return(
    <div className={styles.container}>
      <abbr title={verified ? 'Verified' : 'Unverified'}><img src={verified ? acceptedLogo : warningLogo} alt={verified ? 'verified' : 'not moderated'} /></abbr>
    </div>
  )
};

export default CompanyStatus;