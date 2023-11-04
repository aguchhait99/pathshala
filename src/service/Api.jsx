import { axiosInstance } from "./AxiosInstance";

// Authentication Details
// Resgister API

export const registerData =async (data)=>{
    try {
        return await axiosInstance.post(`/api/register`, data)
    }
    catch(error){
        console.log('Error while calling api.');
    }
}

//  Login API
export const loginData =async (data)=>{
    try {
        return await axiosInstance.post(`/api/login`, data)
    }
    catch(error){
        console.log('Error while calling api.');
    }
}

// Blog 



// Get Blog Data
export const allBlogData = async ()=>{
    try{
        return await axiosInstance.get(`/api/allBlog`)
    }catch(error){
        console.log("Error while fetching the api.");
    }
}

// Blog Details

export const blogDetailsData = async (id)=>{
    try {
        return await axiosInstance.get(`/api/blogdetails/${id}`)
    }catch (error){
        console.log('Error while fetching the api data.');
    }
}

// All Category
export const AllCategoryData = async ()=>{
    try{
        return await axiosInstance.get(`/api/showallcategory`)
    }catch(error){
        console.log("Error while fetching api data.");
    }
}

// Recent Post 
export const recentPostData = async ()=>{
    try{
        return await axiosInstance.get (`/api/letest-post`)
    }catch(error){
        console.log('Error while fetching api data.');
    }
}

// Comments
export const commentsData = async(id)=>{
    try {
        return await axiosInstance.get(`/api/comment/${id}`)
    }catch(error){
        console.log("Error while fetching the api data.");
    }
}

// Post Comments 

export const postComments = async (id, data)=>{
    try{
        return await axiosInstance.post(`/api/blog/${id}/comment/create`, data)
    }catch(error){
        console.log('Error while posting data on the api.');
    }
}

// Category Details
export const categoryDetailsData = async (id)=>{
    try{
        return await axiosInstance.get (`/api/category/post/${id}`)
    }catch(error){
        console.log('Error while fetching api data.');
    }
}

// Serach 
export const searchData = async(data)=>{
    try{
        return await axiosInstance.post(`/api/search`, data)
    }catch(error){
        console.log('Error while fetching the api data');
    }
}

// Banner
export const BannerData = async ()=>{
    try {
        return await axiosInstance.get(`/api/banner`)
    }catch(error){
        console.log('Error while fetching api data');
    }
}

// Service 
export const serviceData = async ()=>{
    try{
        return await axiosInstance.get (`/api/service`)
    }catch(error){
        console.log('Error while fetching api data ');
    }
}

// Testimonial
export const testimonialData = async()=>{
        try{
            return await axiosInstance.get(`/api/testimonial`)
        }catch(error){
            console.log('Error while fetching the api data.');
        }
}

// Team 
export const teamData = async ()=>{
    try{
        return await axiosInstance.get (`/api/team`)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Courses

export const getCourses = async ()=>{
    try{
        return await axiosInstance.get(`/api/course`)
    }catch(error){
        console.log('Error while fetching api data.');
    }
}

// Apply Course
export const applyCourse = async (id, data)=>{
    try{
        return axiosInstance.post(`/api/course/apply/${id}`, data)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Contact Us
export const contactData = async(data)=>{
    try{
        return await axiosInstance.post(`/api/contact/create`, data)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Like
export const likeCount = async(id)=>{
    try{
        return await axiosInstance.put(`api/blog/like/${id}`)
    }catch(error){
        console.log('Error while fetching the api details.');
    }
}

// Dislike 

export const dislikeCount = async (id)=>{
    try{
        return await axiosInstance.put(`api/blog/unlike/${id}`)
    }catch(error){
        console.log('Error while fetching the api details.');
    }
}