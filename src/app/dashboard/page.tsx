'use client';

import ProtectedRoute from '@/components/ProtectedRoute'
import React, { useEffect, useState } from 'react'
import {FaUserTie, FaArrowLeft } from 'react-icons/fa';
// import DashboardTab from '../../components/DashboardTab';
import './dashboard.scss';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import '../signup/signup.scss';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { v4 as uuid } from 'uuid';
import { imageDb } from '@/services/firebase/config';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { object, string, number, mixed } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@/state/store';

const page = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { currentUser } = useAuthStore();
    const statsObj = [
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
    ]

    const stats = statsObj.map(obj => {
        return (
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" stats-container" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} 
                        >
                            <div className="user-icon" 
                            // viewBox="0 0 24 24"
                            >
                                {obj.icon}
                            </div>
                            <h2 className="num-text" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >{obj.count}</h2>
                            <p className=" stat-title" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >{obj.title}</p>
                        </div>
                    </div>
        )
    })

    const schema = object().shape({
        name: string().required("Product name is required"),
        description: string().required("Product description is required"),
        category: string().required("Product category is required"),
        price: number().required("Price tag is required"),
        // img: mixed().required("Product image is required"),
    });

    // validation to be added...
    const {
        register,
        handleSubmit,
        formState: {
          errors,
          isValid,
          isSubmitting,
        },
        trigger,
        reset,
      } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur" || "onSubmit",
    });
    
    const [image, setImage] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState<string[]>([]);
    
    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const file = Array.from(e.target.files)[0];
            console.log("Files: ", file);
            setImage(file);
        }
    };

    useEffect(() => {
        listAll(ref(imageDb, "files")).then(imgs => {
            console.log(imgs);
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setImgUrl(data => [...data, url])
                })
            })
        });
    }, []);

    const addNewProduct = async (data: FieldValues) => {
        // Add your implementation here...
        console.log(data);
        
        console.log(data.name);
        console.log(data.price);
        console.log(data.category);
        console.log(data.description);
        // if (!data.name || !data.description || !data.category || !data.price) {
        //     console.error("One or more required fields are undefined");
        //     return; // Exit function early
        // }

        const output = await trigger(['name', 'description', 'category', 'price'], {
            shouldFocus: true,
        });

        if (!output) return;    // don't submit if any of the fields given above fail in validation...

        let imageUrl = '';
        
        if (image) {
            const imgRef = ref (imageDb, `files/${uuid()}`);
            await uploadBytes(imgRef, image);
            imageUrl = await getDownloadURL(imgRef);
        }
        
        // if (data.name && data.category && data.description && data.price) {
            
            const docRef = doc(db, 'products', uuid());
            console.log({
                id: uuid(),
                userId: currentUser?.uid,
                name: data.name,
                category: data.category,
                description: data.description,
                price: data.price,
                image: image && imageUrl,
            });
    
            await setDoc(docRef, {
                id: uuid(),
                userId: currentUser?.uid,
                name: data.name,
                category: data.category,
                description: data.description,
                price: data.price,
                image: image && imageUrl,
            });
        // }

        reset();
    };

    const submitForm = () => {
        console.log("Submitted...");
    }

  return (
    <ProtectedRoute>
        <section className="text-gray-600 body-font mt-10 mb-10">
            <div className="container px-5 mx-auto mb-10">
                <div className="flex flex-wrap -m-4 text-center">
                    
                    {stats}
                    {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                        >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" 
                            // viewBox="0 0 24 24"
                            >
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >10</h2>
                            <p className=" text-purple-500  font-bold"
                            //  style={{ color: mode === 'dark' ? 'white' : ''}}
                             >Total Orders</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                         >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block"
                            //  viewBox="0 0 24 24"
                             >
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >20</h2>
                            <p className=" text-purple-500  font-bold" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >Total Users</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                        >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" 
                            // viewBox="0 0 24 24"
                            >
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1"
                            //  style={{ color: mode === 'dark' ? 'white' : ''}}
                             >20</h2>
                            <p className=" text-purple-500  font-bold" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >Total Products</p>
                        </div>
                    </div> */}
                </div>

                <form 
            // onSubmit={handleSubmit((data,event) => addNewProduct(data))}
            onSubmit={handleSubmit(addNewProduct)}
            className='signup-form break-all break-words min-w-full md:min-w-[666px] md:mx-0 my-10 
            '
          >
            <h2>Add new product</h2>
            <label htmlFor="name" className='label'>Name: </label>
            <input 
              type="text"
              {...register("name")}
              id="name" 
              placeholder='leather jacket'
              className='input-fields '
            />
            <p className="text-red-400 text-sm my-1">{errors.name?.message}</p>
            <label htmlFor="description" className='label'>Description: </label>
            <input 
              type="text"
              {...register("description")}
              id="description" 
              placeholder=''
              className='input-fields '
            />
            <p className="text-red-400 text-sm my-1">{errors.description?.message}</p>
            <label htmlFor="category" className='category'>Category: </label>
            <input 
              type="text"
              {...register("category")}
              id="category" 
              placeholder='Mens clothing'
              className='input-fields '
            />
            <p className="text-red-400 text-sm my-1">{errors.category?.message}</p>
            <label htmlFor="price" className='label'>Price: </label>
            <input 
              type="number"
              {...register("price")}
              id="price" 
              placeholder=''
              className='input-fields '
            />
            <p className="text-red-400 text-sm my-1">{errors.price?.message}</p>
            <label htmlFor="img" className='label'>Upload an image: </label>
            <input 
              type="file"
            //   {...register("img", { required: true })}
              id="img" 
              accept='image/png, image/jpeg'
              placeholder=''
              className='input-fields '
              onChange={handleImgUpload}
            />
            {/* <p className="text-red-400 text-sm my-1">{errors.img?.message}</p> */}

           
            <div className="btns-container">
              <Button 
              text={'Add new'}
              align='right'
            //   handleBtnClick= {addNewProduct}
            handleBtnClick={submitForm}
              isValid={isValid}
              isSubmitting={isSubmitting}
              />
              {/* <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link> */}
            </div>
            

            {/* <pre>{JSON.stringify(watch())}</pre> */}
          </form>
            </div>
            {/* <DashboardTab/> */}
        </section>
        <Link href="/" className='back-link'>
            <FaArrowLeft />
        </Link>
    </ProtectedRoute>
  )
}

export default page

