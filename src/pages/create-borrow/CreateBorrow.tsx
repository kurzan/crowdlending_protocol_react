import { SyntheticEvent, useEffect, useState } from "react";
import LayoutPage from "../layout/Layout";
import styles from './CreateBorrow.module.css';
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForms";

function CreateBorrow() {

    const {values, handleChange, setValues} = useForm<any>({});


    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <LayoutPage>
            <form className={styles.form} onSubmit={() => {}}>

                <Input label="Company name" name="companyName" value={values.companyName || ''} onChange={handleChange} />
                <Input label="Borrowing goal" name="borrowingGoal" value={values.borrowingGoal || ''} onChange={handleChange} type="number" min="10" />
                <Input label="Period, days" name="borrowingPeriod" value={values.borrowingPeriod || ''} onChange={handleChange} type="number" />
                <Input label="Interest rate" name="interestRate" value={values.interestRate || ''} onChange={handleChange} type="number" />

                <Button type="submit" title="Create borrow" />
            </form>
        </LayoutPage>
    );
}

export default CreateBorrow;