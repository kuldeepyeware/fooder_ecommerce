"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "../../actions/newVerification";
import { BeatLoader } from "react-spinners";
import FormError from "../Form/formError";
import FormSuccess from "../Form/formSuccess";
import Link from "next/link";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went error!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit, error, success]);

  return (
    <main className='h-full flex flex-col justify-center items-center w-full pt-20'>
      <div className='flex justify-center items-center  gap-6 w-[300px] flex-col'>
        <h1 className='font-semibold text-3xl '>🔐 Auth</h1>
        <p>Confirming your verification</p>

        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}

        <Link href={"/account/login"} className=' underline'>
          Login
        </Link>
      </div>
    </main>
  );
};

export default NewVerificationForm;
