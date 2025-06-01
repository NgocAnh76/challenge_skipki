import { useState } from 'react';
import AuthFrom from './AuthFrom';
import { createAccessCode, validateAccessCode } from '../../api/services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../components/config/paths';
import { ACCESS_TOKEN, PHONE_NUMBER } from '../../api/constant';

const AuthPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'login' | 'verify'>('login');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCreateAccessCode = async () => {
    try {
      setIsLoading(true);
      await createAccessCode({ phoneNumber });
      toast.success('Verification code sent successfully');
      setStep('verify');
    } catch (error: any) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateAccessCode = async () => {
    try {
      const response = await validateAccessCode({ phoneNumber, code });
      toast.success('Verification code validated successfully');

      localStorage.setItem(ACCESS_TOKEN, response.data);
      localStorage.setItem(PHONE_NUMBER, phoneNumber);

      navigate(PATHS.SERVICE.ROOT);
    } catch (error: any) {
      console.error('API Error:', error);
    }
  };

  if (step === 'verify')
    return (
      <AuthFrom
        label={`SkipliAI has sent an OTP code to: ${phoneNumber}`}
        placeholder="Enter your code here"
        buttonLabel="Submit"
        value={code}
        onChange={setCode}
        isLoading={isLoading}
        onClick={handleValidateAccessCode}
      />
    );
  return (
    <AuthFrom
      label="Enter a mobile phone number that you have access to.This number will be use to login
              to SkipliAI."
      placeholder="+84 987654321"
      buttonLabel="Send Verification Code"
      value={phoneNumber}
      onChange={setPhoneNumber}
      onClick={handleCreateAccessCode}
      isLoading={isLoading}
    />
  );
};

export default AuthPage;
