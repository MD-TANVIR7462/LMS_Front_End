import Loader from '@/components/shared/Loader';
import { logout, useCurrentToken, useCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/features/hooks';
import { getData } from '@/server/serverAction';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const MainLayoutPage = () => {
    const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const disPatch = useDispatch();

  const checkUser = async () => {
    try {
      if (token && user) {
        const response = await getData("/auth/register/me", token);
        if (!response.success) {
          setIsChecking(false);
          disPatch(logout());
        } else {
            console.log(user,token)
        //   router.replace("/dashboard");
        }
      } else {
        setIsChecking(false);
      }
    } catch (err) {
      toast("Something went wrong!");
      router.push("/");
    }
  };

  useEffect(() => {
    checkUser();
  }, [router, token, user, disPatch]);

  if (isChecking) return <Loader />;
    return (
        <div>
            hello
        </div>
    );
};

export default MainLayoutPage;