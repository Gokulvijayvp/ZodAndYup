import React from 'react'
import * as Yup from 'yup'; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const FormwithYup = ({client,setData,navigate}) => {
    const validationSchema = Yup.object({
        firstname: Yup.string().required("First name required"),
        secondname: Yup.string().required("Second name required"),
        email: Yup.string()
            .required("email required")
            .email("Invalid email"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required(),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be least 8 characters")
            .matches(/[!@#$%^&*(),.?":{}|<>]/ , "Password must contain at least one symbol")
            .matches(/[0-9]/, "Password must contain one Number")
            .matches(/[A-Z]/,"Password must contain one Uppercase")
            .matches(/[a-z]/, "Password must contain one Lowercase"),
        repassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password must match")
            .required("repassword is required"),
        birthdate: Yup.string().required("Date of birth is required"),
    });
    
      const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(validationSchema)
      });
    
      const onSubmit = async (data) => {
            try {
                const response = await client.post('/yupusers',data );
                setData(prevData => [response.data, ...prevData]);
            } catch (error) {
                console.error('Error creating new user:', error);
            }
            navigate('/yup')
      };
  return (
    <div className='container'>
        
        <div className='d-flex align-items-center justify-content-center p-3'>

        <form className='mainform' onSubmit={handleSubmit(onSubmit)}>
          <h3 className=' mb-4'>Yup Form Validation </h3>

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

export default FormwithYup