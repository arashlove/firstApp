const express = require('express')
const router=express.Router()
const course=[
    {id:1,name:'math'},
    {id:2,name:'english'},
    {id:3,name:'physics'}

  ];
router.get('/',(req,res)=>{
    res.send(course);
  })
  router.get('/:id',(req,res)=>{
    let coursebool=course.find(c=>c.id===parseInt(req.params.id))
    if(!coursebool) return res.status(404).send('course was not found')
      res.send(coursebool);
  })
  router.post('/',(req,res)=>{
    const {error} = validateCourse(req.body)
    if (error) return res.send(error.details[0].message);
    let course1={
      id:course.length+1,
      course:req.body.name
    }
    course.push(course1);
    res.send(course);
  });
  router.put('/:id',(req,res)=>{
    let coursebool=course.find(c=>c.id===parseInt(req.params.id))
    if(!coursebool) return    res.status(404).send('course was not found with this id');
    const {error} = validateCourse(req.body)
    if (error)  return res.send(error.details[0].message);
    coursebool.name=req.body.name;
    res.send(coursebool);
  })
  router.delete('/:id',(req,res)=>{
    let coursebool=course.find(c=>c.id===parseInt(req.params.id))
    if(!coursebool) return res.status(404).send('course was not found with this id')
    const index=course.indexOf(coursebool)
    course.splice(index);
    res.send(course)
  })
  module.exports=router;
