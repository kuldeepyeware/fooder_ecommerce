import { AlertTriangleIcon } from "@repo/ui/icons";

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className=' bg-destructive/15 p-3 w-full rounded-md flex items-center gap-x-2 text-sm text-destructive '>
      <AlertTriangleIcon className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
