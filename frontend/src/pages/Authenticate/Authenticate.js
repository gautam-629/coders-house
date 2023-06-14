import React,{useState} from 'react';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepOtp from '../Steps/StepOtp/StepOtp';
const Authenticate = () => {
    const steps={
        1:StepPhoneEmail,
        2:StepOtp,
    }
    const[step,setStep]=useState(1);
    const Step=steps[step];
    function startOnNext(){
      setStep(step+1);
    }
  return (
    <div>
      <Step Click={startOnNext}/>
    </div>
  )
}
export default Authenticate;