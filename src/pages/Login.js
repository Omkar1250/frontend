import React from 'react'
import loginImg from '../assets/images/auth-banner.jpg'
import Template from "../components/core/Auth/Template"
export default function Login() {
  return (
    <Template
    title="Welcome Back"
    description1="Build skills today, tommorow, and beyond."
    description2="Education tp future-proof your carrer."
    image={loginImg}
    formType="login"
    ></Template>
  )
}
