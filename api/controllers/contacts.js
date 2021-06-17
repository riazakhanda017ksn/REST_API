const Contact = require('../models/Contact')

const getAllContactsController=('/',(req,res,next)=>{
    Contact.find()
    .then(contacts=>{
        res.status(200).json({
            message:"All contacts",
            contacts
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:'error Occured',
            error : err
        })
    })
    })

const postNewContactsController=('/',(req,res,next)=>{
    const contact = new Contact({
        name:req.body.name,
        phone:req.body.phone,
        email: req.body.email
    })
       contact.save()
       .then(data=>{
           res.status(201).json({
               message:"Contact added",
               contact: data
           })
       })
       .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:'error Occured',
            error : err
        })
    })
    })

    const getSingleContact =(req,res,next)=>{
        let id =req.params.id
        Contact.findById(id)
        .then(contact=>{
            res.status(500).json({
                contact
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message:'error Occured',
                error : err
            })
        })
    }

///delete
const deleteContact =(req,res,next)=>{
    let id=req.params.id
    Contact.findByIdAndRemove(id)
    .then(result=>{
        res.json({
            message: 'Contact Deleted',
            result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:'error Occured',
            error : err
        })
    })
}
//edit
const editContact=(req,res,next)=>{
    let id=req.params.id
    let updateContact={
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email

    }
    Contact.findByIdAndUpdate(id,{$set:updateContact})
    .then(contact=>{
        Contact.findById(contact._id)
        .then(newContact=>{
            res.json({
                message:'Updated successfully',
                newContact
            })
         })

        })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:'error Occured',
            error : err
        })
    })
}
module.exports={
    getAllContactsController,
    postNewContactsController,
    getSingleContact,
    deleteContact,
    editContact
}