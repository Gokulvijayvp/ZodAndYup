import React from 'react'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';

const FormwithZod = ({client,setData,navigate}) => {
  const validationSchema = z.object({
    firstname: z.string().min(1, { message: "First name required" }),
    secondname: z.string().min(1, { message: "Second name required" }),
    email: z.string().email("Invalid email").min(1, { message: "Email required" }),
    phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }).min(1),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
                         .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one symbol" })
                         .regex(/[0-9]/, { message: "Password must contain one number" })
                         .regex(/[A-Z]/, { message: "Password must contain one uppercase letter" })
                         .regex(/[a-z]/, { message: "Password must contain one lowercase letter" })
                         .min(1, { message: "Password is required" }),
    repassword: z.string().min(1, { message: "Re-enter password required" })
                         .superRefine((repassword, data) => data.password === repassword, { message: "Passwords must match" }),
    birthdate: z.string().min(1, { message: "Date of birth is required" }),
});

const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema)
});

const onSubmit = async (data) => {
    try {
        const response = await client.post('/zodusers',data );
        setData(prevData => [response.data, ...prevData]);
    } catch (error) {
        console.error('Error creating new user:', error);
    }
    navigate('/')
};

  return (
    <div className='container'>
        <div className='d-flex align-items-center justify-content-center p-3'>
            <form className='mainform' onSubmit={handleSubmit(onSubmit)}>
            <h3 className=' mb-4'>Zod Form Validation </h3>

                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder='Please enter the first name' id="firstname" name='firstname' {...register("firstname")} />
                    
                    {errors?.firstname && <div className="form-text error">{errors.firstname?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="secondname" className="form-label">Second Name</label>
                    <input type="text" className="form-control" placeholder='Please enter the second name' id="secondname" name='secondname' {...register("secondname")}  />
                    {errors?.secondname && <div className="form-text error">{errors.secondname?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder='Please enter the email' id="email" name='email' {...register("email")} />
                    {errors?.email && <div className="form-text error">{errors.email?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="number" className="form-control" placeholder='Please enter the phone number' id="phone" name='phone' {...register("phone")} />
                    {errors?.phone && <div className="form-text error">{errors.phone?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder='Please enter the password' id="password" name='password' {...register("password")} />
                    {errors?.password && <div className="form-text error">{errors.password?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="repassword" className="form-label">Re-Password</label>
                    <input type="password" className="form-control" placeholder='Please enter the re-type password' id="repassword" name='repassword' {...register("repassword")} />
                    {errors?.repassword && <div className="form-text error">{errors.repassword?.message}</div>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input className='form-control' type="date" name="birthdate" id="dob" {...register("birthdate")}/>
                    {errors?.birthdate && <div className="form-text error">{errors.birthdate?.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default FormwithZod