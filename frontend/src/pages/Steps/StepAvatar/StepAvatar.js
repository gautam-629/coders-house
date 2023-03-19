import React, { useState } from "react";
import Card from "../../../components/shared/card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activated";
import { activate } from "../../../http";
import { setAuth } from "../../../store/AuthSlice";
import Loader from "../../../components/shared/Loader/Loader";
import { useEffect } from "react";
const StepAvatar = ({ Click }) => {
  const dispatch = useDispatch();

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  
  async function submit() {
    setLoading(true);
    try {
      const { data } = await activate({ name: name, avatar: avatar });
      if (data.auth) {
        if (mounted) {
          dispatch(setAuth(data));
          Click();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // call when unmounted
    return () => {
      setMounted(false);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress..." />;
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Okay,${name}`} icon="monkey-emoji">
          <p className={styles.subHeading}>How’s this photo?</p>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatarImage} src={image} alt="avatar" />
          </div>
          <div>
            <input
              onChange={captureImage}
              id="avatarInput"
              type="file"
              className={styles.avatarInput}
            />
            <label className={styles.avatarLabel} htmlFor="avatarInput">
              Choose a different photo
            </label>
          </div>
          <div>
            <Button Click={submit} text="Next" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepAvatar;
