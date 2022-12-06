import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const showToastMessage = (error,success) => {
    console.log("error");
    toast.error('Vui long nhap lai', {
        position: toast.POSITION.TOP_RIGHT
    });
};