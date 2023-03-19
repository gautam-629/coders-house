import React, { useState } from 'react';
import Card from '../../../components/shared/card/Card'
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepName.module.css';
import { setName } from '../../../store/activated';
import { useDispatch, useSelector } from 'react-redux';
const StepName = ({ Click }) => {
    const  dispatch=useDispatch();
    const { name } = useSelector((state) => state.activate);
    const [fullname, setFullname] = useState(name);
     function nextStep(){
        console.log(fullname)
        if(!fullname){
            return;
        }
             dispatch(setName(fullname));
             Click();
     }
    return (
        <>
        <div className={styles.cardWrapper}>
            <Card title="What’s your full name?" icon="goggle-emoji">
                <TextInput
                    value={fullname}
                   onChange={(e)=>setFullname(e.target.value)}
                />
                <p className={styles.paragraph}>
                    People use real names at codershouse :) !
                </p>
                <div>
                    <Button Click={nextStep} text="Next" />
                </div>
            </Card>
            </div>
        </>
    );
};

export default StepName;
