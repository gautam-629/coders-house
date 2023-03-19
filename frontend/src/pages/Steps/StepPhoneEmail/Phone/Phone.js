import React, { useState } from "react";
import Card from "../../../../components/shared/card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import style from "../StepPhoneEmail.module.css";
import { setOtp } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../../http";
const Phone = ({ Click }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch=useDispatch();
  async function submit() {
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
      dispatch(setOtp({phone:data.phone,hash:data.hash}));
    Click();
  }
  return (
    <>
      <Card icon="phone" title="Enter your Phone number">
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className={style.actionButtonWrap}>
          <Button text="Next" Click={submit} />
        </div>
        <p className={style.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </>
  );
};

export default Phone;
