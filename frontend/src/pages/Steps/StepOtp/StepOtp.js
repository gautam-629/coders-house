import React,{useState} from 'react';
import Card from '../../../components/shared/card/Card';
import style from './StepOtp.module.css';
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/AuthSlice';
import { useDispatch } from 'react-redux';
const StepOtp = ({Click}) => {
 const dispatch=useDispatch();

  const[otp,setOtp]=useState('');
  const {phone,hash}=useSelector((state)=>state.auth.otp);

 async function submit(){
         try {
          const {data}=await verifyOtp({otp:otp,phone:phone,hash:hash});
             dispatch(setAuth(data));
              Click();
          console.log(data);
         } catch (error) {
          console.log(error)
         }
  }

  return (
    <>
      <div className={style.cardWrapper}>
        <Card title='Enter the code we just texted you' icon='lock-emoji'>
        <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)}/>
        <div className={style.actionButtonWrap}>
          <Button Click={submit} text='Next'/>
          </div>
          <p className={style.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
        </Card>
        
      </div>
    </>
  )
}

export default StepOtp