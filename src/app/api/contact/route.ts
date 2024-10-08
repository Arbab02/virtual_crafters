// import mongoose from "mongoose";
import mongoose from 'mongoose';
import Contact from '../../api/../../model/contact.js';
import db from '../../../lib/mongodb';
import { NextResponse } from "next/server";

export const POST = async (req:Request,res:Response)=>{
    try {
        const {fullname, email, phone, message} = await req.json();
        await db.connect();
        await Contact.create({fullname, email, phone, message})
        return NextResponse.json({
            message:"form submit successfully"
        },
        {
            status:201
        })
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
              errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({ msg: errorList });
          } else {
            return NextResponse.json({ msg: ["Unable to send message."] });
          }
    }
}
